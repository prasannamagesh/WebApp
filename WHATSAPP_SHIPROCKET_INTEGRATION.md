# WhatsApp & Shiprocket Integration Guide

Complete post-purchase automation system using Meta Cloud API and Shiprocket logistics for real-time customer notifications.

## Overview

The DermFix platform now includes automated post-purchase workflows:
1. **Order Confirmation** - WhatsApp notification sent immediately after checkout
2. **Shipment Dispatch** - WhatsApp notification with tracking link when order ships
3. **Delivery Confirmation** - WhatsApp notification when package is delivered

---

## Meta WhatsApp Cloud API Setup

### 1. Prerequisites
- Meta Business Account
- WhatsApp Business Account
- Approved message templates

### 2. Create Message Templates

Create the following templates in Meta Business Manager:

#### Template 1: ORDER_CONFIRMED
```
Language: English (US)
Category: ORDER_STATUS
Body:
Hello {{customer_name}},

Thank you for your order! 
Order ID: {{order_id}}
Total Amount: {{total_amount}}
Estimated Delivery: {{estimated_delivery}}

We'll notify you when your order ships.
```

#### Template 2: DISPATCHED
```
Language: English (US)
Category: ORDER_STATUS
Body:
Hi {{customer_name}},

Your order {{order_id}} has been dispatched!
Tracking ID: {{tracking_id}}

Track your package: {{tracking_url}}

Status updates coming soon!
```

#### Template 3: DELIVERED
```
Language: English (US)
Category: ORDER_STATUS
Body:
Great news {{customer_name}}!

Your order {{order_id}} has been delivered!
Tracking ID: {{tracking_id}}

Thank you for shopping with DermFix!
```

### 3. Environment Variables

Add to `.env.local`:

```env
# Meta WhatsApp Cloud API
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Getting these values:**
1. Go to Meta Business Manager
2. Navigate to System Users > [Your System User]
3. Generate access token with `whatsapp_business_messaging` permission
4. Find Phone Number ID in WhatsApp Business Account settings
5. Find Business Account ID in Business Manager

### 4. API Reference

#### sendWhatsAppNotification(phoneNumber, templateName, variables)

Send custom templated message:

```typescript
import { sendWhatsAppNotification } from '@/lib/whatsapp-service';

const result = await sendWhatsAppNotification(
  '919876543210', // Indian phone with country code
  'ORDER_CONFIRMED',
  {
    customer_name: 'John Doe',
    order_id: 'ORD-2026-0001',
    total_amount: '₹1,999',
    estimated_delivery: '2-3 business days'
  }
);

if (result.success) {
  console.log('Message sent:', result.messageId);
} else {
  console.error('Failed:', result.error);
}
```

#### Predefined Notifications

```typescript
// Order Confirmation
await sendOrderConfirmationNotification(phoneNumber, {
  orderId: 'ORD-2026-0001',
  customerName: 'John Doe',
  totalAmount: '1999.00',
  estimatedDelivery: '2-3 business days'
});

// Shipment Dispatch
await sendDispatchNotification(phoneNumber, {
  orderId: 'ORD-2026-0001',
  trackingId: 'SR123456789',
  trackingUrl: 'https://track.dermfix.com/SR123456789'
});

// Delivery Confirmation
await sendDeliveryNotification(phoneNumber, {
  orderId: 'ORD-2026-0001',
  trackingId: 'SR123456789'
});
```

### 5. Phone Number Format

Supported formats (automatically converted to E.164):
- `919876543210` ✓ (with country code)
- `+919876543210` ✓ (with + prefix)
- `9876543210` ✓ (without country code, defaults to India +91)
- `9876543210` → Converted to `919876543210`

---

## Shiprocket Integration

### 1. Setup Shiprocket Account

1. Create account at [shiprocket.in](https://shiprocket.in)
2. Add warehouse details
3. Enable webhook notifications in Settings

### 2. Environment Variables

Add to `.env.local`:

```env
# Shiprocket Logistics API
SHIPROCKET_API_KEY=your_api_key_here
SHIPROCKET_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Webhook Configuration

