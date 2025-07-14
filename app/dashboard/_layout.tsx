import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Color';

const TAB_LABELS = {
  home: 'Home',
  mybooks: 'My Books',
  sellnow: 'Sell Now',
  category: 'Categories',
  account: 'Account',
} as const;

const TAB_ORDER = ['home', 'mybooks', 'sellnow', 'category', 'account'] as const;

export default function LuxuryTabBar(props: BottomTabBarProps) {

    if (!props || !props.state || !props.state.routes) {
    return null; // or a fallback UI
  }

  
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = Dimensions.get('window');
  const barWidth = Math.min(windowWidth - 32, 520);
  const orderedRoutes = TAB_ORDER
    .map((name) => props.state.routes.find((r) => r.name === name))
    .filter(Boolean) as typeof props.state.routes;

  /** animated “gold underline” */
  const underlineX = useRef(new Animated.Value(0)).current;
  const tabWidth = barWidth / orderedRoutes.length;

  useEffect(() => {
    Animated.spring(underlineX, {
      toValue: props.state.index * tabWidth,
      useNativeDriver: true,
      bounciness: 8,
    }).start();
  }, [props.state.index, underlineX, tabWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          width: barWidth,
          paddingBottom: Math.max(insets.bottom, 14),
          left: (windowWidth - barWidth) / 2,
        },
      ]}
    >
      {/* underline */}
      <Animated.View
        style={[
          styles.underline,
          {
            width: tabWidth - 32,
            transform: [{ translateX: underlineX }],
          },
        ]}
      />

      {orderedRoutes.map((route, idx) => {
        const isFocused = props.state.index === idx;
        const onPress = () => {
          if (!isFocused) props.navigation.navigate(route.name);
        };
        const color = isFocused ? Colors.accent : Colors.textSecondary;

        const icon = (() => {
          switch (route.name) {
            case 'home':
              return <Ionicons name="home" size={26} color={color} />;
            case 'mybooks':
              return (
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  size={26}
                  color={color}
                />
              );
            case 'sellnow':
              return <Feather name="plus-circle" size={28} color={color} />;
            case 'category':
              return <Ionicons name="grid" size={26} color={color} />;
            case 'account':
              return <Ionicons name="person" size={26} color={color} />;
            default:
              return null;
          }
        })();

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
            ]}
          >
            {icon}
            <Text
              style={[
                styles.label,
                { color, fontWeight: isFocused ? '700' : '500' },
              ]}
            >
              {TAB_LABELS[route.name as keyof typeof TAB_LABELS]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.select({ ios: 20, android: 12 }),
    alignSelf: 'center',
    borderRadius: 28,
    backgroundColor: Colors.overlayLight, // glass‑like base
    overflow: 'hidden',
    shadowColor: Colors.accent,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 15,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 6,
    minWidth: 60,
  },
  tabPressed: {
    opacity: 0.65,
  },
  label: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 13,
    letterSpacing: 0.25,
  },
  underline: {
    position: 'absolute',
    bottom: 6,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.accent,
    marginHorizontal: 16,
  },
});
