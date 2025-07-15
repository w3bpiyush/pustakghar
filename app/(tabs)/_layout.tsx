import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import CustomTabBar from '../../components/CustomTabBar';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { store } from '../../state/store';

const _layout = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Tabs tabBar={props => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }} />
      </ErrorBoundary>
    </Provider>
  );
};

export default _layout;