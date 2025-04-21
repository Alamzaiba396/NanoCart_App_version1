// import React, { useState } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, Modal } from 'react-native';
// import Header from '../Component/Header';
// import SubCategoryItem from '../Component/SubCategoryItem';
// import FilterComponent from '../Component/FilterComponent';
// import SortComponent from '../Component/SortComponent';

// const productList = [
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree1.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree2.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree3.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree4.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree5.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree6.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree7.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree8.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree9.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree10.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree11.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree12.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree13.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
//   {
//     name: 'MAAHI Popular: Georgette S...',
//     image: require('../assets/Images/saree14.png'),
//     mrp: '15.50',
//     price: '10.00',
//     discount: 33,
//     rating: 4.5,
//     reviews: '33 Ratings',
//   },
// ];
// const SubCategoryScreen = ({ navigation }) => {
//   const [isFilterModalVisible, setFilterModalVisible] = useState(false);
//   const [isSortModalVisible, setSortModalVisible] = useState(false);
//   const openFilterModal = () => setFilterModalVisible(true);
//   const closeFilterModal = () => setFilterModalVisible(false);
//   const openSortModal = () => setSortModalVisible(true);
//   const closeSortModal = () => setSortModalVisible(false);

//   return (
//     <View style={styles.container}>
//       <Header />
//       <FlatList
//         data={productList}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => <SubCategoryItem item={item}  navigation={navigation} />}
//         contentContainerStyle={styles.grid}
//       />
//       <View style={styles.footerButtons}>
//         <TouchableOpacity style={styles.filterBtn} onPress={openFilterModal}>
//           <Image source={require('../assets/Images/Filter.png')} style={styles.icon} />
//           <Text style={styles.iconText}>FILTER</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sortBtn} onPress={openSortModal}>
//           <Image source={require('../assets/Images/Sort.png')} style={styles.icon} />
//           <Text style={styles.iconText}>SORT</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Filter Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isFilterModalVisible}
//         onRequestClose={closeFilterModal}>
//         <FilterComponent onClose={closeFilterModal} />
//       </Modal>

//       {/* Sort Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isSortModalVisible}
//         onRequestClose={closeSortModal} >
//         <SortComponent onClose={closeSortModal} />
//       </Modal>
//     </View>
//   );
// };

// export default SubCategoryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f6f6f6',
//   },
//   grid: {
//     padding: 10,
//   },
//   footerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },
//   filterBtn: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     width: '45%',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   sortBtn: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     width: '45%',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   icon: {
//     width: 18,
//     height: 18,
//     marginRight: 6,
//     resizeMode: 'contain',
//   },
//   iconText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });



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
import Header from '../Component/Header';
import SubCategoryItem from '../Component/SubCategoryItem';
import FilterComponent from '../Component/FilterComponent';
import SortComponent from '../Component/SortComponent';

const SubCategoryScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isSortModalVisible, setSortModalVisible] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://192.168.1.24:4000/api/items/subcategory/6800aed43695ce2bf2f3afd1');
      const json = await response.json();
      if (json.success && json.data?.items) {
        setItems(json.data.items);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);
  const openSortModal = () => setSortModalVisible(true);
  const closeSortModal = () => setSortModalVisible(false);

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <ActivityIndicator size="large" color="#8e44ad" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SubCategoryItem
              item={{
                name: item.name,
                description: item.description,
                mrp: item.MRP,
                price: item.discountedPrice,
                discount: item.discountPercentage,
                image: { uri: item.image }
              }}
              navigation={navigation}
            />
          )}
          contentContainerStyle={styles.grid}
        />
      )}

      {/* Footer Buttons */}
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.filterBtn} onPress={openFilterModal}>
          <Image source={require('../assets/Images/Filter.png')} style={styles.icon} />
          <Text style={styles.iconText}>FILTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortBtn} onPress={openSortModal}>
          <Image source={require('../assets/Images/Sort.png')} style={styles.icon} />
          <Text style={styles.iconText}>SORT</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal animationType="slide" transparent={true} visible={isFilterModalVisible} onRequestClose={closeFilterModal}>
        <FilterComponent onClose={closeFilterModal} />
      </Modal>

      {/* Sort Modal */}
      <Modal animationType="slide" transparent={true} visible={isSortModalVisible} onRequestClose={closeSortModal}>
        <SortComponent onClose={closeSortModal} />
      </Modal>
    </View>
  );
};

export default SubCategoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  grid: { paddingHorizontal: 10, paddingBottom: 100 },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  iconText: {
    fontWeight: 'bold',
  },
});
