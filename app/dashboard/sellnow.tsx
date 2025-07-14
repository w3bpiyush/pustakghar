import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Color';
import { Feather } from '@expo/vector-icons';

export default function SellNowScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="plus-circle" size={40} color={Colors.accent} style={styles.headerIcon} />
        <Text style={styles.title}>Sell Now</Text>
        <Text style={styles.subtitle}>List your book for sale</Text>
      </View>
      {/* Placeholder for sell form */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>Feature coming soon!</Text>
        <TouchableOpacity style={styles.sellButton}>
          <Text style={styles.sellButtonText}>Start Selling</Text>
        </TouchableOpacity>
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
    marginBottom: 18,
  },
  sellButton: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    shadowColor: Colors.accent,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  sellButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
  },
}); 