// Component/TrendingDeals.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TrendingDeals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trendy Deals of the Day</Text>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/Images/deal1.png')}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>OVERSIZED T-SHIRTS</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/Images/deal2.png')}
          style={styles.image}
        />
         <View style={styles.overlay}>
          <Text style={styles.overlayText}>OVERSIZED T-SHIRTS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TrendingDeals;
