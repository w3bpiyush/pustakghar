import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Color';
import Metrics from '../constants/Metrics';

const TAB_ICONS = [
  { name: 'home-outline', lib: Ionicons, label: 'Home', route: 'home' },
  { name: 'book-outline', lib: Ionicons, label: 'My Books', route: 'mybooks' },
  { name: 'plus', lib: MaterialCommunityIcons, label: '', isCenter: true, route: 'account' }, // Center tab navigates to Account
  { name: 'apps', lib: MaterialCommunityIcons, label: 'Category', route: 'category' },
  { name: 'user', lib: Feather, label: 'Account', route: 'sellnow' }, // Rightmost tab navigates to Sell Now
];

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const height = 64 + insets.bottom;
  const tabWidth = 100 / TAB_ICONS.length;

  const activeIndex = typeof state.index === 'number' && state.index >= 0 && state.index < TAB_ICONS.length ? state.index : 0;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, height }]}>  
      <View style={styles.row}>
        {TAB_ICONS.map((tab, idx) => {
          const isFocused = activeIndex === idx;
          const onPress = () => {
            if (isFocused) return;
            navigation.navigate(tab.route);
          };
          const Icon = tab.lib;
          if (tab.isCenter) {
            return (
              <View key={tab.label} style={styles.centerTabWrap} pointerEvents="box-none">
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  onPress={onPress}
                  style={styles.centerButton}
                  activeOpacity={0.85}
                >
                  <Icon name={tab.name as any} size={32} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.centerLabel}>{tab.label}</Text>
              </View>
            );
          }
          return (
            <TouchableOpacity
              key={tab.label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[styles.tab, { width: `${tabWidth}%` }]}
              activeOpacity={0.7}
            >
              <Icon
                name={tab.name as any}
                size={24}
                color={isFocused ? Colors.accent : Colors.textSecondary}
              />
              <Text style={[styles.label, isFocused && { color: Colors.accent, fontWeight: '700' }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: Metrics.FontSizes.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  centerTabWrap: {
    width: 72,
    alignItems: 'center',
    marginTop: -32,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primaryDark,
    elevation: 8,
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  centerLabel: {
    fontSize: Metrics.FontSizes.body,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
}); 