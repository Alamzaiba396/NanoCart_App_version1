import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const products = [
  {
    id: '1',
    name: 'MAAHI Winter Hoodie',
    category: 'Unisex Collections',
    mrp: '₹1499.00',
    price: '₹1100.00',
    image: require('../../assets/Images/Carosuel1.png'),
  },
  {
    id: '2',
    name: 'MAAHI Popular: Georgette Saree',
    category: "Women's Party Wear",
    mrp: '₹1550.00',
    price: '₹1100.00',
    image: require('../../assets/Images/Carosuel1.png'),
  },
];

const CancelOrderScreen = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [reason, setReason] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    } else {
      setSelectedItems(prev => [...prev, id]);
    }
  };

  const CustomCheckbox = ({ isChecked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {isChecked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CANCEL ORDER</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {/* Select All */}
        <View style={styles.selectAllRow}>
          <Text style={styles.selectAllText}>Select all</Text>
          <CustomCheckbox isChecked={selectAll} onPress={toggleSelectAll} />
        </View>

        {/* Products */}
        {products.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
                MRP <Text style={styles.strike}>{item.mrp}</Text> <Text style={styles.bold}>{item.price}</Text>
              </Text>
            </View>
            <CustomCheckbox
              isChecked={selectedItems.includes(item.id)}
              onPress={() => toggleItem(item.id)}
            />
          </View>
        ))}

        {/* Reason input */}
        <Text style={styles.reasonLabel}>
          Reasons for cancellation <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={reason}
          onChangeText={setReason}
          placeholder="Enter your reason..."
          multiline
        />
      </ScrollView>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>CANCEL ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  backArrow: { fontSize: 18, marginRight: 10 },
  headerTitle: { fontWeight: 'bold', fontSize: 16 },
  scroll: { padding: 14 },
  selectAllRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllText: { fontSize: 14 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  image: { width: 60, height: 70, borderRadius: 4 },
  details: { flex: 1, marginHorizontal: 10 },
  name: { fontWeight: 'bold', fontSize: 13 },
  category: { fontSize: 11, color: '#555' },
  price: { fontSize: 12, marginTop: 4 },
  strike: { textDecorationLine: 'line-through', color: '#999' },
  bold: { fontWeight: 'bold' },
  reasonLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  cancelButton: {
    backgroundColor: '#D6722F',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Custom checkbox
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D6722F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#D6722F',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 14,
  },
});

export default CancelOrderScreen;
