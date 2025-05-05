import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Header = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);
  const token = useSelector(state => state.auth.token); // 👈 get token
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartPress = () => {
    if (token) {
      navigation.navigate('Cart');
    } else {
      navigation.navigate('Login', { fromScreen: 'Header' }); // Optional: pass context
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 12,
          backgroundColor: '#fff',
          width,
          marginTop: 25,
        }}
      >
        {/* Logo */}
        <Image
          source={require('../../assets/Images/Headerlogo.png')}
          style={{ width: 110, height: 35, resizeMode: 'contain' }}
        />

        {/* Right icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 12, fontWeight: '600', fontSize: 14 }}>₹ INR</Text>

          {/* Search Icon */}
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('Search')}>
            <Image
              source={require('../../assets/Images/SearchIcon.png')}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          {/* Cart Icon with Badge */}
          <TouchableOpacity onPress={handleCartPress} style={{ position: 'relative' }}>
            <Image
              source={require('../../assets/Images/Cart.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />

            {/* Badge */}
            {totalCartCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -8,
                  backgroundColor: '#F36F25',
                  borderRadius: 10,
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                  {totalCartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
