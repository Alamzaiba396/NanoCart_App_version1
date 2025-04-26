import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FilterComponent from '../Component/FilterComponent';
import SortComponent from '../Component/SortComponent';
import WishlistCardItem from '../Component/WishlistCardItem';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = React.useState(false);
  const [isSortModalVisible, setSortModalVisible] = React.useState(false);

  const cartItems = useSelector(state => state.cart.items);
const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const fetchWishlist = async () => {
    console.log(" Fetching wishlist...");
    if (!token) {
      console.warn(" No auth token found.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:4000/api/userwishlist', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(" Wishlist response status:", response.status);

      const data = await response.json();
      console.log(" Wishlist API response:", data);

      if (response.ok) {
        setWishlist(data?.data?.items || []);
        console.log(" Wishlist items set");
      } else {
        console.warn(" Failed to load wishlist:", data.message);
      }
    } catch (err) {
      console.error(" Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/Images/Back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>WISHLIST</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity>
            <Image source={require('../assets/Images/SearchIcon.png')} style={styles.icon} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.cartIconWrapper}>
            <Image source={require('../assets/Images/Cart.png')} style={styles.icon} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity> */}
          <View style={styles.rightIcons}>
  <TouchableOpacity style={styles.cartIconWrapper}>
    <Image source={require('../assets/Images/Cart.png')} style={styles.icon} />
    {cartCount > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartCount}</Text>
      </View>
    )}
  </TouchableOpacity>
</View>

        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            // <WishlistCardItem item={item} navigation={navigation} />
            <WishlistCardItem
  item={item}
  navigation={navigation}
  onRemove={fetchWishlist} 
/>

          )}
          contentContainerStyle={styles.grid}
        />
      )}

      <Modal animationType="slide" transparent visible={isFilterModalVisible} onRequestClose={() => setFilterModalVisible(false)}>
        <FilterComponent onClose={() => setFilterModalVisible(false)} />
      </Modal>
      <Modal animationType="slide" transparent visible={isSortModalVisible} onRequestClose={() => setSortModalVisible(false)}>
        <SortComponent onClose={() => setSortModalVisible(false)} />
      </Modal>
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6' },
  header: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 32,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', textTransform: 'uppercase' },
  rightIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 22, height: 22, resizeMode: 'contain', marginHorizontal: 8 },
  cartIconWrapper: { position: 'relative' },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});
