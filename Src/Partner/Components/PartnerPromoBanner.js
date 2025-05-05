// PromoBanner.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PartnerPromoBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deals you don’t want to miss</Text>
      <View style={styles.bannerCard}>
        <Image
          source={require('../../assets/Images/Promo.png')}
          style={styles.bannerImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  bannerCard: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 200, 
    resizeMode: 'cover',
  },
});

export default PartnerPromoBanner;