'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Save, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  concentration: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  benefits: string[];
  specs: {
    size: string;
    type: string;
    suitable: string;
  };
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'DERMFIX 2% Ectoin Night Serum',
    concentration: '2% Ectoin',
    tagline: 'Post Exposure Recovery Serum',
    description: 'Strengthens skin barrier and supports recovery from UV-induced stress',
    price: 699,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-kUIHppKWQEU9GwBDcUpbA7mojFfjUH.jpeg',
    benefits: ['Repair', 'Recover', 'Replenish'],
    specs: {
      size: '30 ml / 1.01 fl oz',
      type: 'Night Serum',
      suitable: 'All skin types',
    },
  },
  {
    id: '2',
    name: 'DERMFIX Multi-Use Serum',
    concentration: '2% Ectoin',
    tagline: 'Multi-Application Serum',
    description: 'Versatile formula for multiple skincare routines',
    price: 799,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.37.21%20PM-fBBWX6rROuYBckCDBcU6LKhKurrMwM.jpeg',
    benefits: ['Hydrate', 'Nourish', 'Protect'],
    specs: {
      size: '30 ml / 1.01 fl oz',
      type: 'Day/Night Serum',
      suitable: 'Sensitive skin',
    },
  },
  {
    id: '3',
    name: 'DERMFIX Vitamin C Serum',
    concentration: '10% Vitamin C',
    tagline: 'Brightening & Anti-Oxidant',
    description: 'Advanced vitamin C complex for radiant, glowing skin',
    price: 899,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.42.45%20PM-wbTZYXqkreUUhfBhIqgjogsdEpu0yQ.jpeg',
    benefits: ['Brighten', 'Protect', 'Rejuvenate'],
    specs: {
      size: '30 ml / 1.01 fl oz',
      type: 'Day Serum',
      suitable: 'All skin types',
    },
  },
  {
    id: '4',
    name: 'DERMFIX Hydration Complex',
    concentration: '5% Hyaluronic Acid',
    tagline: 'Deep Moisture Lock',
    description: 'Multi-layer hydration system for lasting moisture',
    price: 599,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.42.45%20PM-wbTZYXqkreUUhfBhIqgjogsdEpu0yQ.jpeg',
    benefits: ['Hydrate', 'Lock Moisture', 'Plump'],
    specs: {
      size: '30 ml / 1.01 fl oz',
      type: 'Universal',
      suitable: 'Dry & sensitive skin',
    },
  },
];

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load products on mount
  useEffect(() => {
    setProducts(DEFAULT_PRODUCTS);
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.concentration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditData({ ...product });
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditData({
      id: String(Date.now()),
      name: '',
      concentration: '',
      tagline: '',
      description: '',
      price: 0,
      image: '',
      benefits: [],
      specs: { size: '', type: '', suitable: '' },
    });
  };

  const handleSave = () => {
    if (!editData) return;

    if (editingId && editingId !== 'null') {
      // Update existing
      setProducts(products.map((p) => (p.id === editingId ? (editData as Product) : p)));
    } else {
      // Add new
      setProducts([...products, editData as Product]);
    }

    setEditingId(null);
    setEditData(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Products Catalog</h1>
          <p className="text-sm text-slate-600 mt-1">Manage and edit DermFix products</p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
        >
          <Plus size={18} strokeWidth={2} />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isAdding && editData && (
          <ProductEditCard
            product={editData as Product}
            isNew={true}
            onSave={handleSave}
            onCancel={handleCancel}
            onFieldChange={(field, value) =>
              setEditData({ ...editData, [field]: value })
            }
          />
        )}

        {editingId && editData && (
          <ProductEditCard
            product={editData as Product}
            isNew={false}
            onSave={handleSave}
            onCancel={handleCancel}
            onFieldChange={(field, value) =>
              setEditData({ ...editData, [field]: value })
            }
          />
        )}

        {filtered
          .filter((p) => p.id !== editingId)
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase">
                  {product.concentration}
                </p>
                <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{product.tagline}</p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-slate-900 mt-3">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="inline-flex items-center justify-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Delete Confirmation */}
              {deleteConfirm === product.id && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white rounded-lg p-6 max-w-sm mx-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-slate-900">Delete Product?</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {product.name} will be permanently deleted.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {filtered.length === 0 && !isAdding && (
        <div className="text-center py-12">
          <p className="text-slate-500">No products found</p>
        </div>
      )}
    </div>
  );
}

function ProductEditCard({
  product,
  isNew,
  onSave,
  onCancel,
  onFieldChange,
}: {
  product: Product;
  isNew: boolean;
  onSave: () => void;
  onCancel: () => void;
  onFieldChange: (field: string, value: any) => void;
}) {
  return (
    <div className="bg-white rounded-lg border-2 border-blue-500 overflow-hidden p-4 col-span-1 sm:col-span-2 lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Basic Info */}
        <div className="space-y-3 lg:col-span-2">
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Concentration</label>
            <input
              type="text"
              value={product.concentration}
              onChange={(e) => onFieldChange('concentration', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Tagline</label>
            <input
              type="text"
              value={product.tagline}
              onChange={(e) => onFieldChange('tagline', e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Pricing & Specs */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Price</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => onFieldChange('price', Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Size</label>
            <input
              type="text"
              value={product.specs?.size || ''}
              onChange={(e) =>
                onFieldChange('specs', { ...product.specs, size: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase">Description</label>
            <textarea
              value={product.description}
              onChange={(e) => onFieldChange('description', e.target.value)}
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
        <button
          onClick={onSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
        >
          <Save size={16} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  );
}
