'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface Product {
  id: number;
  name: string;
  concentration: string;
  tagline: string;
  description: string;
  price?: number;
  image: string;
  benefits: string[];
  specs: {
    size: string;
    type: string;
    suitable: string;
  };
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
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
    id: 2,
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
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  const handleSave = () => {
    if (editData) {
      if (editingId) {
        setProducts(products.map((p) => (p.id === editingId ? editData : p)));
      } else {
        setProducts([...products, { ...editData, id: Math.max(...products.map((p) => p.id), 0) + 1 }]);
      }
      setEditingId(null);
      setEditData(null);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(-1);
    setEditData({
      id: -1,
      name: '',
      concentration: '',
      tagline: '',
      description: '',
      price: 0,
      image: '',
      benefits: [],
      specs: {
        size: '',
        type: '',
        suitable: '',
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface border border-subtle transition-colors"
                >
                  <ChevronLeft size={20} />
                </Link>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Products Catalog</h1>
                  <p className="text-sm text-muted mt-1">Manage and edit DermFix products</p>
                </div>
              </div>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-foreground text-surface px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-accent transition-colors"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) =>
              editingId === product.id ? (
                // Edit Mode
                <div key={product.id} className="bg-surface border-2 border-brand-accent rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground">Edit Product</h3>
                    <button
                      onClick={handleCancel}
                      className="p-1.5 hover:bg-[#f2f2f0] rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {editData && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Concentration</label>
                          <input
                            type="text"
                            value={editData.concentration}
                            onChange={(e) => setEditData({ ...editData, concentration: e.target.value })}
                            className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                          <input
                            type="number"
                            value={editData.price || 0}
                            onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editData.tagline}
                          onChange={(e) => setEditData({ ...editData, tagline: e.target.value })}
                          className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                        <textarea
                          value={editData.description}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground resize-none"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                        <input
                          type="text"
                          value={editData.specs.type}
                          onChange={(e) =>
                            setEditData({ ...editData, specs: { ...editData.specs, type: e.target.value } })
                          }
                          className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-subtle">
                        <button
                          onClick={handleSave}
                          className="flex-1 flex items-center justify-center gap-2 bg-foreground text-surface px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-accent transition-colors"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 px-4 py-2.5 border border-subtle rounded-lg font-semibold text-sm hover:bg-surface transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // View Mode
                <div key={product.id} className="bg-surface border border-subtle rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="relative w-full h-56 sm:h-64 bg-[#f2f2f0] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-brand-accent font-semibold mt-1">{product.concentration}</p>
                      <p className="text-[13px] sm:text-[14px] text-muted mt-1">{product.tagline}</p>
                    </div>

                    <p className="text-[13px] sm:text-[14px] text-foreground leading-relaxed">{product.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {product.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="text-xs font-semibold px-2.5 py-1 bg-brand-accent/10 text-brand-accent rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-1 gap-2 py-3 border-t border-b border-subtle text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted">Size:</span>
                        <span className="font-semibold text-foreground">{product.specs.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Type:</span>
                        <span className="font-semibold text-foreground">{product.specs.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Suitable For:</span>
                        <span className="font-semibold text-foreground">{product.specs.suitable}</span>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="space-y-3">
                      {product.price && (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-brand-accent">₹{product.price}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 flex items-center justify-center gap-2 bg-foreground text-surface px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-accent transition-colors"
                        >
                          <Edit2 size={16} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Add New Product Card */}
            {isAdding && editData && (
              <div className="bg-surface border-2 border-brand-accent rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Add New Product</h3>
                  <button
                    onClick={handleCancel}
                    className="p-1.5 hover:bg-[#f2f2f0] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Concentration</label>
                      <input
                        type="text"
                        value={editData.concentration}
                        onChange={(e) => setEditData({ ...editData, concentration: e.target.value })}
                        className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Price</label>
                      <input
                        type="number"
                        value={editData.price || 0}
                        onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editData.tagline}
                      onChange={(e) => setEditData({ ...editData, tagline: e.target.value })}
                      className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-subtle">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 bg-foreground text-surface px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-accent transition-colors"
                    >
                      <Save size={16} />
                      Add Product
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2.5 border border-subtle rounded-lg font-semibold text-sm hover:bg-surface transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted mb-4">No products yet. Add one to get started.</p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 bg-foreground text-surface px-4 py-2.5 rounded-lg font-semibold hover:bg-brand-accent transition-colors"
              >
                <Plus size={18} />
                Add First Product
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
