import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { generateInvoicePDF } from '@/lib/invoice-generator';

const webhookSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  event: z.string().optional(),
});

/**
 * Cryptographically verify Razorpay webhook signature
 */
function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  webhookSecret: string
): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}

export async function POST(request: NextRequest) {
  try {
    const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!RAZORPAY_WEBHOOK_SECRET) {
      console.error('[v0] RAZORPAY_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = webhookSchema.parse(body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      validatedData;

    // Verify signature cryptographically
    const isSignatureValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      RAZORPAY_WEBHOOK_SECRET
    );

    if (!isSignatureValid) {
      console.error('[v0] Webhook signature verification failed');
      return NextResponse.json(
        { error: 'Invalid signature', success: false },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find and update order
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        paymentStatus: 'Paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentVerifiedAt: new Date(),
        shippingStatus: 'Processing',
      },
      { new: true }
    );

    if (!order) {
      console.error('[v0] Order not found for razorpay_order_id:', razorpay_order_id);
      return NextResponse.json(
        { error: 'Order not found', success: false },
        { status: 404 }
      );
    }

    // Generate PDF invoice
    try {
      const invoiceBuffer = await generateInvoicePDF(order.toObject());
      
      // TODO: Send invoice via email
      // await sendInvoiceEmail(order.customerDetails.email, invoiceBuffer);
      
      console.log('[v0] Invoice generated successfully for order:', order._id);
    } catch (invoiceError) {
      console.error('[v0] Invoice generation failed:', invoiceError);
      // Don't fail the webhook if invoice generation fails
      // Invoice can be generated later
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified and order updated',
        orderId: order._id,
        paymentStatus: order.paymentStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Webhook verification error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid webhook data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint for Razorpay webhook configuration
 */
export async function GET() {
  return NextResponse.json({
    status: 'Razorpay payment verification webhook is active',
    methods: ['POST'],
  });
}
