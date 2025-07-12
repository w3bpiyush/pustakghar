import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import NepalFlag from '@/components/NepalFlag';
import Colors from '@/constants/Color';
import Metrics from '@/constants/Metrics';
import { scale, verticalScale } from '@/utils/styling';
import { useDispatch, useSelector } from 'react-redux';
import type { AuthState } from '../../state/authSlice';
import { clearAuthError, loadUserFromStorage, loginUser } from '../../state/authSlice';
import type { AppDispatch, RootState } from '../../state/store';
import { useLoginForm } from '../../hooks/useLoginForm';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message, user } = useSelector((state: RootState) => state.auth as AuthState);
  const {
    phoneNumber,
    password,
    showPassword,
    setPhoneNumber,
    setPassword,
    toggleShowPassword,
    clearFields,
  } = useLoginForm(dispatch, error, message);

  // Auto-redirect on successful login
  useEffect(() => {
    if (user && user.token) {
      // Replace with your dashboard or home route
      router.replace('/');
    }
  }, [user, router]);

  // Clear errors/messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  // Optionally, auto-login from SecureStore on mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogin = useCallback(() => {
    if (!phoneNumber || !password) {
      Alert.alert('Missing Fields', 'Please enter both phone number and password.');
      clearFields();
      dispatch(clearAuthError());
      return;
    }
    dispatch(loginUser({ phone: phoneNumber, password }));
    clearFields();
  }, [dispatch, phoneNumber, password, clearFields]);

  const handleRegister = useCallback(() => {
    dispatch(clearAuthError());
    router.push('/(auth)/Register');
  }, [dispatch, router]);

  const openPrivacyPolicy = useCallback(() => {
    Linking.openURL('https://pustakghar.app/privacy-policy');
  }, []);

  const openTermsOfService = useCallback(() => {
    Linking.openURL('https://pustakghar.app/terms-of-service');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          </Animated.View>

          {/* Error/Message */}
          {(error || message) && (
            <View style={styles.statusBox}>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <Text style={styles.successText}>{message}</Text>
              )}
            </View>
          )}

          {/* Form */}
          <Animated.View entering={FadeInUp.duration(800).delay(200).springify()} style={styles.form}>
            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeContainer}>
                  <NepalFlag width={scale(20)} height={scale(14)} />
                  <Text style={styles.countryCode}>+977</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter your phone number"
                  placeholderTextColor={Colors.textSecondary}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoComplete="tel"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <Ionicons name="lock-closed" size={scale(20)} color={Colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={toggleShowPassword}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={scale(20)}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <Animated.View style={styles.loadingContainer}>
                  <Ionicons name="refresh" size={scale(20)} color={Colors.background} />
                </Animated.View>
              ) : (
                <>
                  <Ionicons name="log-in" size={scale(20)} color={Colors.background} />
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Ionicons name="person-add" size={scale(20)} color={Colors.primary} />
              <Text style={styles.registerButtonText}>Create New Account</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <Animated.View entering={FadeInUp.duration(800).delay(400).springify()} style={styles.footer}>
            <Text style={styles.footerText}>
              By signing in, you agree to our{' '}
              <Text style={styles.linkText} onPress={openTermsOfService}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={styles.linkText} onPress={openPrivacyPolicy}>
                Privacy Policy
              </Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Metrics.Spacing.l,
    paddingTop: verticalScale(40),
    paddingBottom: Metrics.Spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  title: {
    fontSize: Metrics.FontSizes.h1,
    fontFamily: 'Urbanist-Bold',
    color: Colors.textPrimary,
    marginBottom: Metrics.Spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: Metrics.Spacing.l,
  },
  inputLabel: {
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-Medium',
    color: Colors.textPrimary,
    marginBottom: Metrics.Spacing.s,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Metrics.Radii.l,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Metrics.Spacing.m,
    paddingVertical: Metrics.Spacing.s,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Metrics.Spacing.s,
    paddingRight: Metrics.Spacing.s,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  countryCode: {
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-Medium',
    color: Colors.textPrimary,
    marginLeft: Metrics.Spacing.xs,
  },
  phoneInput: {
    flex: 1,
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-Regular',
    color: Colors.textPrimary,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Metrics.Radii.l,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Metrics.Spacing.m,
    paddingVertical: Metrics.Spacing.s,
  },
  inputIcon: {
    marginRight: Metrics.Spacing.s,
  },
  passwordInput: {
    flex: 1,
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-Regular',
    color: Colors.textPrimary,
  },
  eyeButton: {
    padding: Metrics.Spacing.xs,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Metrics.Radii.l,
    paddingVertical: Metrics.Spacing.m,
    marginBottom: Metrics.Spacing.l,
    shadowColor: Colors.primary,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.background,
    marginLeft: Metrics.Spacing.s,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.Spacing.l,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: Metrics.FontSizes.small,
    fontFamily: 'Urbanist-Regular',
    color: Colors.textSecondary,
    marginHorizontal: Metrics.Spacing.m,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: Metrics.Radii.l,
    paddingVertical: Metrics.Spacing.m,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  registerButtonText: {
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.primary,
    marginLeft: Metrics.Spacing.s,
  },
  footer: {
    marginTop: verticalScale(40),
    paddingHorizontal: Metrics.Spacing.m,
  },
  footerText: {
    fontSize: Metrics.FontSizes.small,
    fontFamily: 'Urbanist-Regular',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: scale(18),
  },
  linkText: {
    color: Colors.primary,
    fontFamily: 'Urbanist-Medium',
  },
  statusBox: {
    marginBottom: Metrics.Spacing.l,
    padding: Metrics.Spacing.m,
    borderRadius: Metrics.Radii.l,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  errorText: {
    color: Colors.error,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
  successText: {
    color: Colors.success,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
});

export default Login;