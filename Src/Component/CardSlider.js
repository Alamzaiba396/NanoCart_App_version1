// CardSlider.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const CardSlider = ({ images }) => {
  console.log('CardSlider rendering with images:', images); // Debug log

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.sliderContainer}
      contentContainerStyle={styles.contentContainer}
    >
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={image}
              style={styles.image}
              onError={(error) => console.log(`Image ${index} load error:`, error.nativeEvent.error)} // Fixed syntax
            />
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.errorText}>No images to display</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexGrow: 0,
    height: 300, // Fixed height to ensure space
  },
  contentContainer: {
    paddingVertical: 10,
  },
  card: {
    width: Dimensions.get('window').width * 0.7, // 80% of screen width per card
    height: 300,
    marginHorizontal: 10,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
  },
  image: {
    width: '90%',
    height: '100%', // Fixed height to match card
    resizeMode: 'cover',
  },
  shopButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#D86427',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    padding: 10,
  },
});

export default CardSlider;