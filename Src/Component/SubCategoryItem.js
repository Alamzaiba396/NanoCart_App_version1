import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const SubCategoryItem = ({ item, navigation,itemId }) => {

  console.log('👉 Received itemId in SubCategoryItem:', itemId);
  
  return (
    <TouchableOpacity
     style={styles.card}
     onPress={() => {
      console.log(' Navigating with itemId:', item.itemId);  
      navigation.navigate('ProductDetail', { itemId: item.itemId });
  }}>

      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.heartIcon}>
        <Image source={require('../assets/Images/Heart.png')} style={{ width: 18, height: 18 }} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Women's Party Wear</Text>
      <View style={styles.priceRow}>
        <Text style={styles.mrp}>MRP ₹{item.mrp}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.discount}>{item.discount}% Off</Text>
      </View>
      <View style={styles.ratingRow}>
        <Text style={styles.stars}>⭐ {item.rating}</Text>
        <Text style={styles.reviews}>{item.reviews}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: '1.5%',
    padding: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 6,
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 13,
  },
  subtitle: {
    fontSize: 11,
    color: '#888',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  mrp: {
    fontSize: 11,
    textDecorationLine: 'line-through',
    marginRight: 4,
    color: '#888',
  },
  price: {
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 13,
  },
  discount: {
    fontSize: 11,
    color: 'orange',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stars: {
    fontSize: 12,
    color: '#f39c12',
    marginRight: 6,
  },
  reviews: {
    fontSize: 11,
    color: '#777',
  },
});

export default SubCategoryItem;
