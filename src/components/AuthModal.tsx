'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'phone' | 'otp' | 'address';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePhoneSubmit = async () => {
    if (!phone.match(/^\+?[0-9]{10}$/)) {
      alert('Please enter a valid phone number');
      return;
    }
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 1500);
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      alert('OTP must be 6 digits');
      return;
    }
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setStep('address');
      setLoading(false);
    }, 1500);
  };

  const handleAddressSubmit = async () => {
    if (!address.trim()) {
      alert('Please enter your address');
      return;
    }
    setLoading(true);
    // Simulate address saving
    setTimeout(() => {
      alert('Login successful! Address saved.');
      onClose();
      setStep('phone');
      setPhone('');
      setOtp('');
      setAddress('');
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[80]" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-brand-accent text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-[16px] font-bold">
              {step === 'phone' && 'Enter Phone Number'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'address' && 'Save Your Address'}
            </h2>
            <button onClick={onClose} className="p-1 hover:opacity-80 transition-opacity">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {step === 'phone' && (
              <>
                <p className="text-[13px] text-muted">We&apos;ll send you an OTP to verify your number</p>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[14px] placeholder-slate-400 focus:outline-none focus:border-brand-accent"
                  disabled={loading}
                />
                <button
                  onClick={handlePhoneSubmit}
                  disabled={loading || phone.length < 10}
                  className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold text-[13px] hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </>
            )}

            {step === 'otp' && (
              <>
                <p className="text-[13px] text-muted">Enter the 6-digit OTP sent to {phone}</p>
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[14px] text-center tracking-[0.2em] font-mono focus:outline-none focus:border-brand-accent"
                  disabled={loading}
                />
                <button
                  onClick={handleOtpSubmit}
                  disabled={loading || otp.length < 6}
                  className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold text-[13px] hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  onClick={() => setStep('phone')}
                  className="w-full text-brand-accent text-[12px] font-semibold py-2 hover:opacity-70 transition-opacity"
                >
                  Change Phone Number
                </button>
              </>
            )}

            {step === 'address' && (
              <>
                <p className="text-[13px] text-muted">Please provide your delivery address</p>
                <textarea
                  placeholder="Enter your full address (Street, City, State, Pincode)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-[13px] placeholder-slate-400 focus:outline-none focus:border-brand-accent resize-none"
                  disabled={loading}
                />
                <button
                  onClick={handleAddressSubmit}
                  disabled={loading || !address.trim()}
                  className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold text-[13px] hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? 'Saving...' : 'Complete Login'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
