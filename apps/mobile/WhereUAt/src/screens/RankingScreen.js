
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';

// Mock data for ranked venues
const mockRankedVenues = [
  { id: '1', name: 'The Night Owl', rank: 1, reason: 'Popular with your friends this week.' },
  { id: '2', name: 'Electric Avenue', rank: 2, reason: 'Trending spot in your area.' },
  { id: '3', name: 'Groove Central', rank: 3, reason: 'Great deals on event tickets.' },
];

const RankingScreen = () => {
  const renderRankedItem = ({ item }) => (
    <View style={styles.venueItem}>
      <Text style={styles.rank}>#{item.rank}</Text>
      <View style={styles.venueDetails}>
        <Text style={styles.venueName}>{item.name}</Text>
        <Text style={styles.venueReason}>{item.reason}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Spots For You</Text>
      </View>
      <FlatList
        data={mockRankedVenues}
        renderItem={renderRankedItem}
        keyExtractor={item => item.id}
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
  venueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 20,
    width: 40,
  },
  venueDetails: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueReason: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default RankingScreen;
