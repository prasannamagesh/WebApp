# DermFix E-Commerce API Documentation

## Overview
Complete REST API for the DermFix skincare e-commerce platform with MongoDB backend integration. Production-ready with full validation, error handling, and security considerations.

---

## Database Setup

### Environment Variables
Create a `.env.local` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dermfix
```

### Database Connection
- **File**: `src/lib/db.ts`
- **Pattern**: Singleton with caching for optimal performance
- **Features**: Automatic reconnection, connection pooling, lazy initialization

---

## Data Models

### Product Schema (`src/models/Product.ts`)

#### Fields:
```typescript
{
  id: string (unique, required)
  name: string (max 200 chars)
  slug: string (unique, lowercase)
  price: number (min 0)
  originalPrice?: number
  description: string (max 2000 chars)
  images: string[] (min 1)
  stockCount: number (min 0)
  rating: number (0-5)
  reviews: number (min 0)
  category: enum['Serums', 'Moisturizers', 'Sunscreen', 'Eye Care', 'Specialized']
  concern: enum['All', 'Brightening', 'Dry Skin', 'Sun Care', 'Anti-Aging', 'Hydration']
  benefits: IProductBenefit[] {
    icon: 'shield' | 'beaker' | 'leaf'
    title: string
    description: string
  }
  ingredients: string[]
  volume: string
  tags: string[]
  isBestSeller: boolean
  isNewProduct: boolean
  sku: string (unique)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

#### Indexes:
- `slug` - For fast product lookups by URL
- `category` - For category filtering
- `concern` - For concern-based filtering
- `tags` - For tag-based filtering
- `isBestSeller, isNewProduct` - For featured products

---

### Order Schema (`src/models/Order.ts`)

#### Fields:
```typescript
{
  orderId: string (unique, uppercase, required) // e.g., ORD-20260710-ABC12
  customerDetails: {
    firstName: string
    lastName: string
    email: string (validated)
    phone: string (10 digits, India format)
    address: string
    city: string
    state: string
    postalCode: string
    country: string (default: 'India')
  }
  items: IOrderItem[] {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }
  totalAmount: number
  subtotal: number
  tax: number (18% GST)
  shippingCost: number (0 for orders >= ₹500)
  paymentStatus: enum['Pending', 'Paid', 'Failed', 'Refunded']
  shippingStatus: enum['Processing', 'Shipped', 'Delivered', 'Cancelled']
  trackingId: string (unique, uppercase) // e.g., TRK-ABC12XYZ
  paymentMethod: enum['Card', 'UPI', 'NetBanking', 'Wallet']
  paymentId?: string (unique from payment provider)
  notes?: string (max 500 chars)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

#### Indexes:
- `orderId` - Primary order lookup
- `customerDetails.email` - Customer orders history
- `paymentStatus` - Payment reconciliation
- `shippingStatus` - Fulfillment tracking
- `createdAt` - Historical queries

---

## API Endpoints

### 1. GET /api/products
Fetch products with filtering, searching, and sorting

#### Query Parameters:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| concern | string | - | Filter by product concern |
| category | string | - | Filter by category |
| search | string | - | Search in name/description/tags |
| sortBy | enum | featured | Sort option: featured, price-asc, price-desc, rating |
| page | number | 1 | Page number (pagination) |
| limit | number | 12 | Items per page (max 100) |

#### Example Request:
```bash
GET /api/products?concern=Anti-Aging&sortBy=price-asc&page=1&limit=12
```

#### Success Response (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "ectoin-recovery-serum",
      "name": "Post Exposure Recovery Serum",
      "price": 1499,
      "rating": 4.9,
      "concern": "All",
      "isBestSeller": true,
      "isNewProduct": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Error Response:
```json
{
  "success": false,
  "error": "Invalid query parameters",
  "details": [...]
}
```

---

### 2. GET /api/products/[id]
Fetch a single product by slug or ID

#### Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Product slug or ID |

#### Example Request:
```bash
GET /api/products/ectoin-recovery-serum
```

#### Success Response (200):
```json
{
  "success": true,
  "data": {
    "id": "ectoin-recovery-serum",
    "name": "Post Exposure Recovery Serum",
    "price": 1499,
    "originalPrice": 1999,
    "description": "...",
    "images": ["/images/products/ectoin-recovery-serum.png"],
    "stockCount": 150,
    "benefits": [
      {
        "icon": "shield",
        "title": "Strengthens Barrier",
        "description": "..."
      }
    ],
    "ingredients": ["2% Ectoin", "Ceramides", "..."]
  }
}
```

#### Error Responses:
```json
// 404 Not Found
{
  "success": false,
  "error": "Product not found"
}

// 500 Server Error
{
  "success": false,
  "error": "Failed to fetch product"
}
```

---

### 3. POST /api/checkout
Process cart and create order

#### Request Body:
```json
{
  "items": [
    {
      "productId": "ectoin-recovery-serum",
      "name": "Post Exposure Recovery Serum",
      "price": 1499,
      "quantity": 2,
      "image": "/images/products/ectoin-recovery-serum.png"
    }
  ],
  "customerDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400001",
    "country": "India"
  },
  "paymentMethod": "Card",
  "paymentId": "pay_1234567890",
  "notes": "Please deliver between 9 AM - 5 PM"
}
```

#### Validation Rules:
- **firstName/lastName**: Non-empty strings
- **email**: Valid email format
- **phone**: Exactly 10 digits
- **address**: Min 5 characters
- **quantity**: Min 1, max product stock
- **price**: Must match product price within 10% margin (handles currency fluctuation)
- **items**: Minimum 1 item required

#### Success Response (201):
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "ORD-20260710-ABC12",
    "trackingId": "TRK-XYZ98765",
    "totalAmount": 3196,
    "paymentStatus": "Paid",
    "shippingStatus": "Processing"
  }
}
```

