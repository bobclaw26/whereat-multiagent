import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  fetchFriends, 
  sendFriendRequest, 
  acceptFriendRequest 
} from '../store/slices/friendsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FriendsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends, friendRequests } = useSelector((state: RootState) => state.friends);
  const [isAddFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleSendFriendRequest = () => {
    if (!friendEmail) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    dispatch(sendFriendRequest(friendEmail))
      .then(() => {
        setFriendEmail('');
        setAddFriendModalVisible(false);
        Alert.alert('Success', 'Friend request sent!');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    dispatch(acceptFriendRequest(requestId));
  };

  const renderFriendItem = ({ item }: { item: any }) => (
    <View style={styles.friendItemContainer}>
      <Image 
        source={{ 
          uri: item.profilePicture || 'https://via.placeholder.com/50' 
        }} 
        style={styles.profileImage} 
      />
      <View style={styles.friendDetails}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      {item.lastLocation && (
        <View style={styles.locationBadge}>
          <Ionicons name="location" size={16} color="white" />
          <Text style={styles.locationText}>
            {item.lastLocation.venueName}
          </Text>
        </View>
      )}
    </View>
  );

  const renderFriendRequestItem = ({ item }: { item: any }) => (
    <View style={styles.friendRequestContainer}>
      <Image 
        source={{ 
          uri: item.profilePicture || 'https://via.placeholder.com/50' 
        }} 
        style={styles.profileImage} 
      />
      <View style={styles.friendRequestDetails}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity 
        style={styles.acceptButton}
        onPress={() => handleAcceptFriendRequest(item.id)}
      >
        <Text style={styles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addFriendButton}
        onPress={() => setAddFriendModalVisible(true)}
      >
        <Ionicons name="person-add" size={24} color="white" />
        <Text style={styles.addFriendButtonText}>Add Friend</Text>
      </TouchableOpacity>

      {friendRequests.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Friend Requests</Text>
          <FlatList
            data={friendRequests}
            renderItem={renderFriendRequestItem}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>My Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No friends yet. Start adding some!
            </Text>
          </View>
        }
        refreshing={false}
        onRefresh={() => dispatch(fetchFriends())}
      />

      <Modal
        visible={isAddFriendModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Friend</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter friend's email"
              value={friendEmail}
              onChangeText={setFriendEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setAddFriendModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalSendButton}
                onPress={handleSendFriendRequest}
              >
                <Text style={styles.modalSendButtonText}>Send Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: 'white',
  },
  addFriendButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFriendButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  friendItemContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 5,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendDetails: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#666',
  },
  locationBadge: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  friendRequestContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  friendRequestDetails: {
    flex: 1,
    marginLeft: 10,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#6c757d',
    borderRadius: 5,
  },
  modalCancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalSendButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  modalSendButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FriendsScreen;