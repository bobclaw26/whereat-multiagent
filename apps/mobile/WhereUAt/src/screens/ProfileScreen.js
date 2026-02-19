
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

// Mock data for the user
const mockUser = {
  display_name: 'Tyler',
  email: 'tyler@whereuat.com',
  going_out_status: 'Planning to go to The Night Owl tonight!',
};

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.displayName}>{mockUser.display_name}</Text>
        <Text style={styles.email}>{mockUser.email}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>My Status:</Text>
        <Text style={styles.statusText}>{mockUser.going_out_status}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => { /* Navigate to edit profile */ }}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { /* Handle Logout */ }}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  profileInfo: {
    alignItems: 'center',
    padding: 30,
  },
  displayName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
