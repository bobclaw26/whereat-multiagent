
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

const mockChats = [
  { id: '1', name: 'Alex', lastMessage: 'See you there!' },
  { id: '2', name: 'Groove Central Group', lastMessage: 'Anyone heading over soon?' },
];

const ChatListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <FlatList
        data={mockChats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
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
  chatItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatName: { fontSize: 18, fontWeight: 'bold' },
  lastMessage: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default ChatListScreen;
