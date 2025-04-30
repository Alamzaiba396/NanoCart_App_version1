import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GenderTabs from '../../Component/GenderTabs';
import SuggestionCard from '../../Component/SuggestionCard';
import {useNavigation} from '@react-navigation/native';

const recentSearches = [
  {label: 'Chiffon Saree', image: require('../../assets/Images/Girl1.png')},
  {label: 'Formal Shirt', image: require('../../assets/Images/Girl2.png')},
  {label: 'Cargo Pants', image: require('../../assets/Images/Girl3.png')},
  {label: 'Chiffon Saree', image: require('../../assets/Images/Girl1.png')},
  {label: 'Formal Shirt', image: require('../../assets/Images/Girl2.png')},
  {label: 'Cargo Pants', image: require('../../assets/Images/Girl3.png')},
];

const PartnerSearchCategory = () => {
  const navigation = useNavigation();

  const renderContent = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/Images/Backward.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Image
            source={require('../../assets/Images/SearchIcon.png')} //  make sure this icon exists
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search your style"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Recent Searches */}

      <Text style={styles.sectionTitle}>Recent Searches</Text>

      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        scrollEnabled={true} //  make sure scrolling is enabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.recentItem}>
            <Image source={item.image} style={styles.recentImage} />
            <Text style={styles.recentLabel}>{item.label}</Text>
          </View>
        )}
        contentContainerStyle={{paddingHorizontal: 10}}
      />

      {/* Popular Categories */}
      <Text style={[styles.sectionTitle, {marginTop: 20}]}>
        Popular Categories
      </Text>
      <GenderTabs />

      {/* Suggestion Cards */}
      <SuggestionCard
        title="Searching from wishlist?"
        productImage={require('../../assets/Images/Boy1.png')}
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
        onButtonPress={() => navigation.navigate('Wishlist')}
      />

      <SuggestionCard
        title="Missing anything from bag?"
        productImage={require('../../assets/Images/Girl1.png')}
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
    </View>
  );

  return (
    <FlatList
      data={['virtual-wrapper']}
      renderItem={renderContent}
      keyExtractor={() => 'main-flatlist'}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },

  backIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'transparent', // no white background
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 0, // no rounded corners
  },

  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#888',
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default PartnerSearchCategory;
