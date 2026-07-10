'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50 to-background">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-brand-accent mb-2">
            Get in Touch
          </p>
          <h1 className="text-[36px] lg:text-[48px] font-black tracking-tight text-foreground leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-[16px] text-muted max-w-2xl leading-relaxed">
            Have questions about our products? Our skincare experts are here to help. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="flex flex-col gap-8">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Mail size={20} className="text-brand-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-foreground mb-1">Email</h3>
                  <p className="text-[13px] text-muted mb-1">support@dermfix.com</p>
                  <p className="text-[12px] text-muted">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Phone size={20} className="text-brand-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-foreground mb-1">Phone</h3>
                  <p className="text-[13px] text-muted mb-1">+91-8800-123-456</p>
                  <p className="text-[12px] text-muted">Mon - Fri, 9 AM - 6 PM IST</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <MapPin size={20} className="text-brand-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-foreground mb-1">Address</h3>
                  <p className="text-[13px] text-muted mb-1">DermFix Labs, Bangalore</p>
                  <p className="text-[12px] text-muted">India</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Clock size={20} className="text-brand-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-foreground mb-1">Business Hours</h3>
                  <p className="text-[13px] text-muted mb-0.5">Mon - Fri: 9 AM - 6 PM</p>
                  <p className="text-[12px] text-muted">Sat - Sun: 10 AM - 4 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-subtle rounded-2xl p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                      <CheckCircle size={28} className="text-emerald-600" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[18px] font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-[14px] text-muted mb-6">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className="text-[18px] font-bold text-foreground mb-2">Send us a Message</h3>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-[12px] font-semibold text-foreground mb-2 uppercase tracking-[0.08em]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-subtle rounded-lg bg-white
                                 text-[13px] text-foreground placeholder:text-muted
                                 focus:outline-none focus:border-blue-300 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[12px] font-semibold text-foreground mb-2 uppercase tracking-[0.08em]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-subtle rounded-lg bg-white
                                 text-[13px] text-foreground placeholder:text-muted
                                 focus:outline-none focus:border-blue-300 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-[12px] font-semibold text-foreground mb-2 uppercase tracking-[0.08em]">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91-XXXXXXXXXX"
                        className="w-full px-4 py-3 border border-subtle rounded-lg bg-white
                                 text-[13px] text-foreground placeholder:text-muted
                                 focus:outline-none focus:border-blue-300 transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-[12px] font-semibold text-foreground mb-2 uppercase tracking-[0.08em]">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-subtle rounded-lg bg-white
                                 text-[13px] text-foreground
                                 focus:outline-none focus:border-blue-300 transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="support">Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-[12px] font-semibold text-foreground mb-2 uppercase tracking-[0.08em]">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className="w-full px-4 py-3 border border-subtle rounded-lg bg-white
                                 text-[13px] text-foreground placeholder:text-muted
                                 focus:outline-none focus:border-blue-300 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-white
                               text-[12px] font-bold tracking-[0.1em] uppercase rounded-lg
                               hover:bg-blue-900 disabled:opacity-50 transition-colors duration-200"
                    >
                      <Send size={14} strokeWidth={2} />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>

                    {/* Privacy note */}
                    <p className="text-[11px] text-muted text-center">
                      We respect your privacy. Your message is secure and confidential.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-subtle pt-16">
            <h2 className="text-[28px] lg:text-[36px] font-black text-foreground mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-[14px] text-muted mb-8">Quick answers to common questions</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">Do you ship internationally?</h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">What&apos;s your return policy?</h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  We offer 30-day easy returns on all unused products with original packaging.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">How do I know which product is right for me?</h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  Take our skin concern quiz or contact our skincare experts for personalized recommendations.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">Are your products cruelty-free?</h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  Yes, all our products are cruelty-free and made with ethically sourced ingredients.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">Can I use multiple products together?</h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  Absolutely! Our products are formulated to work together seamlessly. Check product descriptions for recommendations.
                </p>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">How long does delivery take?</h3>
                <p className="text-[13px] text-muted leading-relaxed">
                  Standard delivery within India takes 3-5 business days. International shipping varies by location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
