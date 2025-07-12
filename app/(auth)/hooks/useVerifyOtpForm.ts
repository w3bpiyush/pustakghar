import { useCallback, useState } from 'react';

export function useVerifyOtpForm() {
  const [otp, setOtp] = useState('');

  const clearOtp = useCallback(() => {
    setOtp('');
  }, []);

  return {
    otp,
    setOtp,
    clearOtp,
  };
} 