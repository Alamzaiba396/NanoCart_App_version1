import React from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const orders = [
  {
    id: '1',
    orderId: '#134589785',
    name: 'MAAHI Winter Hoodie',
    category: 'Unisex Collections',
    date: 'Placed on 20th Feb, 11:24 pm',
    status: 'Confirmed',
    image: require('../../assets/Images/Carosuel1.png'),
    button: 'Track Order',
    buttonColor: '#fff',
    borderColor: '#D6722F',
    textColor: '#D6722F',
  },
  {
    id: '2',
    orderId: '#143658785',
    name: 'MAAHI Popular: Georgette Saree',
    category: 'Women\'s Party Wear',
    date: 'Placed on 20th Feb, 11:24 pm',
    status: 'Confirmed',
    image: require('../../assets/Images/Carosuel1.png'),
    button: 'Track Order',
    buttonColor: '#fff',
    borderColor: '#D6722F',
    textColor: '#D6722F',
  },
  {
    id: '3',
    orderId: '#177008785',
    name: 'MAAHI Sweat Shirt',
    category: 'Winter Collections',
    date: 'Placed on 17th Feb, 10:01 am',
    status: 'Dispatched',
    image: require('../../assets/Images/Carosuel1.png'),
    button: 'Track Order',
    buttonColor: '#fff',
    borderColor: '#D6722F',
    textColor: '#D6722F',
  },
  {
    id: '4',
    orderId: '#134321789',
    name: 'MAAHI Kurta Set',
    category: 'Unisex Collections',
    date: 'Placed on 2nd Feb, 03:07 pm',
    status: 'Cancelled',
    image: require('../../assets/Images/Carosuel1.png'),
    button: 'Order Cancelled',
    buttonColor: '#F7EDEB',
    borderColor: '#E86363',
    textColor: '#E86363',
  },
  {
    id: '5',
    orderId: '#114658680',
    name: 'MAAHI T-shirt',
    category: 'Active Wear Collections',
    date: 'Placed on 11th Dec 2024, 11:11 am',
    status: 'Delivered',
    image: require('../../assets/Images/Carosuel1.png'),
    button: 'Rate & Review',
    buttonColor: '#F7EDEB',
    borderColor: '#D6722F',
    textColor: '#D6722F',
  },
  {
    id: '6',
    orderId: '#134589796',
    name: 'MAAHI T-shirt',
    category: 'Active Wear Collections',
    date: 'Placed on 1st Aug 2024, 04:58 pm',
    status: 'Delivered',
    image: require('../../assets/Images/Carosuel1.png'),
    button: '',
    buttonColor: '',
    borderColor: '',
    textColor: '',
  },
];

const OrderHistoryScreen = () => {
  const navigation = useNavigation(); 
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <View style={styles.row}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={[styles.status, item.status === 'Cancelled' && { color: '#E86363' }]}>
            ● {item.status}
          </Text>
        </View>
      </View>
      {item.button !== '' && (
  <TouchableOpacity
    style={[
      styles.button,
      {
        backgroundColor: item.buttonColor,
        borderColor: item.borderColor,
      },
    ]}
    onPress={() => {
      if (item.button === 'Track Order') {
        navigation.navigate('TrackOrder');
      } else if (item.button === 'Rate & Review') {
        navigation.navigate('RateProduct');
      } else if (item.button === 'Order Cancelled') {
        navigation.navigate('CancelOrder'); // ✅ Added navigation to CancelOrder screen
      }
    }}
  >
    <Text style={[styles.buttonText, { color: item.textColor }]}>{item.button}</Text>
  </TouchableOpacity>
)}

    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>ORDER HISTORY</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#666',
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  status: {
    fontSize: 12,
    color: 'green',
    marginTop: 2,
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default OrderHistoryScreen;
