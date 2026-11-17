import { Link } from 'expo-router';
import { useContext } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { MOVIES } from '../../data/movies';

export default function FavoritesScreen() {
  const { favorites } = useContext(AppContext);
  
  // Get the full movie objects that are in the favorites array
  const favoriteMovies = MOVIES.filter(movie => favorites.includes(movie.id));

  return (
    <View style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet!</Text>
          <Text style={styles.emptySubtext}>Add movies to your favorites from the Movies tab.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Link href={`/details/${item.id}`} asChild>
              <Pressable style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.genre} • {item.year}</Text>
                </View>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#555', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#888', textAlign: 'center' },
  card: { flexDirection: 'row', backgroundColor: 'white', marginBottom: 12, borderRadius: 8, overflow: 'hidden', elevation: 3 },
  image: { width: 80, height: 120 },
  textContainer: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
});
