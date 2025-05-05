import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const PartnerCardSlider = ({ images }) => {
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
          <View key={index} style={[styles.card, { width: screenWidth * 0.6 }]}>
            <Image source={image} style={styles.image} resizeMode="cover" />
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
    height: 280,
  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 5,
    alignItems: 'center',
  },
  card: {
    height: 260,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
    alignItems: 'center', // centers the button horizontally
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shopButton: {
    position: 'absolute',
    bottom: 15,
    backgroundColor: '#D86427',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: 'center', // ensures centering works
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    padding: 10,
  },
});

export default PartnerCardSlider;
