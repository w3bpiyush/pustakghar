import { useCallback, useMemo, useState } from 'react';
import { clearAuthError } from '../state/authSlice';
import type { AppDispatch } from '../state/store';

interface UseLoginFormProps {
  dispatch: AppDispatch;
  error: string | null;
  message: string | null;
}

export function useLoginForm({ dispatch, error, message }: UseLoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const hasFeedback = !!error || !!message;

  const handlePhoneChange = useCallback((text: string) => {
    setPhoneNumber(text);
    if (hasFeedback) dispatch(clearAuthError());
  }, [dispatch, hasFeedback]);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    if (hasFeedback) dispatch(clearAuthError());
  }, [dispatch, hasFeedback]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const clearFields = useCallback(() => {
    setPhoneNumber('');
    setPassword('');
  }, []);

  return useMemo(() => ({
    phoneNumber,
    password,
    showPassword,
    setPhoneNumber: handlePhoneChange,
    setPassword: handlePasswordChange,
    toggleShowPassword,
    clearFields,
  }), [phoneNumber, password, showPassword, handlePhoneChange, handlePasswordChange, toggleShowPassword, clearFields]);
}
