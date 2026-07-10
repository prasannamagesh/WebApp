'use client';

import { useState } from 'react';
import { ArrowRight, Camera, AtSign, Play } from 'lucide-react';

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Shop All', href: '/products' },
      { label: 'Best Sellers', href: '/products?filter=bestsellers' },
      { label: 'New Launches', href: '/products?filter=new' },
      { label: 'Bundles + Duos', href: '#' },
      { label: 'Gift Sets', href: '#' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Our Science', href: '#' },
      { label: 'Skin Test', href: '#' },
      { label: 'Ingredient Glossary', href: '#' },
      { label: 'Skincare Guides', href: '#' },
      { label: 'Clinical Studies', href: '#' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Track Order', href: '#' },
      { label: 'Returns + Refunds', href: '#' },
      { label: 'Shipping Policy', href: '#' },
      { label: 'FAQ', href: '/contact' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About DermFix', href: '/' },
      { label: 'Our Story', href: '/' },
      { label: 'Press', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-surface">
      {/* Newsletter strip */}
      <div className="border-b border-surface/10">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-accent mb-2">
                Join the Community
              </p>
              <h3 className="text-[22px] lg:text-[28px] font-black tracking-tight leading-tight">
                Science Straight
                <br />
                to Your Inbox.
              </h3>
              <p className="text-[13px] text-surface/50 mt-2 leading-relaxed">
                New launches, skin guides, and exclusive member pricing — no spam, ever.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              {subscribed ? (
                <p className="text-[14px] font-semibold text-brand-accent">
                  You&apos;re on the list. Welcome to DermFix+.
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-surface/10 border border-surface/20 text-surface placeholder:text-surface/30
                               text-[13px] px-4 py-3 outline-none focus:border-brand-accent transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-brand-accent text-surface
                               text-[11px] tracking-[0.14em] uppercase font-semibold px-6 py-3
                               hover:bg-surface hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={13} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="inline-flex items-start mb-4">
              <span className="text-[18px] font-black tracking-[0.16em] text-surface">DERMFIX</span>
              <span className="text-brand-accent font-light text-[14px] leading-none -mt-0.5 ml-0.5">+</span>
            </div>
            <p className="text-[12px] text-surface/50 leading-relaxed mb-6 max-w-[200px]">
              Preventive Skin Science. Formulated for results, not marketing.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { icon: Camera, label: 'Instagram' },
                { icon: AtSign, label: 'Twitter' },
                { icon: Play, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-surface/40 hover:text-brand-accent transition-colors"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] tracking-[0.18em] uppercase font-bold text-surface/40 mb-5">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-surface/70 hover:text-surface transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface/10">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-surface/30">
            &copy; {new Date().getFullYear()} DermFix Skin Science Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Terms', 'Privacy', 'Refund Policy'].map((item) => (
              <a key={item} href="#" className="text-[11px] text-surface/30 hover:text-surface/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
