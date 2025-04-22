import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';

// 🔽 Local icons
const backIcon = require('../assets/Images/Back.png');
const cartIcon = require('../assets/Images/CartIcon.png');

const CartScreen = ({ navigation }) => {
  const [quantities, setQuantities] = useState([1, 1]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authToken = useSelector((state) => state.auth.token);

  const handleIncrease = (index) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const handleDecrease = (index) => {
    const updated = [...quantities];
    if (updated[index] > 1) updated[index]--;
    setQuantities(updated);
  };

  const handleContinuePress = () => {
    if (authToken) navigation.navigate('Delivery');
    else setIsModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CART</Text>
          <Image source={cartIcon} style={styles.icon} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progress}>
          <Text style={{ fontWeight: 'bold', color: '#F36F25' }}>● CART DETAILS</Text>
          <Text style={styles.progressLine}>─────</Text>
          <Text style={styles.progressText}>● ADDRESS</Text>
          <Text style={styles.progressLine}>─────</Text>
          <Text style={styles.progressText}>● PAYMENT</Text>
        </View>

        {/* Product Cards */}
        {[0, 1].map((index) => (
          <View key={index} style={styles.card}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={
                  index === 0
                    ? require('../assets/Images/Carosuel1.png')
                    : require('../assets/Images/Carosuel2.png')
                }
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>MAAHI Winter Hoodie</Text>
                <Text style={styles.productDesc}>Unisex Collections</Text>
                {index === 0 && <Text>Size : M</Text>}
                <View style={styles.qtyRow}>
                  <Text>Qty : </Text>
                  <TouchableOpacity onPress={() => handleDecrease(index)} style={styles.qtyBtn}>
                    <Entypo name="chevron-down" size={14} color="#fff" />
                  </TouchableOpacity>
                  <Text>{quantities[index]}</Text>
                  <TouchableOpacity onPress={() => handleIncrease(index)} style={styles.qtyBtn}>
                    <Entypo name="chevron-up" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.strikePrice}>MRP ₹1499.00</Text>
                <Text style={styles.actualPrice}>₹1100.00</Text>
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>MOVE TO WISHLIST</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Apply Coupon */}
        <TouchableOpacity style={styles.couponBar}>
          <Text>Apply Coupon</Text>
          <Entypo name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>

        {/* Price Details */}
        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Price Details (2 items)</Text>
          <View style={styles.priceRow}><Text>Cart Total</Text><Text>₹3049</Text></View>
          <View style={styles.priceRow}><Text>Discounted Price</Text><Text>₹2200</Text></View>
          <View style={styles.priceRow}><Text style={styles.orange}>Coupon Discount</Text><Text style={styles.orange}>- ₹200</Text></View>
          <View style={styles.priceRow}><Text>GST</Text><Text>₹296.7</Text></View>
          <View style={styles.priceRow}><Text>Shipping Charges</Text><Text style={styles.orange}>FREE</Text></View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinuePress}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>

        {/* Payment Method */}
        <Text style={styles.paymentRow}>
          Payment Method <Text style={{ fontWeight: 'bold' }}>UPI</Text>
        </Text>
      </ScrollView>

      {/* Login Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeIcon}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Uh-oh!</Text>
                <Text style={styles.modalMessage}>Looks like you haven't logged in!</Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => {
                  setIsModalVisible(false);
                  navigation.navigate('Login');
                }}>
                  <Text style={styles.modalButtonText}>LOGIN TO CONTINUE</Text>
                </TouchableOpacity>
                <Text style={styles.modalHelpText}>Having trouble logging in? Whatsapp Us</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  progressLine: {
    color: '#ccc',
    marginHorizontal: 4,
  },
  progressText: {
    color: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontWeight: 'bold',
  },
  productDesc: {
    color: '#777',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  qtyBtn: {
    backgroundColor: '#F6B684',
    paddingHorizontal: 6,
    marginHorizontal: 5,
    borderRadius: 3,
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginTop: 5,
    fontSize: 13,
  },
  actualPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    borderColor: '#F36F25',
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#F36F25',
  },
  couponBar: {
    margin: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceCard: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: '#FFF8F5',
    borderRadius: 8,
  },
  priceTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orange: {
    color: '#F36F25',
  },
  continueBtn: {
    backgroundColor: '#F36F25',
    padding: 15,
    margin: 15,
    borderRadius: 5,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paymentRow: {
    textAlign: 'center',
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
  },
  modalButton: {
    backgroundColor: '#f37022',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalHelpText: {
    color: '#888',
    fontSize: 13,
    marginTop: 5,
  },
});
