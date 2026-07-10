# Razorpay Payment Gateway Integration Guide

## Overview

DermFix has complete Razorpay payment gateway integration with two critical API endpoints:
1. **Order Creation** (`/api/payment/order`) - Creates secure payment orders
2. **Payment Verification** (`/api/payment/verify`) - Webhook endpoint for payment confirmation

---

## Setup Instructions

### 1. Razorpay Account Setup

1. Create a Razorpay account at https://razorpay.com
2. Generate API keys from Dashboard → Settings → API Keys
3. Copy your **Key ID** and **Key Secret**

### 2. Environment Configuration

Add the following to your `.env.local` file:

```env
# Razorpay API Credentials
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXX

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dermfix
```

### 3. Webhook Configuration

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook endpoint: `https://yourdomain.com/api/payment/verify`
3. Select events: `payment.authorized`, `payment.failed`, `payment.captured`
4. Copy the **Webhook Secret** to `RAZORPAY_WEBHOOK_SECRET`

---

## API Endpoints

### POST /api/payment/order

**Purpose:** Creates an official Razorpay order instance and returns secure order_id

**Request:**
```json
{
  "amount": 1499,
  "currency": "INR",
  "receipt": "ORD-20260710-ABC123",
  "notes": {
    "orderId": "ORD-20260710-ABC123",
    "customerEmail": "user@example.com"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "order_id": "order_XXXXXXXXXXXXX",
  "amount": 149900,
  "currency": "INR",
  "receipt": "ORD-20260710-ABC123"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid request data",
  "details": [...]
}
```

**Implementation:**
```typescript
const response = await fetch('/api/payment/order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: totalAmount,
    currency: 'INR',
    receipt: orderId,
    notes: {
      orderId,
      customerEmail,
    },
  }),
});

const { order_id } = await response.json();
```

---

### POST /api/payment/verify

**Purpose:** Webhook endpoint for Razorpay payment success callback with cryptographic signature verification

**Webhook Payload:**
```json
{
  "razorpay_order_id": "order_XXXXXXXXXXXXX",
  "razorpay_payment_id": "pay_XXXXXXXXXXXXX",
  "razorpay_signature": "XXXXXXXXXXXXXXXXXXXXX"
}
```

**Signature Verification Process:**
1. Receives webhook with `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`
2. Generates HMAC-SHA256 signature using: `{order_id}|{payment_id}` with `RAZORPAY_WEBHOOK_SECRET`
3. Compares generated signature with received signature
4. If valid, updates MongoDB order to `paymentStatus: 'Paid'`
5. Automatically generates PDF invoice

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment verified and order updated",
  "orderId": "64f3d8a5c7e9b2a1d4f5g6h7",
  "paymentStatus": "Paid"
}
```

**Response (Invalid Signature):**
```json
{
  "success": false,
  "error": "Invalid signature"
}
```

---

## Checkout Flow Integration

### Complete Payment Flow

```
1. User clicks "Checkout"
   ↓
2. POST /api/checkout
   - Validates cart items
   - Creates MongoDB order (status: Pending)
   - Creates Razorpay order
   - Returns razorpayOrderId & razorpayKeyId
   ↓
3. Frontend initializes Razorpay modal
   - Displays payment options (Card, UPI, NetBanking, Wallet)
   - User completes payment
   ↓
4. Razorpay sends webhook to /api/payment/verify
   - Verifies cryptographic signature
   - Updates order status to Paid
   - Generates PDF invoice
   - Updates shipping status to Processing
   ↓
