import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, Modal } from 'react-native';
import Header from '../Component/Header';
import SubCategoryItem from '../Component/SubCategoryItem';
import FilterComponent from '../Component/FilterComponent';
import SortComponent from '../Component/SortComponent';

const productList = [
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree1.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree2.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree3.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree4.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree5.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree6.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree7.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree8.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree9.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree10.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree11.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree12.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree13.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
  {
    name: 'MAAHI Popular: Georgette S...',
    image: require('../assets/Images/saree14.png'),
    mrp: '15.50',
    price: '10.00',
    discount: 33,
    rating: 4.5,
    reviews: '33 Ratings',
  },
];
const WishlistScreen = ({ navigation }) => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);
  const openSortModal = () => setSortModalVisible(true);
  const closeSortModal = () => setSortModalVisible(false);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SubCategoryItem item={item}  navigation={navigation} />}
        contentContainerStyle={styles.grid}
      />
    

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={closeFilterModal}>
        <FilterComponent onClose={closeFilterModal} />
      </Modal>

      {/* Sort Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSortModalVisible}
        onRequestClose={closeSortModal} >
        <SortComponent onClose={closeSortModal} />
      </Modal>
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  grid: {
    padding: 10,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  filterBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '45%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sortBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '45%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 6,
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '500',
  },
});