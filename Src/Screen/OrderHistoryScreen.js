import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const backIcon = require('../assets/Images/Backward.png');

  const orders = [
    {
      id: '#13459876-1', // Unique Order ID for each product
      name: 'MAAHI Winter Hoodie',
      subtitle: 'Unisex Collections',
      image: require('../assets/Images/card2.png'),
      status: 'Confirmed',
      date: '20th Feb, 11:24 pm',
    },
    {
      id: '#13459876-2', // Unique Order ID for each product
      name: 'MAAHI Popular: Georgette Saree',
      subtitle: "Women's Party Wear",
      image: require('../assets/Images/card2.png'),
      status: 'Confirmed',
      date: '20th Feb, 11:24 pm',
    },
    {
      id: '#13459876-1', // Unique Order ID for each product
      name: 'MAAHI Winter Hoodie',
      subtitle: 'Unisex Collections',
      image: require('../assets/Images/card2.png'),
      status: 'Delivered',
      date: '20th Feb, 11:24 pm',
    },
    {
      id: '#13459876-2', // Unique Order ID for each product
      name: 'MAAHI Popular: Georgette Saree',
      subtitle: "Women's Party Wear",
      image: require('../assets/Images/card2.png'),
      status: 'Delivered',
      date: '20th Feb, 11:24 pm',
    },
    {
      id: '#13459876-1', // Unique Order ID for each product
      name: 'MAAHI Winter Hoodie',
      subtitle: 'Unisex Collections',
      image: require('../assets/Images/card2.png'),
      status: 'Cancelled',
      date: '20th Feb, 11:24 pm',
    },
    {
      id: '#13459876-2', // Unique Order ID for each product
      name: 'MAAHI Popular: Georgette Saree',
      subtitle: "Women's Party Wear",
      image: require('../assets/Images/card2.png'),
      status: 'Cancelled',
      date: '20th Feb, 11:24 pm',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ORDER HISTORY</Text>
      </View>
      {orders.map((order, index) => (
        <View key={index}>
          <View style={styles.orderIdContainer}>
            <Text>
              <Text style={styles.orderId}>Order ID:</Text> {order.id}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderTrackingScreen')}>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.orderCard}>
            <Image source={order.image} style={styles.orderImage} />
            <View style={styles.orderInfo}>
              <Text style={styles.orderName}>{order.name}</Text>
              <Text style={styles.orderSubtitle}>{order.subtitle}</Text>
              <Text style={styles.orderDate}>Placed on {order.date}</Text>
              <Text style={styles.orderStatus}>
                <Text>
                  <Text style={styles.orderStatus}>•</Text> {order.status}
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.trackOrderButton}>
            <Text style={styles.trackOrderText}>TRACK ORDER</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderHistoryScreen;

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
  orderIdContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 14,
    color: '#000',
  },
  orderCard: {
    flexDirection: 'row',
    padding: 5,
  },
  orderImage: {
    width: 150,
    height: 180,
    resizeMode: 'contain',
    marginRight: 5,
  },
  orderInfo: {
    flex: 1,
    padding: 10,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  orderSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: '#ff4444',
  },
  bullet: {
    marginRight: 5,
  },
  trackOrderButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ff6200',
  },
  trackOrderText: {
    color: '#ff6200',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
