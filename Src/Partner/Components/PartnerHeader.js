// // PartnerHeader.js
// import React from 'react';
// import {
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   useWindowDimensions,
//   SafeAreaView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';

// const PartnerHeader = () => {
//   const { width } = useWindowDimensions();
//   const navigation = useNavigation();
//   const cartItems = useSelector((state) => state.cart.items);
//   const token = useSelector((state) => state.auth.token);

//   const totalCartCount = cartItems.reduce((sum, item) => {
//     const count = item.orderDetails.reduce(
//       (colorSum, colorObj) =>
//         colorSum + colorObj.sizeAndQuantity.reduce((sizeSum, s) => sizeSum + s.quantity, 0),
//       0
//     );
//     return sum + count;
//   }, 0);

//   const handleCartPress = () => {
//     if (token) {
//       navigation.navigate('PartnerCart');
//     } else {
//       navigation.navigate('Login', { fromScreen: 'PartnerHeader' });
//     }
//   };

//   return (
//     <SafeAreaView style={{ backgroundColor: '#fff' }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingHorizontal: 15,
//           paddingVertical: 12,
//           backgroundColor: '#fff',
//           width,
//           marginTop: 25,
//         }}
//       >
//         <Image
//           source={require('../../assets/Images/Headerlogo.png')}
//           style={{ width: 110, height: 35, resizeMode: 'contain' }}
//         />

//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <Text style={{ marginRight: 12, fontWeight: '600', fontSize: 14 }}>₹ INR partner</Text>

//           <TouchableOpacity
//             style={{ marginRight: 20 }}
//             onPress={() => navigation.navigate('PartnerSearch')}
//           >
//             <Image
//               source={require('../../assets/Images/SearchIcon.png')}
//               style={{ width: 20, height: 20, resizeMode: 'contain' }}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleCartPress} style={{ position: 'relative' }}>
//             <Image
//               source={require('../../assets/Images/Cart.png')}
//               style={{ width: 24, height: 24, resizeMode: 'contain' }}
//             />

//             {totalCartCount > 0 && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: -6,
//                   right: -8,
//                   backgroundColor: '#F36F25',
//                   borderRadius: 10,
//                   width: 18,
//                   height: 18,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
//                   {totalCartCount}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default PartnerHeader;


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

const PartnerHeader = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);

  // Calculate total cart count
  const totalCartCount = cartItems.reduce((sum, item) => {
    const count = item.orderDetails.reduce(
      (colorSum, colorObj) =>
        colorSum + colorObj.sizeAndQuantity.reduce((sizeSum, s) => sizeSum + s.quantity, 0),
      0
    );
    return sum + count;
  }, 0);

  // Log for debugging
  console.log('PartnerHeader - Cart Items:', cartItems);
  console.log('PartnerHeader - Total Cart Count:', totalCartCount);

  const handleCartPress = () => {
    if (token) {
      navigation.navigate('PartnerCart');
    } else {
      navigation.navigate('Login', { fromScreen: 'PartnerHeader' });
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
        <Image
          source={require('../../assets/Images/Headerlogo.png')}
          style={{ width: 110, height: 35, resizeMode: 'contain' }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 12, fontWeight: '600', fontSize: 14 }}>₹ INR partner</Text>

          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate('PartnerSearch')}
          >
            <Image
              source={require('../../assets/Images/SearchIcon.png')}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCartPress} style={{ position: 'relative' }}>
            <Image
              source={require('../../assets/Images/Cart.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />

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

export default PartnerHeader;