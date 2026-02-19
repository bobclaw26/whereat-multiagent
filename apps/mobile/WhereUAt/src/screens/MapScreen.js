
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Mock data for venues - will be replaced with API data
const mockVenues = [
  { id: '1', name: 'The Night Owl', latitude: 34.052235, longitude: -118.243683, attendees: 12 },
  { id: '2', name: 'Electric Avenue', latitude: 34.053235, longitude: -118.244683, attendees: 25 },
  { id: '3', name: 'Groove Central', latitude: 34.051235, longitude: -118.242683, attendees: 8 },
];

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const requestLocationPermission = useCallback(async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      const result = await request(permission);
      
      if (result === RESULTS.GRANTED) {
        // For simplicity, we'll use a hardcoded location for now.
        // In a real app, you'd use a geolocation library to get the user's current position.
        const initialLocation = {
          latitude: 34.052235,
          longitude: -118.243683,
        };
        setLocation(initialLocation);
        setRegion({
          ...initialLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to use the map feature.');
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const handleMarkerPress = (venue) => {
    Alert.alert(
      `You are going to ${venue.name}`,
      `This will be visible to your friends.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          {mockVenues.map(venue => (
            <Marker
              key={venue.id}
              coordinate={{ latitude: venue.latitude, longitude: venue.longitude }}
              title={venue.name}
              description={`Attendees: ${venue.attendees}`}
              onPress={() => handleMarkerPress(venue)}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading Map...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
