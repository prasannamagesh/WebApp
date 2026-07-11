# DermFix Database Connection & Implementation Roadmap

## Current Status

### ✅ What's Already Done (Database Foundation)
1. **Database Connection** - `src/lib/db.ts` ✅
   - Mongoose connection setup
   - Connection caching for performance
   - Environment variable configuration

2. **Database Models** ✅
   - `Product.ts` - Product schema defined
   - `Order.ts` - Order schema defined
   - Both with validation and indexes

3. **API Routes** ⚠️ (Partially implemented)
   - `/api/products` - GET (tries MongoDB, fallback to hardcoded data)
   - `/api/orders` - GET/POST (MongoDB ready)
   - `/api/payment/*` - Razorpay integration
   - `/api/checkout` - Order creation

4. **Frontend Data** (Currently Hardcoded)
   - `src/data/products.ts` - Hardcoded product catalog
   - Components fetch from this static file, NOT from database

---

## Problem: Why Data Isn't Connected Yet

### Current Data Flow (❌ Not Ideal)
```
Frontend Component
    ↓
Import from /data/products.ts (Hardcoded file)
    ↓
Display static data
    ↓
Cart stores in React Context (memory only, lost on refresh)
    ↓
Checkout tries to save to MongoDB (but data isn't actually persisted)
```

### What Should Happen (✅ Correct Way)
```
Frontend Component
    ↓
Call API: /api/products (GET)
    ↓
Backend API connects to MongoDB
    ↓
MongoDB returns fresh data
    ↓
Frontend displays data
    ↓
When user checks out → Saves to MongoDB Order collection
    ↓
Data persists forever
```

---

## Step-by-Step Implementation Guide

### STEP 1: Verify MongoDB Connection Setup

**What to do:**
1. Verify environment variables are set
2. Test database connection
3. Seed initial product data

**File:** `.env.local` or `.env.development.local`

```bash
# Check if this is set:
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/dermfix
```

**How to get MongoDB URI:**
1. Go to https://www.mongodb.com/cloud/atlas/
2. Create account (free tier available)
3. Create cluster
4. Get connection string
5. Add to `.env.local`

**Test connection script:**
```bash
# Run in terminal
cd /vercel/share/v0-project
npm run dev

# Check console for "Connected to MongoDB" message
```

---

### STEP 2: Seed Initial Product Data

**What to do:**
- Insert 6 sample products into MongoDB (from hardcoded data)
- This allows database to work without manual setup

**Create seed script:** `src/lib/seed.ts`

```typescript
import connectDB from './db';
import Product from '@/models/Product';
import { CATALOGUE } from '@/data/products';

async function seedDatabase() {
  try {
    await connectDB();

    // Check if products already exist
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log('Products already seeded');
      return;
    }

    // Transform hardcoded data to MongoDB format
    const products = CATALOGUE.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      description: item.description || '',
      images: item.images || [item.image],
      stockCount: 100,
      rating: item.rating,
      reviews: item.reviews,
      category: item.concern === 'All' ? 'Specialized' : 'Serums',
      concern: item.concern,
      benefits: item.benefits || [],
      ingredients: item.ingredients || [],
      volume: item.volume || '30ml',
      tags: [item.concern.toLowerCase()],
      isBestSeller: item.isBestSeller || false,
      isNewProduct: item.isNew || false,
      sku: `DRM-${item.id.toUpperCase()}`,
    }));

    // Insert into MongoDB
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

export default seedDatabase;
```

**Run seed script:**
```bash
node -r ts-node/register src/lib/seed.ts
# or create npm script in package.json:
# "seed": "node -r ts-node/register src/lib/seed.ts"
npm run seed
```

---

### STEP 3: Update Product API to Use MongoDB

**File:** `src/app/api/products/route.ts`

✅ **Already implemented!** The API already uses MongoDB:
```typescript
const [products, total] = await Promise.all([
  Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean(),
  Product.countDocuments(filter),
]);
```

**How to test:**
```bash
# In browser or Postman:
GET http://localhost:3000/api/products

# Should return:
{
  "success": true,
  "data": [
    { "id": "...", "name": "...", "price": 1499, ... }
  ],
  "pagination": { ... }
}
```

---

### STEP 4: Replace Hardcoded Products with API Call

**File:** `src/app/products/page.tsx`

**Current code:**
```typescript
import { CATALOGUE } from '@/data/products';
// ... then uses CATALOGUE directly
```

**Change to:**
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from API instead of hardcoded data
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    // Render products from state
  );
}
```

---

### STEP 5: Update Orders API Integration

**File:** `src/app/api/orders/route.ts`

✅ **Already has POST to save orders!**

**Current implementation:**
```typescript
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = new Order(body);
    await order.save();
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
```

**How to use from checkout:**
```typescript
// When user clicks Checkout button:
const order = {
  orderId: `ORD-${Date.now()}`,
  customerDetails: {
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    phone: "9876543210",
    address: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India"
  },
  items: cartItems,
  totalAmount: 2999,
  subtotal: 2900,
  tax: 99,
  shipping: 0,
  paymentMethod: "UPI",
  paymentStatus: "Paid"
};

const response = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(order)
});

