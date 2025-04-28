// import React from 'react';
// import { View, Image, Text, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 

// const Header = () => {
//   const { width } = useWindowDimensions();
//   const navigation = useNavigation(); 

//   return (
//     <SafeAreaView style={{ backgroundColor: '#fff' }}>
//       <View style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         paddingVertical: 12,
//         backgroundColor: '#fff',
//         width,
//         marginTop: 25,
//       }}>
//         {/* Logo Image */}
//         <Image
//           source={require('../assets/Images/Headerlogo.png')}
//           style={{ width: 110, height: 35, resizeMode: 'contain' }}
//         />

//         {/* Currency and Icons */}
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text style={{ marginRight: 12, fontWeight: '600', fontSize: 14 }}>₹ INR</Text>

//           {/* Search Icon */}
//           <TouchableOpacity
//             style={{ marginRight: 20 }} // Increased space between search and cart
//             onPress={() => navigation.navigate('Search')}
//           >
//             <Image
//               source={require('../assets/Images/SearchIcon.png')}
//               style={{ width: 20, height: 20, resizeMode: 'contain' }}
//             />
//           </TouchableOpacity>

//           {/* Cart Icon */}
//           <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//             <Image
//               source={require('../assets/Images/Cart.png')}
//               style={{ width: 22, height: 22, resizeMode: 'contain' }}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Header;import React from 'react';
import { View, Image, Text, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useSelector } from 'react-redux'; // 👈 for accessing cart items

const Header = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items); // 👈 access cart items
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // 👈 total quantity count

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
        {/* Logo */}
        <Image
          source={require('../assets/Images/Headerlogo.png')}
          style={{ width: 110, height: 35, resizeMode: 'contain' }}
        />

        {/* Right Side */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Currency Text */}
          <Text style={{ marginRight: 12, fontWeight: '600', fontSize: 14 }}>₹ INR</Text>

          {/* Search Icon */}
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('Search')}>
            <Image
              source={require('../assets/Images/SearchIcon.png')}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          {/* Cart Icon with Badge */}
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ position: 'relative' }}>
            <Image
              source={require('../assets/Images/Cart.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />

            {/* Badge */}
            {totalCartCount > 0 && (
              <View style={{
                position: 'absolute',
                top: -6,
                right: -8,
                backgroundColor: '#F36F25',
                borderRadius: 10,
                width: 18,
                height: 18,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{totalCartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
