import React from 'react';
import { View, Image, Text, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Header = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation(); 

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#fff',
        width,
        marginTop: 25,
      }}>
        {/* Logo Image */}
        <Image
          source={require('../assets/Images/Headerlogo.png')}
          style={{ width: 110, height: 35, resizeMode: 'contain' }}
        />

        {/* Currency and Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 12, fontWeight: '600', fontSize: 14 }}>₹ INR</Text>

          {/* Search Icon */}
          <TouchableOpacity
            style={{ marginRight: 20 }} // Increased space between search and cart
            onPress={() => navigation.navigate('Search')}
          >
            <Image
              source={require('../assets/Images/SearchIcon.png')}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          {/* Cart Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/Images/Cart.png')}
              style={{ width: 22, height: 22, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;