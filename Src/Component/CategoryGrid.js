import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryGrid = ({ data, onItemPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(item)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoryGrid;