5. Order confirmation sent to customer
```

### Frontend Implementation

```typescript
const handlePayment = async (cartItems, customerDetails) => {
  // Step 1: Create checkout order
  const checkoutResponse = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ items: cartItems, customerDetails }),
  });

  const { data } = await checkoutResponse.json();
  const { razorpayOrderId, razorpayKeyId, totalAmount } = data;

  // Step 2: Initialize Razorpay
  const options = {
    key: razorpayKeyId,
    amount: Math.round(totalAmount * 100), // paise
    currency: 'INR',
    order_id: razorpayOrderId,
    handler: async (response) => {
      // Webhook handles verification automatically
      console.log('Payment successful:', response);
    },
    prefill: {
      name: customerDetails.firstName + ' ' + customerDetails.lastName,
      email: customerDetails.email,
      contact: customerDetails.phone,
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

---

## MongoDB Schema

### Order Document Structure

```typescript
interface IOrder {
  orderId: string;                    // ORD-YYYYMMDD-XXXXX
  razorpayOrderId: string;            // order_XXXXX from Razorpay
  razorpayPaymentId: string;          // pay_XXXXX (after payment)
  razorpaySignature: string;          // Webhook signature for verification
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentVerifiedAt: Date;            // When webhook verified payment
  paymentMethod: 'Card' | 'UPI' | 'NetBanking' | 'Wallet';
  
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  
  items: OrderItem[];
  subtotal: number;
  tax: number;
  taxPercentage: number;              // Usually 18 (GST)
  shipping: number;
  totalAmount: number;
  
  shippingStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingId: string;                 // TRK-XXXXXXXX
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Security Features

### 1. Cryptographic Signature Verification
```typescript
const generatedSignature = crypto
  .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
  .update(`${orderId}|${paymentId}`)
  .digest('hex');

const isValid = generatedSignature === receivedSignature;
```

### 2. Request Validation
- All inputs validated with Zod schemas
- Price verification with 10% margin tolerance
- Stock verification before order creation

### 3. Order Idempotency
- Unique order IDs prevent duplicate processing
- Razorpay order ID indexed in MongoDB
- Payment verification checked before updating

---

## Error Handling

### Common Errors

**1. Invalid Signature**
```
Reason: Webhook secret mismatch or tampered payload
Fix: Verify RAZORPAY_WEBHOOK_SECRET matches Razorpay dashboard
```

**2. Order Not Found**
```
Reason: MongoDB order doesn't exist for razorpay_order_id
Fix: Ensure checkout creates order before payment attempt
```

**3. Price Mismatch**
```
Reason: Product price changed between checkout and payment
Fix: System allows 10% margin for currency fluctuation
```

**4. Stock Insufficient**
```
Reason: Product stock depleted during payment flow
Fix: Revert cart and notify customer to try again
```

---

## Production Checklist

- [ ] Razorpay live credentials set in environment
- [ ] RAZORPAY_WEBHOOK_SECRET configured
- [ ] Webhook endpoint publicly accessible (HTTPS)
- [ ] MongoDB connection string configured
- [ ] Error logging implemented
- [ ] Email notifications for payment confirmation
- [ ] Order tracking page implemented
- [ ] Invoice download functionality added
- [ ] Refund policy documented
- [ ] PCI compliance requirements met

---

## Testing

### Using Razorpay Test Credentials

1. Create test account at Razorpay dashboard
2. Use test API keys in development
3. Use test payment methods:
   - **Card:** 4111 1111 1111 1111 (any future date, any CVV)
   - **UPI:** success@razorpay
   - **Netbanking:** Success

### Webhook Testing

```bash
# Test webhook locally using ngrok
ngrok http 3000

# Add tunnel URL to Razorpay webhooks:
# https://xxxx-xx-xxx-xx-x.ngrok.io/api/payment/verify
```

---

## Invoice Generation

### PDF Invoice Details

The system automatically generates PDF invoices containing:
- Invoice number and date
- Company header (DERMFIX)
- Customer billing information
- Itemized product list
- Tax breakdown (18% GST)
- Shipping charges
- Total amount
- Payment reference
- Tracking ID

### Invoice Storage

Invoices are generated in memory and can be:
1. Returned to user for download
2. Emailed to customer
3. Stored in Blob storage
4. Generated on-demand from order data

---

## Support

For issues with Razorpay integration:
- **Razorpay Docs:** https://razorpay.com/docs/
- **API Reference:** https://razorpay.com/docs/api/
- **Webhook Guide:** https://razorpay.com/docs/webhooks/
- **Support:** support@razorpay.com
