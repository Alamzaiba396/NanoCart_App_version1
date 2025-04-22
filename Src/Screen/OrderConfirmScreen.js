import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import PartnerOrderHistoryScreen from './PartnerOrderHistoryScreen'; // Corrected typo

const {width} = Dimensions.get('window');

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const backIcon = require('../assets/Images/Backward.png');

  const orders = [
    {
      id: '#14569878',
      name: 'MAAHI Winter Hoodie',
      image: require('../assets/Images/card2.png'),
      status: 'Confirmed',
      date: '20th Feb, 1:24 pm',
    },
    {
      id: '#14569878',
      name: "MAAHI Popular: Georgette Saree - Women's Party Wear",
      image: require('../assets/Images/card2.png'),
      status: 'Confirmed',
      date: '20th Feb, 1:24 pm',
    },
  ];

  const suggestions = [
    {
      image: require('../assets/Images/card2.png'),
    },
    {
      image: require('../assets/Images/card3.png'),
    },
    {
      image: require('../assets/Images/card2.png'),
    },
    {
      image: require('../assets/Images/card3.png'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ORDER CONFIRMATION</Text>
      </View>

      {/* Confirmation Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.message}>Thank you for your order!</Text>
        <Text style={styles.subMessage}>
          We've received your order and will contact you as soon as your
          purchase is shipped. You can find your purchase information below.
        </Text>
      </View>

      <View style={styles.orderIdContainer}>
        <Text>
          <Text style={styles.orderId}>Order ID:</Text> {orders[0].id}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PartnerOrderHistory')}>
          {' '}
          {/* Corrected typo */}
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Order Details */}
      {orders.map((order, index) => (
        <View key={index} style={styles.orderCard}>
          <Image source={order.image} style={styles.orderImage} />
          <View style={styles.orderInfo}>
            <Text style={styles.orderName}>{order.name}</Text>
            <Text style={styles.orderDate}>Placed on {order.date}</Text>
            <Text>
              <Text style={styles.orderStatus}>•</Text> {order.status}
            </Text>{' '}
          </View>
        </View>
      ))}

      {/* View Orders Button */}
      <TouchableOpacity style={styles.viewOrdersButton}>
        <Text style={styles.viewOrdersText}>VIEW ORDERS</Text>
      </TouchableOpacity>

      {/* Suggestions Section */}
      <View style={styles.suggestionSection}>
        <Text style={styles.suggestionTitle}>You might also like</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionContainer}>
          {suggestions.map((item, index) => (
            <View key={index} style={styles.suggestionCard}>
              <Image source={item.image} style={styles.suggestionImage} />
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>SHOP NOW</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 15,
    backgroundColor: '#D2691E1A',
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  orderCard: {
    flexDirection: 'row',
    padding: 10,
  },
  orderImage: {
    width: 120,
    height: 150,
    resizeMode: 'contain',
  },
  orderInfo: {
    marginHorizontal: 10,
    padding: 10,
    flex: 1,
  },
  orderIdContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 14,
    color: '#000',
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  orderStatus: {
    fontSize: 14,
    color: '#ff4444',
  },
  viewOrdersButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    alignItems: 'center',
    margin: 15,
    borderWidth: 1,
    borderColor: '#ff6200',
  },
  viewOrdersText: {
    color: '#ff6200',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionSection: {
    padding: 15,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  suggestionContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingRight: 10,
  },
  suggestionCard: {
    width: (2 * width) / 3,
    height: 350,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    marginRight: 10,
  },
  suggestionImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  shopNowButton: {
    position: 'absolute',
    bottom: 30,
    left: 70,
    right: 70,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  shopNowText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OrderConfirmationScreen;
