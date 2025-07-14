import Colors from '@/constants/Color';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="home" size={40} color={Colors.accent} style={styles.headerIcon} />
          <Text style={styles.title}>Welcome to PustakGhar</Text>
          <Text style={styles.subtitle}>Your luxury destination for books</Text>
        </View>
        {/* Add more luxury-themed content here */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Discover New Arrivals</Text>
          <Text style={styles.cardText}>Browse the latest books curated just for you.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sell Your Books</Text>
          <Text style={styles.cardText}>Turn your old books into cash with a single tap.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
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
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    width: '100%',
    shadowColor: Colors.accent,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.primary,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontFamily: 'Urbanist-Regular',
  },
}); 