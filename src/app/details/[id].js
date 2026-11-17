import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { MOVIES } from '../../data/movies';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { favorites, toggleFavorite } = useContext(AppContext);
  
  const movie = MOVIES.find(m => m.id === id);
  const isFavorite = movie ? favorites.includes(movie.id) : false;

  if (!movie) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.notFoundText}>Movie not found</Text>
      </View>
    );
  }

  const handleFavoritePress = () => {
    toggleFavorite(movie.id);
    Alert.alert(
      isFavorite ? 'Removed' : 'Added',
      isFavorite ? 'Removed from favorites' : 'Added to favorites!'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <Image source={{ uri: movie.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.info}>{movie.year} • {movie.genre} • ⭐ {movie.rating}</Text>
      <Text style={styles.description}>{movie.description}</Text>

      <Pressable 
        style={[styles.button, { backgroundColor: isFavorite ? '#ff4d4d' : '#e50914' }]} 
        onPress={handleFavoritePress}
      >
        <Text style={styles.buttonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  notFoundText: { fontSize: 18, color: '#666' },
  image: { width: '100%', height: 320, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8, color: '#111' },
  info: { fontSize: 16, color: '#666', marginBottom: 16 },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 30, color: '#333' },
  button: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
