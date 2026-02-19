
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

const mockEvents = [
  { id: '1', title: 'DJ Night', venue: 'The Night Owl' },
  { id: '2', title: 'Live Band Karaoke', venue: 'Electric Avenue' },
];

const EventsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events & Tickets</Text>
      </View>
      <FlatList
        data={mockEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventVenue}>{item.venue}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  eventItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventTitle: { fontSize: 18, fontWeight: 'bold' },
  eventVenue: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default EventsScreen;
