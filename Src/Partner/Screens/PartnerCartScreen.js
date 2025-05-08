import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PartnerHeader from '../Components/PartnerHeader';

const PartnerCartScreen = ({navigation}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [couponAccordionOpen, setCouponAccordionOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [walletAmount, setWalletAmount] = useState('');

  const initialItems = [
    {
      id: 1,
      image: require('../../assets/Images/Carosuel1.png'),
      title: 'MAAHI Winter Hoodie',
      category: 'Unisex Collections',
      price: 100,
      mrp: 150,
      sizeQty: {
        S: 15,
        M: 25,
        L: 30,
        XL: 20,
        '2XL': 20,
        '3XL': 10,
      },
    },
  ];

  const [cartItems, setCartItems] = useState(initialItems);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const updateQuantity = (itemIndex, sizeKey, delta) => {
    const updatedCart = [...cartItems];
    const currentQty = updatedCart[itemIndex].sizeQty[sizeKey];
    const newQty = Math.max(0, currentQty + delta);
    updatedCart[itemIndex].sizeQty[sizeKey] = newQty;
    setCartItems(updatedCart);
  };

  const calculateTotalQty = (sizeQty) =>
    Object.values(sizeQty).reduce((a, b) => a + b, 0);

  const calculateTotalPrice = (sizeQty, price) =>
    calculateTotalQty(sizeQty) * price;


  const handleContinue = () => {
  navigation.navigate('PartnerDelivery');
    
  }
    // Handle continue action, e.g., navigate to the next screen}
  return (
    <View style={styles.container}>
      <PartnerHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.stepRow}>
          <Text style={styles.activeStep}>● CART DETAILS</Text>
          <Text style={styles.inactiveStep}>● ADDRESS</Text>
          <Text style={styles.inactiveStep}>● PAYMENT</Text>
        </View>

        {cartItems.map((item, index) => {
          const totalQty = calculateTotalQty(item.sizeQty);
          const totalPrice = calculateTotalPrice(item.sizeQty, item.price);

          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.row}>
                <Image source={item.image} style={styles.productImage} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.price}>
                    MRP <Text style={styles.mrp}>₹{item.mrp}</Text> ₹{item.price.toFixed(2)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={styles.accordionToggle}>
                <Text style={{ fontWeight: '500' }}>Check Order Details</Text>
                <Icon
                  name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={18}
                />
              </TouchableOpacity>

              {expandedIndex === index && (
                <View style={styles.accordion}>
                  <View style={styles.colorRow}>
                    {['green', 'maroon', 'black', 'navy', 'gold'].map((color) => (
                      <View
                        key={color}
                        style={[styles.colorBox, { backgroundColor: color }]}
                      />
                    ))}
                  </View>

                  {Object.entries(item.sizeQty).map(([size, qty]) => (
                    <View key={size} style={styles.sizeRow}>
                      <Text style={styles.sizeLabel}>{size}</Text>
                      <View style={styles.qtyControl}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(index, size, -1)}
                        >
                          <AntDesign name="down" size={14} color="#D6722F" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{qty}</Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(index, size, 1)}
                        >
                          <AntDesign name="up" size={14} color="#D6722F" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  <Text style={styles.detailText}>Qty. per Color: {totalQty}</Text>
                  <Text style={styles.detailText}>Total Qty: {totalQty}</Text>
                  <Text style={styles.detailText}>Price / Pcs: ₹{item.price}</Text>
                  <Text style={styles.detailText}>Total Price: ₹{totalPrice}</Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.outlineBtn}>
                      <Text style={styles.outlineText}>MOVE TO WISHLIST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlineBtn}>
                      <Text style={styles.outlineText}>REMOVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        {/* Coupon Accordion */}
        <TouchableOpacity
          style={styles.accordionToggle}
          onPress={() => setCouponAccordionOpen(!couponAccordionOpen)}
        >
          <Text style={styles.sectionTitle}>Apply Coupon</Text>
          <Icon
            name={couponAccordionOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
          />
        </TouchableOpacity>

        {couponAccordionOpen && (
          <View style={styles.accordion}>
            <View style={styles.row}>
              <TextInput
                placeholder="Enter your Coupon code"
                style={styles.input}
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={{ color: '#fff' }}>APPLY</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Use Wallet</Text>
            <TextInput
              placeholder="₹"
              style={styles.input}
              keyboardType="numeric"
              value={walletAmount}
              onChangeText={setWalletAmount}
            />
            <Text style={styles.balanceText}>Available Balance (₹40000)</Text>
          </View>
        )}

        {/* Price Summary */}
        <View style={styles.priceBox}>
          <Text style={styles.priceHeading}>Price Details (1 item)</Text>
          <Text>Cart Total <Text style={styles.strike}>₹15,000</Text></Text>
          <Text>Discounted Price ₹12,000</Text>
          <Text style={styles.orange}>Wallet Money -₹1100</Text>
          <Text style={styles.orange}>Coupon Discount -₹200</Text>
          <Text>COD Charges ₹50</Text>
          <Text>GST ₹296.7</Text>
          <Text>Shipping Charges <Text style={{ color: 'green' }}>FREE</Text></Text>
          <Text style={styles.totalAmt}>Total Amount ₹10,746.7</Text>
          <Text style={styles.saving}>Hooray! you are saving ₹3,000/- with this order!</Text>
        </View>

        <Text style={styles.paymentMethod}>
          Payment Method: <Text style={{ fontWeight: 'bold' }}>UPI</Text>
        </Text>
      </ScrollView>

      <TouchableOpacity onPress={handleContinue} style={styles.continueBtn}>
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  stepRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  activeStep: { color: '#D6722F', fontWeight: 'bold' },
  inactiveStep: { color: '#ccc' },
  card: {
    backgroundColor: '#fdf6f1',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  category: { color: '#777', marginVertical: 4 },
  price: { fontSize: 16 },
  mrp: { textDecorationLine: 'line-through', color: '#888' },
  accordionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  accordion: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorRow: { flexDirection: 'row', marginBottom: 10 },
  colorBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  sizeLabel: { fontWeight: '600' },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 10,
  },
  qtyText: { fontSize: 15, fontWeight: '600' },
  detailText: { marginTop: 4 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingHorizontal: 4,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: '#D6722F',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  outlineText: { color: '#D6722F', fontWeight: '500' },
  sectionTitle: { fontWeight: '600' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  applyBtn: {
    backgroundColor: '#D6722F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 4,
    marginLeft: 8,
  },
  balanceText: { fontSize: 12, color: '#555', marginTop: 4 },
  priceBox: {
    backgroundColor: '#fff3e8',
    padding: 12,
    margin: 12,
    borderRadius: 8,
  },
  priceHeading: { fontWeight: 'bold', marginBottom: 6 },
  strike: { textDecorationLine: 'line-through', color: '#888' },
  orange: { color: 'orangered' },
  totalAmt: { fontWeight: 'bold', marginTop: 8 },
  saving: { color: '#D6722F', marginTop: 4 },
  paymentMethod: { paddingHorizontal: 16, fontSize: 15, marginTop: 4 },
  continueBtn: {
    backgroundColor: '#D6722F',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  continueText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default PartnerCartScreen;
