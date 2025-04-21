import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DeliveryAddressScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  const handleContinue = () => {
    if (!hasShownModal) {
      setModalVisible(true);
      setHasShownModal(true);
    } else {
      navigation.navigate('Payment');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={22} color="#000" />
        <Text style={styles.headerTitle}>DELIVERY ADDRESS</Text>
      </View>

      {/* Steps Indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepActive}>■ CART DETAILS</Text>
        <Text style={styles.stepActive}>■ ADDRESS</Text>
        <Text style={styles.stepInactive}>■ PAYMENT</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Deliver to Section */}
        <View style={styles.deliverToContainer}>
          {/* <Text style={styles.deliverToText}>Deliver to</Text> */}
          <View style={styles.deliverToDetails}>
            <Text style={styles.deliverToName}>Anuradha Sharma</Text>
            <Text style={styles.deliverToAddress}>Anjurad, 724026</Text>
            <Text style={styles.deliverToAddress}>Gujrat,742025</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('edit')}  style={styles.changeButton}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        {/* Add Address Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewAddress')}
          style={styles.addAddressBtn}
        >
          <Text style={styles.addAddressText}>ADD  ADDRESS</Text>
        </TouchableOpacity>

        {/* Price Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Price Details (2 items)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cart Total</Text>
            <Text style={styles.strike}>₹3049</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Discounted Price</Text>
            <Text style={styles.value}>₹2200</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.discount}>Coupon Discount</Text>
            <Text style={styles.discount}>-₹200</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>GST</Text>
            <Text style={styles.value}>₹296.7</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping Charges</Text>
            <Text style={styles.free}>FREE</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹2296.7</Text>
          </View>

          <View style={styles.savingBox}>
            <Text style={styles.savingText}>
              Hooray! You are saving{' '}
              <Text style={styles.highlight}>₹1049/-</Text> with this order!
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentText}>Payment Method</Text>
          <Text style={styles.paymentMode}>UPI</Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>CONTINUE To PAYMENT</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              This is a one-time message before proceeding.
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginTop:20,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  stepActive: {
    color: '#f37022',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepInactive: {
    color: '#ccc',
    fontSize: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  deliverToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  deliverToText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  deliverToDetails: {
    flex: 1,
  },
  deliverToName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  deliverToAddress: {
    fontSize: 12,
    color: '#666',
  },
  changeButton: {
    backgroundColor: '#f37022',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  changeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addAddressBtn: {
    backgroundColor: '#f37022',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 16,
  },
  addAddressText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff5f0',
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#333',
  },
  value: {
    color: '#000',
  },
  strike: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  discount: {
    color: '#f37022',
  },
  free: {
    color: 'green',
    fontWeight: '600',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  savingBox: {
    backgroundColor: '#fbeee6',
    padding: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  savingText: {
    fontSize: 12,
    color: '#333',
  },
  highlight: {
    color: '#f37022',
    fontWeight: 'bold',
  },
  paymentMethod: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
  },
  paymentText: {
    fontWeight: '500',
  },
  paymentMode: {
    fontWeight: '600',
  },
  continueBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#444',
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: '#f37022',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});