import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet,
  Modal, TouchableWithoutFeedback
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/reducers/cartSlice';
import Header from '../Component/Header';

const backIcon = require('../../assets/Images/Back.png');
const cartIcon = require('../../assets/Images/CartIcon.png');

const CartScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authToken = useSelector(state => state.auth.token);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // ✅ total quantity

  useEffect(() => {
    if (authToken) {
      fetchCartItems();
    }
  }, [authToken]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://10.0.2.2:4000/api/usercart', {
        method: 'GET',
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setCartItems(data.data.items));
      } else {
        console.error('❌ Error fetching cart:', data.message);
      }
    } catch (error) {
      console.error('🔥 Error in fetchCartItems:', error);
    }
  };

  const handleRemoveItem = async (cartItem) => {
    try {
      const payload = {
        itemId: cartItem.itemId._id,
        quantity: cartItem.quantity,
        size: cartItem.size,
        color: cartItem.color,
        skuId: cartItem.skuId,
      };
      const response = await fetch('http://10.0.2.2:4000/api/usercart/removeitem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        fetchCartItems();
      } else {
        console.error('❌ Failed to remove item:', data.message);
      }
    } catch (error) {
      console.error('🔥 Error removing item:', error);
    }
  };

  const handleUpdateQuantity = async (cartItem, actionType) => {
    try {
      const payload = {
        itemId: cartItem.itemId._id,
        size: cartItem.size,
        color: cartItem.color,
        skuId: cartItem.skuId,
        action: actionType,
      };
      const response = await fetch('http://10.0.2.2:4000/api/usercart/update-quantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        fetchCartItems();
      } else {
        console.error('❌ Failed to update quantity:', data.message);
      }
    } catch (error) {
      console.error('🔥 Error updating quantity:', error);
    }
  };

  const handleContinuePress = () => {
    if (authToken) {
      navigation.navigate('Delivery');
    } else {
      setIsModalVisible(true);
    }
  };

  const handleMoveToWishlist = async (cartItem) => {
    try {
      const payload = {
        itemId: cartItem.itemId._id,
        color: cartItem.color,
      };
      const response = await fetch('http://10.0.2.2:4000/api/userwishlist/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        await handleRemoveItem(cartItem);
        navigation.navigate('Wishlist');
      } else {
        console.error(' Failed to move to wishlist:', data.message);
      }
    } catch (error) {
      console.error(' Error moving to wishlist:', error);
    }
  };

  const cartTotalMRP = cartItems.reduce((total, item) => total + (1499 * item.quantity), 0);
  const discountedTotal = cartItems.reduce((total, item) => total + (1100 * item.quantity), 0);
  const couponDiscount = 200;
  const gstAmount = (discountedTotal * 0.135).toFixed(1);


  const [invoiceData, setInvoiceData] = useState({
    gst: '0%',
    coupon_discount: '₹0',
    shipping_charge: '₹0',
    total_amount: '₹0',
  });
  
  useEffect(() => {
    fetchInvoiceData();
  }, []);
  
  const fetchInvoiceData = async () => {
    try {
      const res = await fetch('http://10.0.2.2:4000/api/invoice');
      const json = await res.json();
  
      if (res.ok && json.success) {
        const invoice = json.data[0].invoice;
        const getValue = (key) =>
          invoice.find((item) => item.key === key)?.values || '₹0';
  
        setInvoiceData({
          gst: getValue('gst'),
          coupon_discount: getValue('coupon_discount'),
          shipping_charge: getValue('shipping_charge'),
          total_amount: getValue('total_amount'),
        });
      } else {
        console.warn('❌ Failed to fetch invoice:', json.message);
      }
    } catch (err) {
      console.error('🔥 Error fetching invoice:', err.message);
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
       <View style={styles.header}>
             <View style={styles.headerLeft}>
               <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                 <Image source={require('../../assets/Images/Back.png')} style={styles.backIcon} />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>Cart</Text>
             </View>
     
             <View style={styles.rightIcons}>
               <TouchableOpacity>
                 <Image source={require('../../assets/Images/SearchIcon.png')} style={styles.icon} />
               </TouchableOpacity>
     
               <TouchableOpacity
                 style={styles.cartIconWrapper}
                 onPress={() => {
                   if (token) {
                     navigation.navigate('Cart');
                   } else {
                     setShowLoginModal(true);
                   }
                 }}
               >
                 <Image source={require('../../assets/Images/Cart.png')} style={styles.icon} />
                 {cartCount > 0 && (
                   <View style={styles.cartBadge}>
                     <Text style={styles.cartBadgeText}>{cartCount}</Text>
                   </View>
                 )}
               </TouchableOpacity>
             </View>
           </View>

        {/* Progress bar */}
        <View style={styles.progress}>
          <Text style={styles.activeStep}>● CART DETAILS</Text>
          <Text style={styles.progressLine}>─────</Text>
          <Text style={styles.inactiveStep}>● ADDRESS</Text>
          <Text style={styles.progressLine}>─────</Text>
          <Text style={styles.inactiveStep}>● PAYMENT</Text>
        </View>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No items in cart.</Text>
        ) : (
          cartItems.map((cartItem, index) => (
            <View key={index} style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: cartItem.images?.[0]?.url || cartItem.itemId?.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{cartItem.itemId?.name}</Text>
                  <Text style={styles.productDesc}>{cartItem.itemId?.description}</Text>
                  <Text style={styles.sizeColorText}>Size: {cartItem.size}</Text>

                  {/* Quantity Section */}
                  <View style={styles.qtyRow}>
                    <Text>Qty:</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => handleUpdateQuantity(cartItem, 'decrease')}>
                      <Entypo name="chevron-down" size={14} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.qtyNumber}>{cartItem.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => handleUpdateQuantity(cartItem, 'increase')}>
                      <Entypo name="chevron-up" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.strikePrice}>MRP ₹1499.00</Text>
                  <Text style={styles.actualPrice}>₹1100.00</Text>
                </View>
              </View>

              {/* Move to wishlist and Remove */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleMoveToWishlist(cartItem)}>
                  <Text style={styles.actionText}>MOVE TO WISHLIST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleRemoveItem(cartItem)}>
                  <Text style={styles.actionText}>REMOVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Apply Coupon */}
        <TouchableOpacity style={styles.couponBar}>
          <Text>Apply Coupon</Text>
          <Entypo name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>

        {/* Price Details */}
        <View style={styles.priceCard}>
  <Text style={styles.priceTitle}>Price Details ({cartItems.length} items)</Text>
  <View style={styles.priceRow}>
    <Text>Cart Total</Text>
    <Text>₹{cartTotalMRP}</Text>
  </View>
  <View style={styles.priceRow}>
    <Text>Discounted Price</Text>
    <Text>₹{discountedTotal}</Text>
  </View>
  <View style={styles.priceRow}>
    <Text style={styles.orange}>Coupon Discount</Text>
    <Text style={styles.orange}>- {invoiceData.coupon_discount}</Text>
  </View>
  <View style={styles.priceRow}>
    <Text>GST</Text>
    <Text>{invoiceData.gst}</Text>
  </View>
  <View style={styles.priceRow}>
    <Text>Shipping Charges</Text>
    <Text>{invoiceData.shipping_charge}</Text>
  </View>
  <View style={[styles.priceRow, { borderTopWidth: 1, paddingTop: 8, marginTop: 6, borderColor: '#ddd' }]}>
    <Text style={{ fontWeight: 'bold' }}>Total Payable</Text>
    <Text style={{ fontWeight: 'bold' }}>{invoiceData.total_amount}</Text>
  </View>
