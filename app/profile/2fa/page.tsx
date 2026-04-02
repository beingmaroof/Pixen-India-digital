"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { DarkPageWrapper } from '@/components/DarkUI';
import PremiumNavbar from '@/components/PremiumNavbar';

export default function TwoFactorAuthSetup() {
  const router = useRouter();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login');
    });
  }, [router]);

  const initiateEnrollment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });
      if (error) throw error;

      if (data.totp.qr_code) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
        setFactorId(data.id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initialize MFA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verifyCode || !factorId) return;
    setLoading(true);
    setError('');
    
    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;
      
      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verifyCode
      });
      
      if (verify.error) throw verify.error;
      
      setSuccess(true);
      setTimeout(() => router.push('/profile'), 2000);
      
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DarkPageWrapper>
      <PremiumNavbar />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h1>
          <p className="text-white/40 text-sm mb-6">Enhance your account security using an authenticator app (like Google Authenticator or Authy).</p>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                ✓
              </div>
              <h2 className="text-xl font-bold text-white mb-2">2FA Enabled!</h2>
              <p className="text-white/50 text-sm">Redirecting you back to profile...</p>
            </div>
          ) : qrCode ? (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl max-w-xs mx-auto text-center overflow-hidden">
                <img src={qrCode} alt="QR Code" className="w-full h-auto mix-blend-multiply" />
                <p className="mt-4 text-xs font-mono text-gray-500 break-all">{secret}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Verification Code</label>
                <input 
                  type="text" 
                  maxLength={6} 
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-[#02030A] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                />
              </div>

              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}

              <button 
                onClick={handleVerify}
                disabled={loading || verifyCode.length !== 6}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? 'Verifying...' : 'Verify & Enable 2FA'}
              </button>
            </div>
          ) : (
            <button 
              onClick={initiateEnrollment}
              disabled={loading}
              className="w-full py-3.5 bg-purple-600 rounded-xl font-bold text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Setup Authenticator App'}
            </button>
          )}
        </div>
      </div>
    </DarkPageWrapper>
  );
}
