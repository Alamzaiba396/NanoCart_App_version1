import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure this package is installed

const SubCategoryItem = ({item, navigation, itemId, authToken}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleContinuePress = () => {
    if (authToken) {
      navigation.navigate('Delivery');
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleLoginPress = () => {
    closeModal();
    navigation.navigate('Login'); // Update if your login screen has a different name
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('ProductDetail', {itemId: item.itemId});
      }}>
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.heartIcon} onPress={handleContinuePress}>
        <Image
          source={require('../assets/Images/Heart.png')}
          style={{width: 18, height: 18}}
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Uh-oh!</Text>
                <Text style={styles.modalMessage}>
                  Looks like you haven't logged in!
                </Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleLoginPress}>
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

      <Text numberOfLines={1} style={styles.title}>
        {item.name}
      </Text>
      <Text style={styles.subtitle}>Women's Party Wear</Text>
      <View style={styles.priceRow}>
        <Text style={styles.mrp}>MRP ₹{item.mrp}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.discount}>{item.discount}% Off</Text>
      </View>
      <View style={styles.ratingRow}>
        <Text style={styles.stars}>⭐ {item.rating}</Text>
        <Text style={styles.reviews}>{item.reviews}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // same styles as before...
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
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: '1.5%',
    padding: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 6,
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 13,
  },
  subtitle: {
    fontSize: 11,
    color: '#888',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  mrp: {
    fontSize: 11,
    textDecorationLine: 'line-through',
    marginRight: 4,
    color: '#888',
  },
  price: {
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 13,
  },
  discount: {
    fontSize: 11,
    color: 'orange',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stars: {
    fontSize: 12,
    color: '#f39c12',
    marginRight: 6,
  },
  reviews: {
    fontSize: 11,
    color: '#777',
  },
});

export default SubCategoryItem;