</View>


        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinuePress}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>

        {/* Payment Method */}
        <Text style={styles.paymentRow}>Payment Method <Text style={{ fontWeight: 'bold' }}>UPI</Text></Text>

      </ScrollView>
    </View>
  );
};

export default CartScreen;


const styles = StyleSheet.create({
  icon: { width: 20, height: 20, resizeMode: 'contain' },
  header: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  progress: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  activeStep: { fontWeight: 'bold', color: '#F36F25' },
  inactiveStep: { color: '#ccc' },
  progressLine: { color: '#ccc', marginHorizontal: 4 },
  card: { backgroundColor: '#fff', padding: 15, marginVertical: 8 },
  productImage: { width: 80, height: 100, borderRadius: 8 },
  productInfo: { marginLeft: 10, flex: 1 },
  productTitle: { fontWeight: 'bold', fontSize: 14 },
  productDesc: { fontSize: 12, color: '#777', marginVertical: 4 },
  sizeColorText: { fontSize: 12, color: '#333', marginBottom: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  qtyBtn: {
    backgroundColor: '#f37022',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  qtyNumber: { fontSize: 14, fontWeight: 'bold' },
  strikePrice: { textDecorationLine: 'line-through', color: '#888', marginTop: 6, fontSize: 12 },
  actualPrice: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  actionRow: { flexDirection: 'row', marginTop: 8 },
  actionBtn: {
    flex: 1,
    borderColor: '#f37022',
    borderWidth: 1,
    paddingVertical: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: { color: '#f37022', fontSize: 12, fontWeight: 'bold' },
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
    padding: 12,
    backgroundColor: '#FFF8F5',
    borderRadius: 8,
  },
  priceTitle: { fontWeight: 'bold', marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  orange: { color: '#f37022', fontWeight: 'bold' },
  continueBtn: {
    backgroundColor: '#f37022',
    padding: 15,
    margin: 15,
    borderRadius: 5,
  },
  continueText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  paymentRow: { textAlign: 'center', marginVertical: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' },
  closeIcon: { position: 'absolute', top: 10, right: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  modalMessage: { fontSize: 16, textAlign: 'center', marginVertical: 15 },
  modalButton: { backgroundColor: '#f37022', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 5, marginVertical: 10 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
  modalHelpText: { color: '#888', fontSize: 13, marginTop: 5 },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#F36F25',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  header: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 32,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', textTransform: 'uppercase' },
  rightIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 22, height: 22, resizeMode: 'contain', marginHorizontal: 8 },
  cartIconWrapper: { position: 'relative' },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});