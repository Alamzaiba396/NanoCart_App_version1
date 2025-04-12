import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Get screen width for responsive design
const { width } = Dimensions.get('window');

const ProductDetailPhotoScreen = () => {
  // State to manage the main image
  const [mainImage, setMainImage] = useState(require('../assets/Images/Carosuel1.png'));
  // State to track the active thumbnail
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // Array of thumbnail images
  const thumbnails = [
    require('../assets/Images/Carosuel2.png'),
    require('../assets/Images/Carosuel3.png'),
    require('../assets/Images/Carosuel4.png'),
  ];

  // Function to handle thumbnail press
  const handleThumbnailPress = (image, index) => {
    setMainImage(image);
    setActiveThumbnail(index);
  };

  return (
    <View style={styles.container}>
      {/* Main Image */}
      <View style={styles.mainImageContainer}>
        <Image source={mainImage} style={styles.mainImage} resizeMode="contain" />
      </View>

      {/* Thumbnails */}
      <View style={styles.thumbnailsContainer}>
        {thumbnails.map((thumbnail, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleThumbnailPress(thumbnail, index)}
            style={[
              styles.thumbnailContainer,
              activeThumbnail === index && styles.activeThumbnail,
            ]}
          >
            <Image
              source={thumbnail}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    justifyContent: 'center',
  },
  mainImageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainImage: {
    width: width - 40, // Subtract padding for responsive width
    height: 400, // Adjust height as needed
    borderRadius: 8,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbnailContainer: {
    width: (width - 60) / 4, // Divide by 4 for 4 thumbnails, subtract padding
    height: (width - 60) / 4,
    borderRadius: 5,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  activeThumbnail: {
    borderWidth: 2,
    borderColor: '#ff6200', // Orange border for active thumbnail
  },
});

export default ProductDetailPhotoScreen;