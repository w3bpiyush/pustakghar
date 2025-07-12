import { useCallback, useState } from 'react';
import { clearAuthError } from '../state/authSlice';
import type { AppDispatch } from '../state/store';

export function useRegisterForm(dispatch: AppDispatch, error: string | null, message: string | null) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFullNameChange = useCallback((text: string) => {
    setFullName(text);
    if (error || message) dispatch(clearAuthError());
  }, [dispatch, error, message]);

  const onPhoneChange = useCallback((text: string) => {
    setPhoneNumber(text);
    if (error || message) dispatch(clearAuthError());
  }, [dispatch, error, message]);

  const onPasswordChange = useCallback((text: string) => {
    setPassword(text);
    if (error || message) dispatch(clearAuthError());
  }, [dispatch, error, message]);

  const onConfirmPasswordChange = useCallback((text: string) => {
    setConfirmPassword(text);
    if (error || message) dispatch(clearAuthError());
  }, [dispatch, error, message]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const clearFields = useCallback(() => {
    setFullName('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  return {
    fullName,
    phoneNumber,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    setFullName: onFullNameChange,
    setPhoneNumber: onPhoneChange,
    setPassword: onPasswordChange,
    setConfirmPassword: onConfirmPasswordChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    clearFields,
  };
} 