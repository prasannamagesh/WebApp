import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { sendDispatchNotification, sendDeliveryNotification } from '@/lib/whatsapp-service';

interface ShiprocketWebhookPayload {
  event_type: string;
  data: {
    order_id?: string;
    shipment_id?: string;
    status?: string;
    tracking_id?: string;
    customer_phone?: string;
    customer_name?: string;
    current_status?: string;
    [key: string]: any;
  };
  timestamp?: string;
}

// Map Shiprocket status to our order status
const STATUS_MAP: { [key: string]: string } = {
  'ready_to_ship': 'Processing',
  'dispatched': 'Shipped',
  'in_transit': 'Shipped',
  'out_for_delivery': 'Shipped',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled',
  'failed': 'Cancelled',
  'returned': 'Cancelled',
};

export async function POST(request: NextRequest) {
  try {
    const payload: ShiprocketWebhookPayload = await request.json();

    console.log('[v0] Shiprocket webhook received:', {
      eventType: payload.event_type,
      status: payload.data?.status || payload.data?.current_status,
      timestamp: payload.timestamp,
    });

    // Validate webhook payload
    if (!payload.event_type || !payload.data) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const trackingId = payload.data.tracking_id || payload.data.shipment_id;
    const currentStatus = payload.data.status || payload.data.current_status;

    if (!trackingId || !currentStatus) {
      return NextResponse.json(
        { success: false, error: 'Missing tracking ID or status' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find order by tracking ID
    const order = await Order.findOne({ trackingId }) as any;

    if (!order) {
      console.warn('[v0] Order not found for tracking ID:', trackingId);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Map Shiprocket status to our shipping status
    const newShippingStatus = STATUS_MAP[currentStatus.toLowerCase()] || currentStatus;

    // Only update if status has changed
    if (order.shippingStatus !== newShippingStatus) {
      // Update order in database
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          shippingStatus: newShippingStatus,
          updatedAt: new Date(),
        },
        { new: true }
      );

      console.log('[v0] Order updated:', {
        orderId: order.orderId,
        trackingId: trackingId,
        oldStatus: order.shippingStatus,
        newStatus: newShippingStatus,
      });

      // Send WhatsApp notification based on status change
      const phoneNumber = order.customerDetails?.phone;
      const customerName = order.customerDetails?.name;

      if (phoneNumber) {
        try {
          if (newShippingStatus === 'Shipped') {
            // Send dispatch notification
            await sendDispatchNotification(phoneNumber, {
              orderId: order.orderId,
              trackingId: trackingId,
              trackingUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourstore.com'}/track/${trackingId}`,
            });
            console.log('[v0] Dispatch notification sent:', phoneNumber);
          } else if (newShippingStatus === 'Delivered') {
            // Send delivery notification
            await sendDeliveryNotification(phoneNumber, {
              orderId: order.orderId,
              trackingId: trackingId,
            });
            console.log('[v0] Delivery notification sent:', phoneNumber);
          }
        } catch (whatsappError) {
          console.error('[v0] WhatsApp notification failed:', whatsappError);
          // Don't fail the webhook if notification fails - still log the success
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook processed successfully',
        orderId: order.orderId,
        trackingId,
        status: newShippingStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Shiprocket webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
