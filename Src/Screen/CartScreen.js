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
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const CartScreen = ({ navigation }) => {
  const [quantities, setQuantities] = useState([1, 1]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authToken = useSelector((state) => state.auth.token);


  const handleIncrease = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantities[index] + 1;
    setQuantities(newQuantities);
  };

  const handleDecrease = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] = newQuantities[index] - 1;
      setQuantities(newQuantities);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleLoginPress = () => {
    closeModal(); // Close the modal
    navigation.navigate('Login'); // Navigate to Login screen
  };

  // const handleContinuePress = () => {
  //   setIsModalVisible(true); // Open the login modal when CONTINUE is pressed
  // };


  const handleContinuePress = () => {
    if (authToken) {
      // User is logged in, navigate to Delivery screen
      navigation.navigate('Delivery');
    } else {
      // User not logged in, show modal
      setIsModalVisible(true);
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
          <Feather name="arrow-left" size={24} color="black" />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>CART</Text>
          <Feather name="shopping-cart" size={24} style={{ marginLeft: 'auto' }} />
        </View>

        {/* Progress Bar */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: '#F36F25' }}>● CART DETAILS</Text>
          <Text style={{ color: '#ccc' }}> ───── </Text>
          <Text style={{ color: '#ccc' }}>● ADDRESS</Text>
          <Text style={{ color: '#ccc' }}> ───── </Text>
          <Text style={{ color: '#ccc' }}>● PAYMENT</Text>
        </View>

        {/* Product Cards */}
        {[0, 1].map((index) => (
          <View
            key={index}
            style={{ backgroundColor: '#fff', padding: 15, marginVertical: 5 }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={
                  index === 0
                    ? require('../assets/Images/Carosuel1.png')
                    : require('../assets/Images/Carosuel2.png')
                }
                style={{ width: 80, height: 100, borderRadius: 8 }}
                resizeMode="cover"
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>MAAHI Winter Hoodie</Text>
                <Text style={{ color: '#777' }}>Unisex Collections</Text>
                {index === 0 && <Text style={{ marginTop: 5 }}>Size: M</Text>}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Text>Qty:</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F6B684',
                      paddingHorizontal: 6,
                      marginHorizontal: 5,
                    }}
                    onPress={() => handleDecrease(index)}
                  >
                    <Feather name="minus" size={16} color="#fff" />
                  </TouchableOpacity>
                  <Text>{quantities[index]}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F6B684',
                      paddingHorizontal: 6,
                      marginHorizontal: 5,
                    }}
                    onPress={() => handleIncrease(index)}
                  >
                    <Feather name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    color: '#888',
                    marginTop: 5,
                  }}
                >
                  ₹1499.00
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000' }}>
                  ₹1100.00
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderColor: '#F36F25',
                  borderWidth: 1,
                  marginRight: 5,
                  padding: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#F36F25' }}>MOVE TO WISHLIST</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderColor: '#F36F25',
                  borderWidth: 1,
                  marginLeft: 5,
                  padding: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#F36F25' }}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Apply Coupon */}
        <TouchableOpacity
          style={{
            margin: 15,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>Apply Coupon</Text>
          <Feather name="chevron-down" size={20} color="black" />
        </TouchableOpacity>

        {/* Price Details */}
        <View
          style={{
            marginHorizontal: 15,
            padding: 10,
            backgroundColor: '#FFF8F5',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
            Price Details (2 items)
          </Text>
          <View style={styles.priceRow}>
            <Text>Cart Total</Text>
            <Text>₹3049</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Discounted Price</Text>
            <Text>₹2200</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={{ color: '#F36F25' }}>Coupon Discount</Text>
            <Text style={{ color: '#F36F25' }}>- ₹200</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>GST</Text>
            <Text>₹296.7</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Shipping Charges</Text>
            <Text style={{ color: '#F36F25' }}>FREE</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#F36F25',
            padding: 15,
            margin: 15,
            borderRadius: 5,
          }}
          onPress={handleContinuePress} // Trigger modal on CONTINUE press
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
            CONTINUE
          </Text>
        </TouchableOpacity>

        {/* Payment Method */}
        <Text style={{ textAlign: 'center', marginBottom: 15 }}>
          Payment Method <Text style={{ fontWeight: 'bold' }}>UPI</Text>
        </Text>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Cross Icon */}
                <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Uh-oh!</Text>
                <Text style={styles.modalMessage}>
                  Looks like you haven't logged in!
                </Text>

                <TouchableOpacity style={styles.modalButton} onPress={handleLoginPress}>
                  <Text style={styles.modalButtonText}>LOGIN TO CONTINUE</Text>
                </TouchableOpacity>

                <Text style={styles.modalHelpText}>
                  Having trouble logging in? Whatsapp Us
                </Text>
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
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
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