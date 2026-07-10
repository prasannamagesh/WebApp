import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ICustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IOrder extends Document {
  orderId: string;
  customerDetails: ICustomerDetails;
  items: IOrderItem[];
  totalAmount: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  shippingStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingId: string;
  paymentMethod: 'Card' | 'UPI' | 'NetBanking' | 'Wallet';
  paymentId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      unique: true,
      required: [true, 'Order ID is required'],
      uppercase: true,
      index: true,
    },
    customerDetails: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please provide a valid email',
        ],
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      state: {
        type: String,
        required: [true, 'State is required'],
      },
      postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
      },
      country: {
        type: String,
        default: 'India',
      },
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['Pending', 'Paid', 'Failed', 'Refunded'],
        message: 'Payment status must be Pending, Paid, Failed, or Refunded',
      },
      default: 'Pending',
      index: true,
    },
    shippingStatus: {
      type: String,
      enum: {
        values: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        message: 'Shipping status must be Processing, Shipped, Delivered, or Cancelled',
      },
      default: 'Processing',
      index: true,
    },
    trackingId: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'UPI', 'NetBanking', 'Wallet'],
      required: true,
    },
    paymentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ 'customerDetails.email': 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ shippingStatus: 1 });
orderSchema.index({ createdAt: -1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
