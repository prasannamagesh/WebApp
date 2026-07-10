import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { z } from 'zod';

const orderSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least 1'),
  currency: z.string().default('INR'),
  receipt: z.string().optional(),
  notes: z.record(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay credentials not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // Create order with Razorpay
    const options = {
      amount: Math.round(validatedData.amount * 100), // Amount in paise
      currency: validatedData.currency,
      receipt: validatedData.receipt || `receipt_${Date.now()}`,
      notes: {
        ...validatedData.notes,
        created_at: new Date().toISOString(),
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        success: true,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Razorpay order creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Order creation failed',
      },
      { status: 500 }
    );
  }
}
