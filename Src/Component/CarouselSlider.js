
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/Images/Image1.png'),
  require('../assets/Images/Image2.png'),
  require('../assets/Images/Image3.png'),
];

const CarouselSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.heading}>Embrace the Essence of India</Text>
        <Text style={styles.subheading}>Try our Kurta Set Collections</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: width,
    height: 480,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});
export default CarouselSlider;