const result = await response.json();
console.log('Order created:', result.data.orderId);
```

---

## Pending Implementation Tasks

### TASK 1: Create User Model & API
**Priority:** HIGH | **Time:** 2-3 hours

**What to create:**
1. User schema with MongoDB
2. API endpoints for user management
3. Save user profile during checkout

**Files to create:**
```
src/models/User.ts
src/app/api/users/route.ts
src/app/api/users/[id]/route.ts
```

**User Schema:**
```typescript
{
  phone: String (unique),
  name: String,
  email: String,
  savedAddresses: [{
    type: 'home' | 'office',
    street: String,
    city: String,
    state: String,
    zipCode: String
  }],
  createdAt: Date
}
```

---

### TASK 2: Create Coupon Model & Validation API
**Priority:** HIGH | **Time:** 2 hours

**What to create:**
1. Coupon schema
2. API to validate coupon codes
3. Calculate discount in checkout

**Files to create:**
```
src/models/Coupon.ts
src/app/api/coupons/validate/route.ts
```

**Coupon Schema:**
```typescript
{
  code: String (unique),
  discount: Number (percentage),
  minAmount: Number,
  maxUsage: Number,
  usageCount: Number,
  expiryDate: Date
}
```

---

### TASK 3: Email Notifications
**Priority:** MEDIUM | **Time:** 4-5 hours

**What to create:**
1. Email service setup (Nodemailer)
2. Email templates
3. Send on order creation

**Setup:**
```bash
npm install nodemailer
```

**Files to create:**
```
src/lib/email.ts
src/lib/emailTemplates.ts
src/app/api/orders/route.ts (update to send email)
```

**Send order email:**
```typescript
import { sendOrderConfirmation } from '@/lib/email';

// After order is saved to MongoDB:
await sendOrderConfirmation({
  orderId: order.orderId,
  email: order.customerDetails.email,
  items: order.items,
  total: order.totalAmount
});
```

---

### TASK 4: Delivery Tracking Integration
**Priority:** MEDIUM | **Time:** 6-8 hours

**What to integrate:**
1. Shiprocket API
2. Create shipment endpoint
3. Track order status

**Setup:**
```bash
npm install axios
```

**Files to create:**
```
src/lib/shiprocket.ts
src/app/api/shipping/create/route.ts
src/app/api/shipping/track/route.ts
```

**Create shipment:**
```typescript
export async function createShipment(orderId: string, items: any[]) {
  const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
    order_id: orderId,
    order_date: new Date(),
    customer_name: '...',
    customer_email: '...',
    // ... more fields
  }, {
    headers: { Authorization: `Bearer ${SHIPROCKET_TOKEN}` }
  });
  return response.data;
}
```

---

### TASK 5: SMS Gateway Integration
**Priority:** LOW | **Time:** 3 hours

**What to integrate:**
1. Twilio or AWS SNS
2. Send SMS on order
3. Send SMS on shipment

**Setup:**
```bash
npm install twilio
```

**Usage:**
```typescript
const twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

await twilio.messages.create({
  from: '+1234567890',
  to: '+919876543210',
  body: `Your order ${orderId} has been placed! Track: link`
});
```

---

### TASK 6: WhatsApp Integration
**Priority:** LOW | **Time:** 4-5 hours

**What to integrate:**
1. WhatsApp Business API
2. Send order updates
3. Customer support

**Setup requires:** WhatsApp Business Account

---

## Quick Setup Checklist

### Before Starting Implementation:
- [ ] Create MongoDB Atlas account (free tier)
- [ ] Get MongoDB connection string
- [ ] Add to `.env.local`
- [ ] Test database connection with `npm run dev`
- [ ] Seed products to database
- [ ] Test `/api/products` in browser

### Implementation Order:
1. **Week 1:** Verify DB connection → Seed data → Update product page
2. **Week 2:** Create User/Coupon models → Update checkout
3. **Week 3:** Email integration → Delivery tracking
4. **Week 4:** SMS + WhatsApp

---

## Environment Variables Needed

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/dermfix

# Razorpay (already set up)
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Shiprocket (when ready)
SHIPROCKET_API_KEY=...
SHIPROCKET_API_TOKEN=...

# Twilio (optional)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE=...
```

---

## Testing Database Operations

### Test 1: Check MongoDB Connection
```javascript
// In browser console:
fetch('/api/products')
  .then(r => r.json())
  .then(d => console.log(d))
```

### Test 2: Create an Order
```javascript
fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: 'ORD-12345',
    customerDetails: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '9876543210',
      address: '123 Main',
      city: 'Mumbai',
      state: 'MH',
      postalCode: '400001'
    },
    items: [{ productId: '1', name: 'Serum', price: 1499, quantity: 1 }],
    totalAmount: 1499,
    subtotal: 1499,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid'
  })
})
.then(r => r.json())
.then(d => console.log('Order saved:', d))
```

### Test 3: Fetch Orders
```javascript
fetch('/api/orders')
  .then(r => r.json())
  .then(d => console.log('All orders:', d.data))
```

---

## Troubleshooting

### Issue 1: "MONGODB_URI not defined"
**Solution:**
- Check `.env.local` exists in project root
- Verify `MONGODB_URI=mongodb+srv://...` is there
- Restart dev server: `npm run dev`

### Issue 2: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB (allow 0.0.0.0/0 for development)
- Test connection string manually

### Issue 3: "Model not registered"
**Solution:**
- Ensure `connectDB()` is called before using models
- Check model exports are correct

### Issue 4: "CORS error when calling API"
**Solution:**
- Add CORS headers in API route (Vercel handles this automatically)
- Ensure API route is in `/src/app/api/` folder

---

## Summary

### What's Working Now ✅
- Database connection configured
- Models defined with validation
- Checkout API exists
- Payment processing works
- Hardcoded data displays

### What Needs Wiring ⚠️
- Connect frontend to API (not hardcoded data)
- Save products to MongoDB
- Create user/coupon models
- Email notifications
- Delivery tracking
- SMS updates

### Expected Timeline
- **Step 1-4:** 1 week (core functionality)
- **Step 5-6:** 2 weeks (email, tracking)
- **Full launch:** 2-3 weeks

**Start with Step 1 and work through systematically!**

