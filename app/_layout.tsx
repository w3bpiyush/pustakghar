import { Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold, useFonts } from '@expo-google-fonts/urbanist';
import { Slot, Stack,  } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { store } from '../state/store';

SplashScreen.preventAutoHideAsync();

function useUrbanistFonts() {
  const [fontsLoaded] = useFonts({
    'Urbanist-Regular': Urbanist_400Regular,
    'Urbanist-Medium': Urbanist_500Medium,
    'Urbanist-SemiBold': Urbanist_600SemiBold,
    'Urbanist-Bold': Urbanist_700Bold,
  });
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  return fontsLoaded;
}

export default function RootLayout() {
  const fontsLoaded = useUrbanistFonts();
  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <ErrorBoundary>
          <Slot />
        </ErrorBoundary>
        </Stack>
    </Provider>
  );
}
