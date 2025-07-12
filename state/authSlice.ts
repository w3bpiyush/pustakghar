/**
 * Auth slice for handling authentication state and async actions.
 * Includes login, register, logout, and auto-login from SecureStore.
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './config';

export interface UserData {
  user_name: string;
  user_number: string;
  token: string;
}

export interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  otpVerified?: boolean;
  otpLoading?: boolean;
  otpError?: string | null;
  otpMessage?: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  otpVerified: false,
  otpLoading: false,
  otpError: null,
  otpMessage: null,
};

/**
 * Thunk to login a user.
 */
export const loginUser = createAsyncThunk<
  UserData & { message: string },
  { phone: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      if (!data.status) return rejectWithValue(data.message || 'Login failed');
      await SecureStore.setItemAsync('token', data.data.token);
      return { ...data.data, message: data.message };
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Server Down');
    }
  }
);

/**
 * Thunk to register a user.
 */
export const registerUser = createAsyncThunk<
  UserData & { message: string },
  { phone: string; password: string; user_name: string },
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ phone, password, user_name }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password, user_name }),
      });
      const data = await response.json();
      if (!data.status) return rejectWithValue(data.message || 'Registration failed');
      await SecureStore.setItemAsync('token', data.data.token);
      return { ...data.data, message: data.message };
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Server Down');
    }
  }
);

/**
 * Thunk to logout a user and clear SecureStore.
 */
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await SecureStore.deleteItemAsync('token');
  return null;
});

/**
 * Thunk to load user from SecureStore (auto-login).
 */
export const loadUserFromStorage = createAsyncThunk<
  UserData | null,
  void,
  { rejectValue: string }
>('auth/loadUserFromStorage', async (_, { rejectWithValue }) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) return null;
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data.status) return rejectWithValue(data.message || 'Failed to fetch user');
    return { ...data.data, token };
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Failed to load user');
  }
});

/**
 * Thunk to verify OTP.
 */
export const verifyOtp = createAsyncThunk<
  { message: string },
  { phone: string; otp: string },
  { rejectValue: string }
>(
  'auth/verifyOtp',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await response.json();
      if (!data.status) return rejectWithValue(data.message || 'OTP verification failed');
      return { message: data.message };
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Server Down');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
      state.message = null;
      state.otpError = null;
      state.otpMessage = null;
    },
    setUserFromStorage(state, action: PayloadAction<UserData | null>) {
      state.user = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
        state.otpMessage = null;
        state.otpVerified = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpVerified = true;
        state.otpMessage = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpVerified = false;
        state.otpError = action.payload as string;
      });
  },
});

export const { clearAuthError, setUserFromStorage, resetAuth } = authSlice.actions;
export default authSlice.reducer;
