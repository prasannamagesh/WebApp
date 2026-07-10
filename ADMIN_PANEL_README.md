# DermFix Admin Panel Documentation

## Overview

A secure, minimalist admin panel designed specifically for managing DermFix operations. The interface provides comprehensive order management, product catalog viewing, and operational metrics at a glance.

## Features Implemented

### 1. **Dashboard View**
- **Core Metrics Cards**: Display high-level KPIs
  - Total Revenue
  - Total Orders
  - Current Inventory Levels
- Clean card layout with icons for quick visual scanning
- Loading states for data retrieval

### 2. **Order Management Grid**
- **Responsive Data Table** with the following columns:
  - Order ID (clickable to expand details)
  - Customer Name & Email
  - Order Amount
  - Shipping Status (dropdown selector)
  - Payment Status (badge)
  - Actions (Invoice download button)

- **Expandable Order Details**:
  - Click on Order ID to view customer shipping address
  - Full address information displayed in expanded row
  - Quick access to full order details

- **Shipping Status Management**:
  - Dropdown selector with options: Processing, Shipped, Delivered, Cancelled
  - Real-time status updates
  - Loading indicators during updates

- **Invoice Generation**:
  - One-click PDF invoice download
  - Automatically generated with order details
  - Uses pdfkit for server-side generation

### 3. **Products Catalog**
- **Product Display Cards** featuring:
  - Product images (using DermFix product photography)
  - Product name and concentration
  - Key benefits badges
  - Product specifications (size, type, suitable for)
  - Edit and view stats buttons

- **Inventory Status Summary**:
  - Total units in stock
  - Stock fill rate percentage
  - Low stock item alerts

### 4. **Admin Navigation**
- **Sidebar Navigation** with:
  - Dashboard (main view)
  - Orders (full orders list and management)
  - Products (catalog management)
  - Settings (configuration options)
  - Logout button

### 5. **Settings Panel**
- General store configuration
- API keys management
- Email notification settings
- Shipping provider configuration

## Design & Branding

- **Color Scheme**: Royal blue (#1a4fd8) with white, grays, and cream accents
- **Logo**: DermFix logo displayed in sidebar header
- **Product Images**: Real product photography from DermFix catalog
  - Standalone product bottles
  - Lifestyle/application images
  - Product presentation shots
- **Typography**: Clean sans-serif with semantic hierarchy
- **Layout**: Sidebar navigation + main content area (responsive)

## API Integration Points

### Orders API (`/api/orders`)
- **GET** `/api/orders` - Fetch all orders
- **POST** `/api/orders` - Create new order

### Order Details & Status (`/api/orders/[id]`)
- **GET** `/api/orders/[id]` - Fetch specific order
- **PATCH** `/api/orders/[id]` - Update order status

### Invoice Generation (`/api/orders/[id]/invoice`)
- **GET** `/api/orders/[id]/invoice` - Generate & download PDF invoice

## Database Schema

### Order Model (Mongoose)
```typescript
{
  orderId: String (unique),
  customerDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  items: Array<{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }>,
  totalAmount: Number,
  subtotal: Number,
  tax: Number,
  taxPercentage: Number,
  shipping: Number,
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded',
  shippingStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled',
  trackingId: String,
  paymentMethod: 'Card' | 'UPI' | 'NetBanking' | 'Wallet',
  paymentId: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paymentVerifiedAt: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Navigation

### Accessing Admin Panel
1. **Via Footer Link**: "Admin Panel" link at the bottom of the public site
2. **Direct URL**: `/admin`
3. **Navigation**: Use sidebar to move between sections

### Main Routes
- `/admin` - Dashboard
- `/admin/orders` - Orders management
- `/admin/products` - Products catalog
- `/admin/settings` - Configuration

## Build Fixes Applied

### Next.js Configuration
- Removed deprecated `devIndicators` boolean configuration
- Removed unsupported `experimental.transitionIndicator` option
- Removed invalid `experimental.turbopackFileSystemCacheForDev` option
- Removed `images.cacheControl` (not a valid option in Next.js 14)
- Kept all working optimizations

### Type Fixes
- Fixed Lucide icon types using `LucideIcon` type from lucide-react
- Properly typed component props for dashboard metrics

## Navigation Enhancements

### "Our Science" Button
- Located in primary navigation menu
- Routes to `/science` page
- Shows "OUR SCIENCE" in desktop and mobile menus
- Includes proper navigation styling and hover effects

### Admin Link
- Added to footer for easy access
- Visible at the bottom of public pages
- Styled to match footer aesthetic

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js 14 API routes
- **Database**: MongoDB with Mongoose ODM
- **PDF Generation**: pdfkit
- **UI Icons**: lucide-react
- **Image Processing**: Next.js Image optimization

## Future Enhancements

1. Authentication & Authorization
   - Add role-based access control (RBAC)
   - Implement admin login system
   - Session management

2. Advanced Filtering
   - Filter orders by date range, status, payment method
   - Search functionality for orders and products
   - Export to CSV/Excel

3. Real-time Updates
   - WebSocket integration for live order updates
   - Dashboard metrics auto-refresh
   - Notification system for new orders

4. Inventory Management
   - Low stock alerts
   - Inventory tracking per product
   - Reorder automation

5. Analytics & Reporting
   - Revenue charts and trends
   - Customer insights
   - Performance metrics dashboard

## Troubleshooting

### Build Errors
- All deprecated Next.js config options have been removed
- Ensure MongoDB URI is set in environment variables
- Type checking should pass without errors

### Dashboard Not Loading
- Verify MongoDB connection
- Check API endpoints are accessible
- Ensure order data exists in database

### Images Not Displaying
- Verify Vercel Blob storage URLs are accessible
- Check remote image patterns in next.config.js

## Support & Contact

For issues or questions about the admin panel, please contact: hello@dermfix.com