1. Go to Shiprocket Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/shipping/webhook`
3. Select events:
   - `order.ready_to_ship`
   - `shipment.dispatched`
   - `shipment.in_transit`
   - `shipment.delivered`
   - `shipment.cancelled`

### 4. Webhook Payload Structure

Shiprocket sends:

```json
{
  "event_type": "shipment.dispatched",
  "data": {
    "order_id": "123456",
    "shipment_id": "789012",
    "tracking_id": "SR123456789",
    "status": "dispatched",
    "current_status": "dispatched",
    "customer_phone": "919876543210",
    "customer_name": "John Doe"
  },
  "timestamp": "2026-07-11T10:30:00Z"
}
```

### 5. Status Mapping

| Shiprocket Status | Our Status |
|------------------|-----------|
| `ready_to_ship` | Processing |
| `dispatched` | Shipped |
| `in_transit` | Shipped |
| `out_for_delivery` | Shipped |
| `delivered` | Delivered |
| `cancelled` | Cancelled |
| `failed` | Cancelled |
| `returned` | Cancelled |

---

## Complete Automation Flow

### Step 1: Checkout
User completes checkout → POST `/api/checkout`

```typescript
// Automatically sends ORDER_CONFIRMED WhatsApp
await sendOrderConfirmationNotification(
  customerPhone,
  {
    orderId,
    customerName,
    totalAmount,
    estimatedDelivery
  }
);
```

### Step 2: Order Sync
- Order saved to MongoDB with `trackingId`
- Razorpay order created for payment
- WhatsApp notification sent (non-blocking)

### Step 3: Shiprocket Integration
Admin integrates with Shiprocket:
- Connect order in Shiprocket dashboard
- Shiprocket generates shipment with tracking ID
- Tracking ID must match our MongoDB `trackingId`

### Step 4: Dispatch Notification
Shiprocket webhook → `/api/shipping/webhook`

```typescript
// Status changed to "dispatched"
// 1. Update MongoDB order.shippingStatus = 'Shipped'
// 2. Send DISPATCHED WhatsApp with tracking link
await sendDispatchNotification(
  customerPhone,
  {
    orderId,
    trackingId,
    trackingUrl: 'https://yourdomain.com/track/SR123456789'
  }
);
```

### Step 5: Delivery Notification
When carrier marks delivered:

```typescript
// Status changed to "delivered"
// 1. Update MongoDB order.shippingStatus = 'Delivered'
// 2. Send DELIVERED WhatsApp
await sendDeliveryNotification(
  customerPhone,
  {
    orderId,
    trackingId
  }
);
```

---

## API Endpoints

### POST /api/checkout
Creates order with WhatsApp notification

**Request:**
```json
{
  "items": [
    {
      "productId": "ectoin-recovery-serum",
      "name": "Post Exposure Recovery Serum",
      "price": 1499,
      "quantity": 1,
      "image": "https://..."
    }
  ],
  "customerDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "919876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "MH",
    "postalCode": "400001",
    "country": "India"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-2026-0001",
    "trackingId": "TRK-2026-0001",
    "totalAmount": 1999,
    "razorpayOrderId": "order_xxx",
    "razorpayKeyId": "key_xxx"
  }
}
```

### POST /api/shipping/webhook
Receives Shiprocket tracking updates (automatically updates order and sends WhatsApp)

**Shiprocket sends:**
```json
{
  "event_type": "shipment.dispatched",
  "data": {
    "tracking_id": "SR123456789",
    "status": "dispatched",
    "customer_phone": "919876543210"
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ORD-2026-0001",
  "trackingId": "SR123456789",
  "status": "Shipped"
}
```

---

## Error Handling

### WhatsApp Failures
- Non-blocking: Checkout succeeds even if WhatsApp fails
- Logged with `[v0]` prefix for debugging
- Webhook doesn't fail if WhatsApp notification fails
- All errors include descriptive messages

### Shiprocket Issues
- Missing webhook secret → 400 Bad Request
- Invalid tracking ID → 404 Not Found
- Duplicate updates → Idempotent (no duplicate status changes)
- Database errors → 500 Internal Server Error

### Troubleshooting

**Message not received:**
1. Check phone number format (must include +91 for India)
2. Verify WhatsApp access token is valid
3. Check if template is approved in Meta
4. Review API response messageId

**Webhook not triggering:**
1. Verify webhook URL is publicly accessible
2. Check Shiprocket dashboard webhook logs
3. Ensure tracking ID matches MongoDB trackingId
4. Verify webhook secret in Shiprocket settings

**Order not updating:**
1. Check if tracking ID exists in MongoDB
2. Verify Shiprocket status matches our STATUS_MAP
3. Review application logs for errors
4. Check database connection

---

## Security

- All phone numbers validated and formatted
- API tokens stored in environment variables
- Webhook payload validation (status mapping)
- Non-blocking failures prevent order loss
- All API calls logged with [v0] prefix
- No sensitive data in error messages

---

## Monitoring

Monitor with console logs:

```typescript
// Successful flow
[v0] Shiprocket webhook received: { eventType: 'shipment.dispatched', status: 'dispatched' }
[v0] Order updated: { orderId: 'ORD-2026-0001', newStatus: 'Shipped' }
[v0] Dispatch notification sent: 919876543210

// Errors
[v0] WhatsApp credentials missing
[v0] WhatsApp API error: { error: { message: 'Invalid phone number' } }
[v0] Order not found for tracking ID: SR123456789
```

---

## Testing

### Manual WhatsApp Test
```bash
curl -X POST http://localhost:3000/api/payment/verify \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "sig_xxx"
  }'
```

### Manual Shiprocket Webhook Test
```bash
curl -X POST http://localhost:3000/api/shipping/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "shipment.dispatched",
    "data": {
      "tracking_id": "TRK-2026-0001",
      "status": "dispatched",
      "customer_phone": "919876543210"
    }
  }'
```

---

## Production Checklist

- [ ] All environment variables configured
- [ ] WhatsApp templates approved in Meta
- [ ] Shiprocket webhooks configured
- [ ] Phone numbers tested with real customers
- [ ] Error logging monitored
- [ ] Database backups enabled
- [ ] API rate limits configured
- [ ] SSL/HTTPS enabled
- [ ] Webhook URL publicly accessible
- [ ] Team trained on troubleshooting
