import Colors from '@/constants/Color';
import Metrics from '@/constants/Metrics';
import { scale, verticalScale } from '@/utils/styling';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import type { AuthState } from '../../state/authSlice';
import { clearAuthError, verifyOtp } from '../../state/authSlice';
import type { AppDispatch, RootState } from '../../state/store';
import { useVerifyOtpForm } from '../../hooks/useVerifyOtpForm';

const VerifyOtp = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const { otp, setOtp, clearOtp } = useVerifyOtpForm();
  const { otpLoading, otpError, otpMessage, otpVerified } = useSelector((state: RootState) => state.auth as AuthState);

  React.useEffect(() => {
    if (otpVerified) {
      router.replace('/');
    }
  }, [otpVerified, router]);

  const handleVerify = useCallback(() => {
    if (!otp) {
      Alert.alert('Missing OTP', 'Please enter the OTP sent to your phone.');
      return;
    }
    if (!phone) {
      Alert.alert('Missing Phone', 'Phone number is required.');
      return;
    }
    dispatch(verifyOtp({ phone: String(phone), otp }));
    clearOtp();
  }, [dispatch, phone, otp, clearOtp]);

  React.useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the OTP sent to <Text style={styles.phoneText}>+977 {phone}</Text>
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(800).delay(200).springify()} style={styles.form}>
          {(otpError || otpMessage) && (
            <View style={styles.statusBox}>
              {otpError ? (
                <Text style={styles.errorText}>{otpError}</Text>
              ) : (
                <Text style={styles.successText}>{otpMessage}</Text>
              )}
            </View>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>OTP</Text>
            <View style={styles.otpInputWrapper}>
              <Ionicons name="key" size={scale(20)} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor={Colors.textSecondary}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.verifyButton, otpLoading && styles.verifyButtonDisabled]}
            onPress={handleVerify}
            disabled={otpLoading}
          >
            {otpLoading ? (
              <Ionicons name="refresh" size={scale(20)} color={Colors.background} />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={scale(20)} color={Colors.background} />
                <Text style={styles.verifyButtonText}>Verify</Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
  phoneText: {
    color: Colors.primary,
    fontFamily: 'Urbanist-Medium',
  },
  form: {
    width: '100%',
    paddingHorizontal: Metrics.Spacing.l,
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
  otpInputWrapper: {
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
  input: {
    flex: 1,
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-Regular',
    color: Colors.textPrimary,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Metrics.Radii.l,
    paddingVertical: Metrics.Spacing.m,
    marginTop: Metrics.Spacing.l,
    shadowColor: Colors.primary,
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    fontSize: Metrics.FontSizes.body,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.background,
    marginLeft: Metrics.Spacing.s,
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

export default VerifyOtp; 