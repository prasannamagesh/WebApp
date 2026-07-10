'use client';

import Image from 'next/image';

const PRODUCTS = [
  {
    id: 1,
    name: 'DERMFIX 2% Ectoin Night Serum',
    concentration: '2% Ectoin',
    tagline: 'Post Exposure Recovery Serum',
    description: 'Strengthens skin barrier and supports recovery from UV-induced stress',
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
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Products Catalog</h1>
        <p className="text-gray-600 mt-2">DermFix product lineup and inventory management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="relative h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-4">
              {/* Branding */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-rNpc9dpJ1qWVCADlP6QMJvKauqld4E.png"
                    alt="DermFix"
                    width={80}
                    height={30}
                    className="h-6 w-auto"
                  />
                </div>
                <p className="text-xs font-semibold text-blue-600 tracking-widest uppercase">
                  {product.concentration} • {product.tagline}
                </p>
              </div>

              {/* Title and Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              </div>

              {/* Benefits */}
              <div className="flex gap-2">
                {product.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full"
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              {/* Specs */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Size</p>
                  <p className="text-sm font-semibold text-gray-900">{product.specs.size}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Type</p>
                  <p className="text-sm font-semibold text-gray-900">{product.specs.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Suitable For</p>
                  <p className="text-sm font-semibold text-gray-900">{product.specs.suitable}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Product
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  View Stats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Inventory Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">1,240</p>
            <p className="text-sm text-gray-600 mt-1">Total Units in Stock</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">68%</p>
            <p className="text-sm text-gray-600 mt-1">Stock Fill Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Low Stock Items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
