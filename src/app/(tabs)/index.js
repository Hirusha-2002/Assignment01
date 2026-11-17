import { Link } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOVIES } from '../../data/movies';

export default function HomeScreen() {
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredMovies = filter === 'All' ? MOVIES : MOVIES.filter(m => m.genre === filter);

  return (
    <View style={styles.container}>
      {/* Filter Button */}
      <Button title={`Filter: ${filter}`} onPress={() => setModalVisible(true)} color="#e50914" />

      {/* Movie List (FlatList) */}
      <FlatList
        data={filteredMovies}
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

      {/* Modal for Filtering */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Genre</Text>
            {['All', 'Sci-Fi', 'Action', 'Crime'].map((genre) => (
              <Pressable key={genre} style={styles.modalButton} onPress={() => { setFilter(genre); setModalVisible(false); }}>
                <Text style={styles.modalButtonText}>{genre}</Text>
              </Pressable>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: { flexDirection: 'row', backgroundColor: 'white', marginBottom: 12, borderRadius: 8, overflow: 'hidden', elevation: 3 },
  image: { width: 80, height: 120 },
  textContainer: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalButton: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalButtonText: { fontSize: 16 }
});