// import React from 'react';
// import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList } from 'react-native';
// import GenderTabs from '../Component/GenderTabs';
// import SuggestionCard from '../Component/SuggestionCard';
// import { useNavigation } from '@react-navigation/native';
// const recentSearches = [
//   { label: 'Chiffon Saree', image: require('../assets/Images/Girl1.png') },
//   { label: 'Formal Shirt', image: require('../assets/Images/Girl2.png') },
//   { label: 'Cargo Pants', image: require('../assets/Images/Girl3.png') },
//   { label: 'Chiffon Saree', image: require('../assets/Images/Girl1.png') },
//   { label: 'Formal Shirt', image: require('../assets/Images/Girl2.png') },
//   { label: 'Cargo Pants', image: require('../assets/Images/Girl3.png') },
// ];
// const herData = [
//   { label: 'Saree', image: require('../assets/Images/Girl4.png') },
//   { label: 'Kurta', image: require('../assets/Images/Girl5.png') },
//   { label: 'Jeans', image: require('../assets/Images/Girl6.png') },
//   { label: 'Shorts', image: require('../assets/Images/Girl7.png') },
//   { label: 'Skirt', image: require('../assets/Images/Girl8.png') },
//   { label: 'Palazzos', image: require('../assets/Images/Girl9.png') },
// ];
// const himData = [
//   { label: 'Short Kurti', image: require('../assets/Images/Boy1.png') },
//   { label: 'Jeans', image: require('../assets/Images/Boy1.png') },
//   { label: 'Jeans', image: require('../assets/Images/Boy1.png') },
// ];

// const SearchCategory = () => {
//   const navigation = useNavigation();
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image source={require('../assets/Images/Backward.png')} style={styles.backIcon} />
//         <TextInput placeholder="Search your style" style={styles.searchInput} />
//       </View>

//       {/* Recent Searches */}
//       <Text style={styles.sectionTitle}>Recent Searches</Text>
//       <FlatList
//         data={recentSearches}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.recentItem}>
//             <Image source={item.image} style={styles.recentImage} />
//             <Text style={styles.recentLabel}>{item.label}</Text>
//           </View>
//         )}
//         contentContainerStyle={{ paddingHorizontal: 10 }}
//       />

//       {/* Popular Categories */}
//       <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Popular Categories</Text>
    
//       <GenderTabs herData={herData} himData={himData} />

//       <SuggestionCard
//   title="Searching from wishlist?"
//   productImage={require('../assets/Images/Boy1.png')}
//   productName="MAAHI Originals: Sports Tee"
//   productDesc="Active wear fits"
//   price={650}
//   oldPrice={1259}
//   discount={50}
//   rating={4.5}
//   reviews="79 Ratings & 55"
//   sizes={['XS', 'S', 'M', 'L', 'XL']}
//   colors={['black', 'green', 'white', 'gray']}
//   buttonLabel="VIEW WISHLIST"
//   onButtonPress={() => console.log('Wishlist clicked')}
// />

// <SuggestionCard
//   title="Missing anything from bag?"
//   productImage={require('../assets/Images/Girl1.png')}
//   productName="MAAHI Winter Hoodie"
//   productDesc="Unisex Collections"
//   price={1100}
//   oldPrice={1500}
//   discount={30}
//   rating={4.5}
//   reviews="121 Ratings & 59"
//   sizes={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
//   colors={['brown', 'black', 'blue', 'yellow']}
//   buttonLabel="VIEW CART"
//   onButtonPress={() => console.log('Cart clicked')}
// />

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginTop: 20, 
//   },
  
//   backIcon: {
//     width: 20,
//     height: 20,
//     // tintColor: '#000',
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#f2f2f2',
//     paddingHorizontal: 15,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     marginTop: 15,
//   },
//   recentItem: {
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   recentImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   recentLabel: {
//     fontSize: 12,
//     marginTop: 5,
//   },
// });
// export default SearchCategory;

import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList,TouchableOpacity  } from 'react-native';
import GenderTabs from '../Component/GenderTabs';
import SuggestionCard from '../Component/SuggestionCard';
import { useNavigation } from '@react-navigation/native';

const recentSearches = [
  { label: 'Chiffon Saree', image: require('../assets/Images/Girl1.png') },
  { label: 'Formal Shirt', image: require('../assets/Images/Girl2.png') },
  { label: 'Cargo Pants', image: require('../assets/Images/Girl3.png') },
  { label: 'Chiffon Saree', image: require('../assets/Images/Girl1.png') },
  { label: 'Formal Shirt', image: require('../assets/Images/Girl2.png') },
  { label: 'Cargo Pants', image: require('../assets/Images/Girl3.png') },
];

const SearchCategory = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
  <Image source={require('../assets/Images/Backward.png')} style={styles.backIcon} />
</TouchableOpacity>

        <TextInput placeholder="Search your style" style={styles.searchInput} />
      </View>

      {/* Recent Searches */}
      <Text style={styles.sectionTitle}>Recent Searches</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.recentItem}>
            <Image source={item.image} style={styles.recentImage} />
            <Text style={styles.recentLabel}>{item.label}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Popular Categories */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Popular Categories</Text>
      <GenderTabs /> 

      <SuggestionCard
        title="Searching from wishlist?"
        productImage={require('../assets/Images/Boy1.png')}
        productName="MAAHI Originals: Sports Tee"
        productDesc="Active wear fits"
        price={650}
        oldPrice={1259}
        discount={50}
        rating={4.5}
        reviews="79 Ratings & 55"
        sizes={['XS', 'S', 'M', 'L', 'XL']}
        colors={['black', 'green', 'white', 'gray']}
        buttonLabel="VIEW WISHLIST"
        onButtonPress={() =>navigation.navigate('Wishlist')}
      />

      <SuggestionCard
        title="Missing anything from bag?"
        productImage={require('../assets/Images/Girl1.png')}
        productName="MAAHI Winter Hoodie"
        productDesc="Unisex Collections"
        price={1100}
        oldPrice={1500}
        discount={30}
        rating={4.5}
        reviews="121 Ratings & 59"
        sizes={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
        colors={['brown', 'black', 'blue', 'yellow']}
        buttonLabel="VIEW CART"
        onButtonPress={() => console.log('Cart clicked')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 15,
  },
  recentItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  recentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recentLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default SearchCategory;