#### Price Calculation:
```
Subtotal = Sum of (price × quantity)
Tax = Subtotal × 0.18 (18% GST)
Shipping = Subtotal >= 500 ? 0 : 50
Total = Subtotal + Tax + Shipping
```

#### Error Responses:
```json
// 400 Bad Request - Validation Error
{
  "success": false,
  "error": "Invalid request payload",
  "details": [
    {
      "path": "customerDetails.email",
      "message": "Invalid email"
    }
  ]
}

// 404 Not Found - Product Missing
{
  "success": false,
  "error": "Product ectoin-recovery-serum not found"
}

// 400 Bad Request - Insufficient Stock
{
  "success": false,
  "error": "Insufficient stock for product Post Exposure Recovery Serum. Available: 10"
}

// 400 Bad Request - Price Mismatch
{
  "success": false,
  "error": "Price mismatch for Post Exposure Recovery Serum. Current price: ₹1299"
}

// 500 Server Error
{
  "success": false,
  "error": "Failed to process checkout"
}
```

---

## Security Considerations

### Input Validation
- **Zod Schemas**: All inputs validated with strict type checking
- **Price Validation**: 10% margin to handle currency fluctuations
- **Stock Verification**: Confirmed before order creation
- **Email Validation**: Regex pattern for valid email format
- **Phone Validation**: India-specific 10-digit validation

### Database Safety
- **Parameterized Queries**: Mongoose prevents SQL injection
- **Lean Queries**: Fetch only necessary fields for performance
- **Transaction Support**: Stock decrements after order validation
- **Unique Indexes**: Prevent duplicate orders and SKUs

### Error Handling
- **Comprehensive Logging**: All errors logged to console
- **Generic Error Messages**: Security-focused error responses
- **Validation Details**: Specific error paths for client-side handling
- **HTTP Status Codes**: Proper status codes for each scenario

---

## Performance Optimizations

### Database
- **Lean Queries**: `.lean()` for read-only operations
- **Field Selection**: Only fetch necessary fields
- **Indexes**: Strategic indexing on frequently queried fields
- **Connection Caching**: Reuse MongoDB connections

### API
- **Pagination**: Default 12 items per page, max 100
- **Response Size**: Minimize payload with lean queries
- **Async Operations**: Non-blocking I/O for all database calls

---

## Integration Examples

### Frontend Cart Checkout
```javascript
async function processCheckout(cartData) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cartData.items,
      customerDetails: formData,
      paymentMethod: 'Card',
      paymentId: stripePaymentId
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Checkout failed:', error.details);
    return;
  }
  
  const order = await response.json();
  // Redirect to order confirmation with order.data.orderId
}
```

### Product Filtering
```javascript
async function fetchProducts(filters) {
  const params = new URLSearchParams({
    concern: filters.concern || '',
    sortBy: filters.sort || 'featured',
    page: filters.page || 1,
    limit: 12
  });
  
  const response = await fetch(`/api/products?${params}`);
  const result = await response.json();
  
  return {
    products: result.data,
    pagination: result.pagination
  };
}
```

---

## Deployment Checklist

- [ ] MongoDB URI configured in production environment
- [ ] All API routes tested with real data
- [ ] Payment gateway integration verified
- [ ] Email notifications configured for orders
- [ ] Error logging and monitoring enabled
- [ ] Rate limiting configured for checkout endpoint
- [ ] CORS properly configured if frontend is separate domain
- [ ] SSL/HTTPS enforced in production
- [ ] Database backups configured
- [ ] Monitoring and alerts set up

---

## Support

For issues or questions about the API, refer to error details in responses or check database logs for more context.
