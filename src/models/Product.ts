import mongoose, { Schema, Document } from 'mongoose';

export interface IProductBenefit {
  icon: 'shield' | 'beaker' | 'leaf';
  title: string;
  description: string;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  stockCount: number;
  rating: number;
  reviews: number;
  category: string;
  concern: string;
  benefits: IProductBenefit[];
  ingredients: string[];
  volume: string;
  tags: string[];
  isBestSeller: boolean;
  isNewProduct: boolean;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'Product must have at least one image',
      },
    },
    stockCount: {
      type: Number,
      required: [true, 'Stock count is required'],
      min: [0, 'Stock count cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    reviews: {
      type: Number,
      min: [0, 'Reviews count cannot be negative'],
      default: 0,
    },
    category: {
      type: String,
      enum: ['Serums', 'Moisturizers', 'Sunscreen', 'Eye Care', 'Specialized'],
      default: 'Specialized',
    },
    concern: {
      type: String,
      enum: ['All', 'Brightening', 'Dry Skin', 'Sun Care', 'Anti-Aging', 'Hydration'],
      required: true,
    },
    benefits: [
      {
        icon: {
          type: String,
          enum: ['shield', 'beaker', 'leaf'],
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    ingredients: {
      type: [String],
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      index: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ concern: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ isBestSeller: 1, isNew: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
