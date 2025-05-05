import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const items = [
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

const ReturnExchangeScreen = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [reason, setReason] = useState('');
  const [issue, setIssue] = useState('');
  const [returnType, setReturnType] = useState('');

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(i => i.id));
    }
    setSelectAll(!selectAll);
  };

  const CustomCheckbox = ({ checked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>RETURN / EXCHANGE</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {/* Select All */}
        <View style={styles.selectAllRow}>
          <Text style={styles.label}>Select all</Text>
          <CustomCheckbox checked={selectAll} onPress={toggleSelectAll} />
        </View>

        {/* Items List */}
        {items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
                MRP <Text style={styles.strike}>{item.mrp}</Text>{' '}
                <Text style={styles.bold}>{item.price}</Text>
              </Text>
            </View>
            <CustomCheckbox
              checked={selectedItems.includes(item.id)}
              onPress={() => toggleItem(item.id)}
            />
          </View>
        ))}

        {/* Reason Dropdown (Simplified as input for now) */}
        <Text style={styles.sectionLabel}>
          Reason for Return / Exchange <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          placeholder="Select reason"
          value={reason}
          onChangeText={setReason}
          style={styles.input}
        />

        {/* Issue description */}
        <Text style={styles.sectionLabel}>Tell us more about the issue</Text>
        <TextInput
          placeholder="(Max 500 words)"
          value={issue}
          onChangeText={setIssue}
          style={[styles.input, { height: 100 }]}
          multiline
        />

        {/* Return / Exchange Options */}
        <Text style={styles.sectionLabel}>How do you want to proceed?</Text>

        <TouchableOpacity
          style={styles.radioBox}
          onPress={() => setReturnType('refund')}
        >
          <CustomCheckbox
            checked={returnType === 'refund'}
            onPress={() => setReturnType('refund')}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bold}>Return & Refund</Text>
            <Text style={styles.desc}>
              Our pickup partner will collect the item within 2–3 days. After quality check, refund
              will be processed in 5–7 business days.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioBox}
          onPress={() => setReturnType('exchange')}
        >
          <CustomCheckbox
            checked={returnType === 'exchange'}
            onPress={() => setReturnType('exchange')}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bold}>Exchange</Text>
            <Text style={styles.desc}>
              If you opt for exchange, our pickup partner will collect & deliver simultaneously.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Pickup Address */}
        <View style={styles.addressBox}>
          <View style={styles.addressHeader}>
            <Text style={styles.sectionLabel}>Pickup Address</Text>
            <Text style={styles.change}>CHANGE</Text>
          </View>
          <Text style={styles.addressText}>
            Anuradha Sharma{"\n"}Flat-A/101, Kalyani Enclaves, Near Sardar Lake, 3rd Cross, Patel
            Layout, Gandhi Nagar, Gujarat, 754025
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity onPress={()=>navigation.navigate('ReturnConfirm')} style={styles.confirmButton}>
        <Text style={styles.confirmText}>CONFIRM PICKUP</Text>
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
  title: { fontWeight: 'bold', fontSize: 16 },
  scroll: { padding: 14 },
  selectAllRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: { fontSize: 14 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  image: { width: 60, height: 70, borderRadius: 4 },
  info: { flex: 1, marginHorizontal: 10 },
  name: { fontWeight: 'bold', fontSize: 13 },
  category: { fontSize: 11, color: '#555' },
  price: { fontSize: 12, marginTop: 4 },
  strike: { textDecorationLine: 'line-through', color: '#999' },
  bold: { fontWeight: 'bold' },
  sectionLabel: { fontWeight: '600', fontSize: 13, marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  radioBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  desc: { fontSize: 12, color: '#555', marginTop: 4 },
  addressBox: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 12,
    marginTop: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  change: { color: '#D6722F', fontWeight: 'bold', fontSize: 12 },
  addressText: { fontSize: 12, color: '#444', marginTop: 4 },
  confirmButton: {
    backgroundColor: '#D6722F',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
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

export default ReturnExchangeScreen;
