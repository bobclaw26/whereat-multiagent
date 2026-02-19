import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';

const mockWorldwideVenues = [
  { id: '1', name: 'Ibiza Nightclub', location: 'Ibiza, Spain', type: 'Club' },
  { id: '2', name: 'Ministry of Sound', location: 'London, UK', type: 'Club' },
  { id: '3', name: 'Tresor', location: 'Berlin, Germany', type: 'Underground Club' },
];

const WorldwideSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(mockWorldwideVenues);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = mockWorldwideVenues.filter(venue => 
      venue.name.toLowerCase().includes(query.toLowerCase()) ||
      venue.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  const renderVenueItem = ({ item }) => (
    <TouchableOpacity style={styles.venueItem}>
      <Text style={styles.venueName}>{item.name}</Text>
      <Text style={styles.venueDetails}>
        {item.location} • {item.type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Worldwide Nightlife</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search venues, cities, or countries"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredVenues}
        renderItem={renderVenueItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text>No venues found. Try a different search.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  venueItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
});

export default WorldwideSearchScreen;