// SubCategoryScreen.js
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

const SubCategoryScreen = ({ navigation, route }) => {
  const { subCategory } = route.params;
  const subcategoryId = subCategory?._id;

  const [products, setProducts] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);

  const fetchItems = () => {
    setLoading(true);

    let url = sortBy
      ? `http://10.0.2.2:4000/api/items/sort?sortBy=${sortBy}`
      : `http://10.0.2.2:4000/api/items/subcategory/${subcategoryId}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const formatted = json.data.items.map((item) => ({
            name: item.name,
            description: item.description,
            mrp: item.MRP,
            price: item.discountedPrice,
            discount: item.discountPercentage,
            image: { uri: item.image },
            itemId: item._id,
          }));
          setProducts(formatted);
        } else {
          console.log('Failed to load items:', json.message);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!subcategoryId && !sortBy) return;
    fetchItems();
  }, [subcategoryId, sortBy]);

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);
  const openSortModal = () => setSortModalVisible(true);
  const closeSortModal = () => setSortModalVisible(false);

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <ActivityIndicator size="large" color="#9B5AF5" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
           
            <SubCategoryItem item={item} itemId={item.itemId} navigation={navigation} />
        
          )}
          contentContainerStyle={styles.grid}
        />
      )}
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.filterBtn} onPress={openFilterModal}>
          <Image source={require('../../assets/Images/Filter.png')} style={styles.icon} />
          <Text style={styles.iconText}>FILTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortBtn} onPress={openSortModal}>
          <Image source={require('../../assets/Images/Sort.png')} style={styles.icon} />
          <Text style={styles.iconText}>SORT</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent visible={isFilterModalVisible} onRequestClose={closeFilterModal}>
        <FilterComponent onClose={closeFilterModal} />
      </Modal>

      <Modal animationType="slide" transparent visible={isSortModalVisible} onRequestClose={closeSortModal}>
        <SortComponent onClose={closeSortModal} onApplySort={setSortBy} />
      </Modal>
    </View>
  );
};

export default SubCategoryScreen;

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
