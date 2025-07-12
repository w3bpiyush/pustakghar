import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from '@expo-google-fonts/urbanist';
import {
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

import { store } from '../state/store';
import { ErrorBoundary } from '../components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

function useUrbanistFonts() {
  const [fontsLoaded] = useFonts({
    'Urbanist-Regular': Urbanist_400Regular,
    'Urbanist-Medium': Urbanist_500Medium,
    'Urbanist-SemiBold': Urbanist_600SemiBold,
    'Urbanist-Bold': Urbanist_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded;
}

export default function RootLayout() {
  const fontsLoaded = useUrbanistFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }} />
      </ErrorBoundary>
    </Provider>
  );
}
