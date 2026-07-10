# Razorpay Integration - Quick Start Guide

## 5-Minute Setup

### Step 1: Get Razorpay Credentials (2 mins)
```
1. Go to https://razorpay.com → Create account
2. Dashboard → Settings → API Keys
3. Copy Key ID and Key Secret
4. Go to Webhooks → Create webhook
5. Endpoint: https://yourdomain.com/api/payment/verify
6. Copy Webhook Secret
```

### Step 2: Configure Environment (1 min)
```bash
# .env.local
RAZORPAY_KEY_ID=rzp_live_XXXXX
RAZORPAY_KEY_SECRET=XXXXX
RAZORPAY_WEBHOOK_SECRET=whsec_XXXXX
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dermfix
```

### Step 3: API Endpoints Ready (0 mins)
```
✓ POST /api/payment/order      - Create orders
✓ POST /api/payment/verify     - Webhook for payments
✓ POST /api/checkout           - Integrated with Razorpay
```

---

## How It Works

### User Clicks "Checkout"
```
Cart Items → /api/checkout → MongoDB Order Created + Razorpay Order
                              ↓
                         Return: razorpayOrderId, razorpayKeyId, totalAmount
```

### User Completes Payment
```
Razorpay Modal → User Pays → Razorpay Webhook Sent to /api/payment/verify
                               ↓
                          Signature Verified → Order Status = "Paid"
                          PDF Invoice Generated
                          Shipping Status = "Processing"
```

---

## Important Files

| File | Purpose |
|------|---------|
| `/src/app/api/payment/order/route.ts` | Create Razorpay orders |
| `/src/app/api/payment/verify/route.ts` | Payment verification webhook |
| `/src/lib/invoice-generator.ts` | PDF invoice generation |
| `/src/models/Order.ts` | Updated with Razorpay fields |
| `/src/app/api/checkout/route.ts` | Integrated with Razorpay |
| `/RAZORPAY_INTEGRATION.md` | Full documentation |

---

## Key Security Features

✓ **HMAC-SHA256 Signature Verification** - Prevents webhook tampering
✓ **Zod Schema Validation** - Validates all inputs
✓ **Price Verification** - 10% margin tolerance for safety
✓ **Stock Verification** - Prevents overselling
✓ **MongoDB Indexing** - Fast payment status lookups
✓ **Order Idempotency** - No duplicate processing

---

## Testing Payment Flow

### Test Credentials
```
Card: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
```

### Using Test Keys
```bash
# In .env.local during development
RAZORPAY_KEY_ID=rzp_test_XXXXX
RAZORPAY_KEY_SECRET=XXXXX
```

---

## Frontend Integration Example

```jsx
const handleCheckout = async () => {
  // Step 1: Create order
  const res = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({
      items: cartItems,
      customerDetails: formData,
      paymentMethod: 'Card',
    }),
  });

  const { data } = await res.json();
  
  // Step 2: Open Razorpay modal
  const options = {
    key: data.razorpayKeyId,
    amount: Math.round(data.totalAmount * 100),
    currency: 'INR',
    order_id: data.razorpayOrderId,
    handler: (response) => {
      console.log('Payment successful!');
      // Webhook automatically updates order status
    },
    prefill: {
      name: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      contact: formData.phone,
    },
  };

  new window.Razorpay(options).open();
};
```

---

## What Happens Next

1. **User Payment Complete** → Razorpay processes payment
2. **Webhook Triggered** → `/api/payment/verify` receives notification
3. **Signature Verified** → Ensures authentic Razorpay event
4. **Order Updated** → `paymentStatus = "Paid"`, `shippingStatus = "Processing"`
5. **Invoice Generated** → PDF created automatically
6. **User Notified** → Email with tracking info (implement separately)
7. **Admin Notified** → Dashboard shows new order

---

## Production Deployment

```bash
# Build with Razorpay integration
npm run build

# Set environment variables in Vercel
# RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, MONGODB_URI

# Deploy
vercel deploy
```

---

## Troubleshooting

### "Invalid Signature" Error
- Verify `RAZORPAY_WEBHOOK_SECRET` matches Razorpay dashboard
- Check webhook URL is publicly accessible (HTTPS)

### "Order Not Found" Error
- Ensure checkout creates MongoDB order first
- Check `MONGODB_URI` is correct

### Webhook Not Triggering
- Go to Razorpay Dashboard → Webhooks → Test endpoint
- Verify endpoint URL includes `/api/payment/verify`
- Check server logs for errors

---

## Next Steps

1. Set up environment variables
2. Test payment flow with test credentials
3. Configure webhook in Razorpay dashboard
4. Implement email notifications (optional)
5. Add order tracking page for customers
6. Deploy to production

**Documentation:** See `/RAZORPAY_INTEGRATION.md` for complete guide
