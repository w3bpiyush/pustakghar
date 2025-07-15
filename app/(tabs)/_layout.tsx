import { Text } from 'react-native'
import { Provider } from 'react-redux';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { store } from '../../state/store';
import { Slot, Stack,  } from 'expo-router';

const _layout = () => {
  return (
    <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <ErrorBoundary>
          <Slot />
        </ErrorBoundary>
        </Stack>
    </Provider>
  )
}

export default _layout