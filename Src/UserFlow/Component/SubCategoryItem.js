

// export default SubCategoryItem;
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedItem } from '../../redux/reducers/itemSlice';

const SubCategoryItem = ({ item, navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleHeartPress = async () => {
    const itemId = item?.itemId;
    const color = item?.defaultColor || 'Black';

    if (!itemId) {
      console.warn('❌ item.itemId is missing');
      return;
    }

    if (!token) {
      dispatch(setSelectedItem({ itemId, color }));
      navigation.navigate('Login', {
        fromScreen: 'SubCategoryScreen',
        actionAfterLogin: 'like_item',
        itemId,
      });
      return;
    }

    try {
      const res = await fetch('http://10.0.2.2:4000/api/userwishlist/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, color }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        Alert.alert('Success', 'Item added to wishlist!');
        navigation.navigate('Wishlist');
      } else {
        Alert.alert('Error', data.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('❌ Wishlist API error:', error);
      Alert.alert('Error', 'Something went wrong while adding to wishlist');
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { itemId: item.itemId })}
    >
      <Image source={{ uri: item.image.uri }} style={styles.image} />

      <TouchableOpacity style={styles.heartIcon} onPress={handleHeartPress}>
        <Image source={require('../../assets/Images/Heart.png')} style={{ width: 18, height: 18 }} />
      </TouchableOpacity>

      <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.description}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.mrp}>MRP ₹{item.mrp}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
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
});

export default SubCategoryItem;
