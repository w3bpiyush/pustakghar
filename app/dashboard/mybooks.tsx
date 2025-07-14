import Colors from '@/constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyBooksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="book-open-variant" size={40} color={Colors.accent} style={styles.headerIcon} />
        <Text style={styles.title}>My Books</Text>
        <Text style={styles.subtitle}>Your personal collection</Text>
      </View>
      {/* Placeholder for user's books */}
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>No books in your collection yet.</Text>
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