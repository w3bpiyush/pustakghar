import Colors from '@/constants/Color';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="grid" size={40} color={Colors.accent} style={styles.headerIcon} />
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Browse by category</Text>
      </View>
      {/* Placeholder for categories */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>Categories coming soon!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.accent,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: 'Urbanist-Medium',
    marginBottom: 16,
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: 'Urbanist-Regular',
  },
}); 