
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

const CategoryGrid = ({ data, onItemPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onItemPress(item)}
    >
      <Image
        source={{ uri: item.image }} // Access the image URL from the API response
        style={styles.itemImage}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    // padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '50%',
   
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
  
    width: '100%',
    height: 150,
    // borderRadius: 8,
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});

export default CategoryGrid;