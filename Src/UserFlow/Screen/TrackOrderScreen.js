import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

const TrackOrderScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ORDER HISTORY</Text>
      </View>

      {/* Order Confirmation */}
      <View style={styles.section}>
        <Text style={styles.statusTitle}>✅ Order Confirmed</Text>
        <Text style={styles.statusDesc}>
          Under Processing. Your order is confirmed & is being processed by our internal team.
        </Text>
        <Text style={styles.orderId}>Order ID: #134589785</Text>
      </View>

      {/* Order Details */}
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>Order Details</Text>
        <View style={styles.orderCard}>
          <Image
            source={require('../../assets/Images/Carosuel1.png')}
            style={styles.productImg}
          />
          <View style={styles.productInfo}>
            <Text style={styles.name}>MAAHI Winter Hoodie</Text>
            <Text style={styles.detail}>Unisex Collections</Text>
            <Text style={styles.detail}>Size: M   Color: —   Qty: 1</Text>
            <Text style={styles.price}>
              MRP <Text style={styles.strike}>₹1499.00</Text> <Text style={styles.bold}>₹1100.00</Text>
            </Text>
            <Text style={styles.placed}>Placed on 20th Feb, 11:24 pm</Text>
          </View>
        </View>
      </View>

      {/* Other Items */}
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>Other items in this order</Text>
        <View style={styles.otherItem}>
          <Image
            source={require('../../assets/Images/Carosuel1.png')}
            style={styles.otherImg}
          />
          <Text style={styles.otherName}>MAAHI Popular: Georgette Saree</Text>
        </View>
      </View>

      {/* Help / Invoice */}
      <View style={styles.section}>
        <Text style={styles.helpText}>Need help with this order? <Text style={styles.link}>Whatsapp Us</Text></Text>
        <TouchableOpacity>
          <Text style={styles.download}>Download Invoice ⬇️</Text>
        </TouchableOpacity>
      </View>

      {/* Order Status */}
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>Order Status</Text>
        <Text style={styles.stepDone}>🟧 Confirmed (Feb 22, 11:24 pm)</Text>
        <Text style={styles.stepDisabled}>⬜ Out for delivery</Text>
        <Text style={styles.stepDisabled}>⬜ Delivered</Text>
      </View>

      <TouchableOpacity style={styles.orderAgain}>
        <Text style={styles.orderAgainText}>ORDER AGAIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.cancelOrder}>CANCEL ORDER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ReturnExchange')}>
        <Text style={styles.cancelOrder}>RETURN/EXCHANGE ORDER</Text>
      </TouchableOpacity>

      {/* Delivery Address */}
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>Delivery Address</Text>
        <Text style={styles.address}>
          Anuradha Sharma{"\n"}
          Flat-A/101, Kalyani Enclaves, Near Sardar Lake, 3rd Cross,{"\n"}
          Patel Layout, Gandhi Nagar, Gujarat, 754025
        </Text>
      </View>

      {/* Bill Summary */}
      <View style={styles.subSection}>
        <Text style={styles.subTitle}>Total Bill Summary (2 items)</Text>
        <View style={styles.billRow}><Text>Cart Total</Text><Text>₹3049</Text></View>
        <View style={styles.billRow}><Text>Discounted Price</Text><Text>₹2200</Text></View>
        <View style={styles.billRow}><Text>Coupon Discount</Text><Text>₹200</Text></View>
        <View style={styles.billRow}><Text>COD Charges</Text><Text>₹50</Text></View>
        <View style={styles.billRow}><Text>GST</Text><Text>₹296.7</Text></View>
        <View style={styles.billRow}><Text>Shipping Charges</Text><Text style={{ color: 'green' }}>FREE</Text></View>
        <View style={[styles.billRow, { marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold' }}>Total Amount</Text>
          <Text style={{ fontWeight: 'bold' }}>₹2296.7</Text>
        </View>
        <Text style={styles.savings}>Hooray! You are saving ₹1049/- with this order!</Text>
      </View>

      {/* Payment */}
      <View style={styles.section}>
        <Text style={styles.payment}>Payment Method: <Text style={styles.bold}>UPI</Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1, padding: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  back: { fontSize: 20, marginRight: 8 },
  headerTitle: { fontWeight: 'bold', fontSize: 16 },
  section: { padding: 10, backgroundColor: '#FAF2EE', borderRadius: 6, marginBottom: 12 },
  subSection: { marginBottom: 16 },
  subTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  statusTitle: { fontWeight: 'bold', color: '#D6722F' },
  statusDesc: { fontSize: 12, marginTop: 4 },
  orderId: { fontSize: 12, marginTop: 6, color: '#333' },
  orderCard: { flexDirection: 'row', backgroundColor: '#fff' },
  productImg: { width: 90, height: 90, borderRadius: 6 },
  productInfo: { marginLeft: 10, flex: 1 },
  name: { fontWeight: 'bold', fontSize: 14 },
  detail: { fontSize: 12, color: '#555' },
  price: { fontSize: 12, marginTop: 4 },
  strike: { textDecorationLine: 'line-through', color: '#999' },
  bold: { fontWeight: 'bold' },
  placed: { fontSize: 11, color: '#999', marginTop: 4 },
  otherItem: { flexDirection: 'row', alignItems: 'center' },
  otherImg: { width: 50, height: 60, marginRight: 10, borderRadius: 4 },
  otherName: { fontSize: 12, color: '#444' },
  helpText: { fontSize: 12 },
  link: { color: '#D6722F', fontWeight: 'bold' },
  download: { color: '#D6722F', fontSize: 12, marginTop: 8 },
  stepDone: { fontSize: 13, color: '#D6722F', marginBottom: 6 },
  stepDisabled: { fontSize: 13, color: '#999', marginBottom: 6 },
  orderAgain: {
    backgroundColor: '#D6722F',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  orderAgainText: { color: '#fff', fontWeight: 'bold' },
  cancelOrder: { textAlign: 'center', color: '#E86363', fontWeight: 'bold', marginBottom: 20 },
  address: { fontSize: 12, color: '#555', marginTop: 4 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  savings: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  payment: { fontSize: 13 },
});

export default TrackOrderScreen;
