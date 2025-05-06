
// WishlistCardItem.js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const PartnerWishlistCardItem = ({ item, navigation, onRemove }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const product = item?.itemId;

  const color = item?.color;
  const itemId = product?._id;

  const handleHeartPress = async () => {
    console.log("Heart press triggered");
  
    console.log("Extracted itemId:", itemId);
    console.log("Extracted color:", color);
    console.log("Token:", token);
  
    if (!token || !itemId || !color) {
      console.warn("❌ Missing token, itemId, or color");
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:4000/api/partner/wishlist/removeitem', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, color }),
      });
  
      const data = await response.json();
      console.log("✅ Wishlist Remove Response:", data);
  
      if (response.ok) {
        Alert.alert('Removed', 'Item removed from wishlist.');
        onRemove(); // Refresh
      } else {
        Alert.alert('Error', data.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };


  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: product?.image }} style={styles.image} />

      <TouchableOpacity style={styles.heartIcon} onPress={handleHeartPress}>
        <Image
          source={require('../../assets/Images/Heart.png')}
          style={{ width: 18, height: 18 }}
        />
      </TouchableOpacity>

      <Text numberOfLines={1} style={styles.title}>
        {product?.name?.trim() || 'Unnamed'}
      </Text>

      <Text style={styles.subtitle}>{product?.description?.trim() || 'No Description'}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.mrp}>MRP ₹{product?.MRP}</Text>
        <Text style={styles.price}>₹{product?.discountedPrice}</Text>
        <Text style={styles.discount}>
          ({Math.round(product?.discountPercentage)}% Off)
        </Text>
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
    backgroundColor: '#f0f0f0',
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
    flexWrap: 'wrap',
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
});

export default PartnerWishlistCardItem;
