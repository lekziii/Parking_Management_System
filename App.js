import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';

// Import your logo image
import logo from './assets/logo.png';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [bookedSpots, setBookedSpots] = useState([]);
  const parkingSpots = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const bookSpot = (spot) => {
    if (!bookedSpots.includes(spot)) {
      setBookedSpots([...bookedSpots, spot]);
    }
  };

  const renderHome = () => (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>🏠 Parking Management</Text>
      <Button title="Book Parking Spot" onPress={() => setScreen('book')} />
      <Button title="View Booked Spots" onPress={() => setScreen('view')} />
    </View>
  );

  const renderBooking = () => (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>🚗 Book a Parking Spot</Text>
      <FlatList
        data={parkingSpots}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.spotRow}>
            <Text style={styles.spotText}>{item}</Text>
            <Button
              title={bookedSpots.includes(item) ? 'Booked' : 'Book'}
              onPress={() => bookSpot(item)}
              disabled={bookedSpots.includes(item)}
            />
          </View>
        )}
      />
      <Button title="Back to Home" onPress={() => setScreen('home')} />
    </View>
  );

  const renderBookedSpots = () => (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>📋 Booked Spots</Text>
      {bookedSpots.length === 0 ? (
        <Text>No spots booked yet.</Text>
      ) : (
        bookedSpots.map((spot, index) => (
          <Text key={index} style={styles.spotText}>• {spot}</Text>
        ))
      )}
      <Button title="Back to Home" onPress={() => setScreen('home')} />
    </View>
  );

  return (
    <View style={styles.container}>
      {screen === 'home' && renderHome()}
      {screen === 'book' && renderBooking()}
      {screen === 'view' && renderBookedSpots()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  spotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  spotText: {
    fontSize: 18,
  },
});
