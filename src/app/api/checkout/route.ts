import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { z } from 'zod';

// Validation schemas
const OrderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
  image: z.string().url('Invalid image URL'),
});

const CustomerDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  country: z.string().default('India'),
});

const CheckoutSchema = z.object({
  items: z.array(OrderItemSchema).min(1, 'At least one item is required'),
  customerDetails: CustomerDetailsSchema,
  paymentMethod: z.enum(['Card', 'UPI', 'NetBanking', 'Wallet']),
  paymentId: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type CheckoutRequest = z.infer<typeof CheckoutSchema>;

/**
 * Generate unique order ID (ORD-YYYYMMDD-XXXXX)
 */
function generateOrderId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${dateStr}-${randomStr}`;
}

/**
 * Generate unique tracking ID (TRK-XXXXXXXX)
 */
function generateTrackingId(): string {
  const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `TRK-${randomStr}`;
}

/**
 * POST /api/checkout
 * Process cart and create order
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Validate request payload
    const validatedData = CheckoutSchema.parse(body);

    // Calculate totals and validate product prices
    let subtotal = 0;
    const validatedItems = [];

    for (const item of validatedData.items) {
      // Verify product exists and price is correct
      const product = await Product.findOne(
        { $or: [{ id: item.productId }, { slug: item.productId }] },
        { price: 1, stockCount: 1 }
      ).lean() as { price: number; stockCount: number; _id: string } | null;

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product ${item.productId} not found`,
          },
          { status: 404 }
        );
      }

      // Verify stock
      if (product.stockCount < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Insufficient stock for product ${item.name}. Available: ${product.stockCount}`,
          },
          { status: 400 }
        );
      }

      // Validate price hasn't changed significantly (within 10% margin for currency fluctuation)
      const priceMargin = product.price * 0.1;
      if (Math.abs(product.price - item.price) > priceMargin) {
        return NextResponse.json(
          {
            success: false,
            error: `Price mismatch for ${item.name}. Current price: ₹${product.price}`,
          },
          { status: 400 }
        );
      }

      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      validatedItems.push({
        ...item,
        productId: product._id.toString(),
      });
    }

    // Calculate tax (18% GST for India)
    const tax = Math.round(subtotal * 0.18);

    // Calculate shipping (Free for orders above 500, else 50)
    const shippingCost = subtotal >= 500 ? 0 : 50;

    // Calculate total
    const totalAmount = subtotal + tax + shippingCost;

    // Create order
    const orderId = generateOrderId();
    const trackingId = generateTrackingId();

    const order = await Order.create({
      orderId,
      customerDetails: validatedData.customerDetails,
      items: validatedItems,
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      paymentStatus: validatedData.paymentId ? 'Paid' : 'Pending',
      shippingStatus: 'Processing',
      trackingId,
      paymentMethod: validatedData.paymentMethod,
      paymentId: validatedData.paymentId,
      notes: validatedData.notes,
    });

    // Update product stock
    for (const item of validatedItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stockCount: -item.quantity } },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        data: {
          orderId: order.orderId,
          trackingId: order.trackingId,
          totalAmount: order.totalAmount,
          paymentStatus: order.paymentStatus,
          shippingStatus: order.shippingStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Checkout API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request payload',
          details: error.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process checkout',
      },
      { status: 500 }
    );
  }
}
