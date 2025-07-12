import { useCallback, useState } from 'react';
import { clearAuthError } from '../state/authSlice';
import type { AppDispatch } from '../state/store';

export function useLoginForm(dispatch: AppDispatch, error: string | null, message: string | null) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onPhoneChange = useCallback((text: string) => {
    setPhoneNumber(text);
    if (error || message) dispatch(clearAuthError());
  }, [dispatch, error, message]);

  const onPasswordChange = useCallback((text: string) => {
    setPassword(text);
    if (error || message) dispatch(clearAuthError());
  }, [dispatch, error, message]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const clearFields = useCallback(() => {
    setPhoneNumber('');
    setPassword('');
  }, []);

  return {
    phoneNumber,
    password,
    showPassword,
    setPhoneNumber: onPhoneChange,
    setPassword: onPasswordChange,
    toggleShowPassword,
    clearFields,
  };
} 