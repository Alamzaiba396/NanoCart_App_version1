import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CarouselSlider from '../Component/CarouselSlider';
import Header from '../Component/Header';
import PromoBanner from '../Component/PromoBanner';
import CardSlider from '../Component/CardSlider';
import TrendingDeals from '../Component/TrendingDeals';

const HomeScreen = () => {
  const images = [
    require('../assets/Images/card1.png'),
    require('../assets/Images/card2.png'),
    require('../assets/Images/card3.png'),
    require('../assets/Images/card4.png'),
    require('../assets/Images/card5.png'),
    require('../assets/Images/card6.png'),
  ];

  console.log('HomeScreen images:', images); 

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Header />
      <CarouselSlider />
      <PromoBanner />
      <View style={styles.sliderWrapper}>
        <CardSlider images={images} />
      </View>
      <TrendingDeals />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20, 
  },
  sliderWrapper: {
    height: 320, 
  },
});

export default HomeScreen;