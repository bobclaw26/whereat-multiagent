import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchFriends } from '../store/slices/friendsSlice';

interface FeedItem {
  id: string;
  user: {
    id: string;
    username: string;
    profilePicture?: string;
  };
  location: {
    venueName: string;
    timestamp: number;
  };
  type: 'check-in' | 'status';
}

const SocialFeedScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.friends.friends);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  useEffect(() => {
    // Generate mock feed items based on friends
    const mockFeedItems: FeedItem[] = friends.map(friend => ({
      id: `feed_${friend.id}`,
      user: {
        id: friend.id,
        username: friend.username,
        profilePicture: friend.lastLocation ? 'https://example.com/profile.jpg' : undefined
      },
      location: {
        venueName: 'Café Central',
        timestamp: Date.now()
      },
      type: 'check-in'
    }));

    setFeedItems(mockFeedItems);
  }, [friends]);

  const renderFeedItem = ({ item }: { item: FeedItem }) => (
    <View style={styles.feedItemContainer}>
      <Image 
        source={{ 
          uri: item.user.profilePicture || 'https://via.placeholder.com/50' 
        }} 
        style={styles.profileImage} 
      />
      <View style={styles.feedItemContent}>
        <Text style={styles.username}>{item.user.username}</Text>
        {item.type === 'check-in' && (
          <Text style={styles.feedText}>
            Checked in at {item.location.venueName}
          </Text>
        )}
        <Text style={styles.timestamp}>
          {new Date(item.location.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No recent activity from friends
            </Text>
          </View>
        }
        refreshing={false}
        onRefresh={() => dispatch(fetchFriends())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  feedItemContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  feedItemContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedText: {
    color: '#666',
    marginTop: 5,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
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
});

export default SocialFeedScreen;