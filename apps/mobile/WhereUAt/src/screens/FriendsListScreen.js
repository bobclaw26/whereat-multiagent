
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

// Mock data for friends
const mockFriends = [
  { id: '1', display_name: 'Alex', status: 'At Electric Avenue' },
  { id: '2', display_name: 'Kyle', status: 'Going to Groove Central' },
  { id: '3', display_name: 'Samantha', status: 'Online' },
];

const FriendItem = ({ friend }) => (
  <View style={styles.friendItem}>
    <View>
      <Text style={styles.friendName}>{friend.display_name}</Text>
      <Text style={styles.friendStatus}>{friend.status}</Text>
    </View>
    <TouchableOpacity style={styles.chatButton} onPress={() => { /* Navigate to chat */ }}>
      <Text style={styles.chatButtonText}>Chat</Text>
    </TouchableOpacity>
  </View>
);

const FriendsListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
      </View>
      <FlatList
        data={mockFriends}
        renderItem={({ item }) => <FriendItem friend={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chatButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FriendsListScreen;
