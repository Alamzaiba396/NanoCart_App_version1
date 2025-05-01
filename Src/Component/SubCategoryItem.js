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
import {useSelector} from 'react-redux';

const SubCategoryItem = ({item, navigation}) => {
  const token = useSelector(state => state.auth.token);

  const [showModal, setShowModal] = useState(false);

  const handleHeartPress = () => {
    console.log(' Heart icon pressed.');
    console.log(' Current token value:', token);

    if (!item || !item.itemId) {
      console.warn(' Item or itemId is undefined!', item);
    } else {
      console.log(' Item ID:', item.itemId);
    }

    if (!token) {
      console.log(' No token found. Navigating to Login screen...');
      navigation.navigate('Login', {
        fromScreen: 'SubCategoryScreen',
        actionAfterLogin: 'like_item',
        itemId: item?.itemId,
      });
    } else {
      console.log(' Token found. Proceeding to add to wishlist...');
      console.log(' Added to wishlist:', item.itemId);
      // API call or Redux action to add to wishlist goes here
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    setShowModal(false);
    navigation.navigate('Login', {fromScreen: 'SubCategoryItem'});
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={
          () => navigation.navigate('ProductDetail', {itemId: item.itemId})
          // navigation.navigate('PartnerCatalogue', {itemId: item.itemId})
        }>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity style={styles.heartIcon} onPress={handleHeartPress}>
          <Image
            source={require('../assets/Images/Heart.png')}
            style={{width: 18, height: 18}}
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
        <Text style={styles.subtitle}>{item.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.mrp}>MRP ₹{item.mrp}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
          {/* <Text style={styles.discount}>{item.discount}% Off</Text> */}
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>⭐ {item.rating}</Text>
          <Text style={styles.reviews}>{item.reviews}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for "Uh-oh" */}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Uh-oh!</Text>
                <Text style={styles.modalText}>
                  Looks like you haven't logged in!
                </Text>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>LOGIN TO CONTINUE</Text>
                </TouchableOpacity>

                <Text style={styles.helperText}>
                  Having trouble logging in?{' '}
                  <Text style={styles.helperLink}>Whatsapp Us</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#D86427',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  helperText: {
    fontSize: 12,
    color: '#555',
  },
  helperLink: {
    color: '#D86427',
    fontWeight: '600',
  },
});

export default SubCategoryItem;
