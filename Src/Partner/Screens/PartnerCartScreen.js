import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PartnerHeader from '../Components/PartnerHeader';
import { useSelector } from 'react-redux';

const PartnerCartScreen = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [couponAccordionOpen, setCouponAccordionOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [walletAmount, setWalletAmount] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colorHexMap, setColorHexMap] = useState({});
  const [invoiceData, setInvoiceData] = useState([]); // State for invoice data
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://10.0.2.2:4000/api/partner/cart', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setCartItems(data.data.items);

          const hexMap = {};
          for (const item of data.data.items) {
            const res = await fetch(`http://10.0.2.2:4000/api/itemDetails/${item.itemId._id}`);
            const json = await res.json();
            if (json.colors && json.colors.length > 0) {
              json.colors.forEach(colorObj => {
                hexMap[colorObj.color] = colorObj.hexCode;
              });
            }
          }
          setColorHexMap(hexMap);
        } else {
          console.error('Failed to fetch cart items:', data.message);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchInvoiceData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:4000/api/invoice', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setInvoiceData(data.data[0]?.invoice || []);
        } else {
          console.error('Failed to fetch invoice data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchCartItems(), fetchInvoiceData()]);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const calculateTotalQty = (orderDetails) =>
    orderDetails.reduce(
      (total, colorObj) =>
        total + colorObj.sizeAndQuantity.reduce((sum, s) => sum + s.quantity, 0),
      0
    );

  const calculateTotalPrice = (orderDetails, price) =>
    calculateTotalQty(orderDetails) * price;

  const handleQuantityChange = async (itemId, color, size, newQuantity) => {
    try {
      setCartItems(prevItems =>
        prevItems.map(item => {
          if (item.itemId._id === itemId) {
            const updatedOrderDetails = item.orderDetails.map(colorObj => {
              if (colorObj.color === color) {
                return {
                  ...colorObj,
                  sizeAndQuantity: colorObj.sizeAndQuantity.map(sizeObj => {
                    if (sizeObj.size === size) {
                      return { ...sizeObj, quantity: newQuantity };
                    }
                    return sizeObj;
                  }),
                };
              }
              return colorObj;
            });
            return { ...item, orderDetails: updatedOrderDetails };
          }
          return item;
        })
      );

      const payload = {
        itemId,
        orderDetails: cartItems
          .find(item => item.itemId._id === itemId)
          .orderDetails.map(colorObj => ({
            color: colorObj.color,
            sizeAndQuantity: colorObj.sizeAndQuantity.map(sizeObj => ({
              size: sizeObj.size,
              quantity: sizeObj.size === size && colorObj.color === color ? newQuantity : sizeObj.quantity,
              skuId: sizeObj.skuId,
            })),
          })),
      };

      const response = await fetch('http://10.0.2.2:4000/api/partner/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to update cart:', data.message);
        Alert.alert('Error', 'Failed to update the quantity.');
        setCartItems(prevItems =>
          prevItems.map(item => {
            if (item.itemId._id === itemId) {
              const revertedOrderDetails = item.orderDetails.map(colorObj => {
                if (colorObj.color === color) {
                  return {
                    ...colorObj,
                    sizeAndQuantity: colorObj.sizeAndQuantity.map(sizeObj => {
                      if (sizeObj.size === size) {
                        return { ...sizeObj, quantity: sizeObj.quantity };
                      }
                      return sizeObj;
                    }),
                  };
                }
                return colorObj;
              });
              return { ...item, orderDetails: revertedOrderDetails };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'An error occurred while updating the quantity.');
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      const payload = {
        itemId: item.itemId._id,
        orderDetails: item.orderDetails,
      };
      const response = await fetch('http://10.0.2.2:4000/api/partner/cart/removeitem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`Item removed: ${item.itemId.name}`);
        Alert.alert('Success', `${item.itemId.name} has been removed from the cart.`);
        setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem._id !== item._id));
      } else {
        console.error('Failed to remove item:', data.message);
        Alert.alert('Error', 'Failed to remove the item from the cart.');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'An error occurred while removing the item.');
    }
  };

  const handleMoveToWishlist = async (item) => {
    try {
      const payload = {
        itemId: item.itemId._id,
        color: item.orderDetails[0]?.color || 'default',
      };
      const response = await fetch('http://10.0.2.2:4000/api/partner/wishlist/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`Item moved to wishlist: ${item.itemId.name}`);
        Alert.alert('Success', `${item.itemId.name} has been moved to the wishlist.`);
        setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem._id !== item._id));
      } else {
        console.error('Failed to move item to wishlist:', data.message);
        Alert.alert('Error', 'Failed to move the item to the wishlist.');
      }
    } catch (error) {
      console.error('Error moving item to wishlist:', error);
      Alert.alert('Error', 'An error occurred while moving the item to the wishlist.');
    }
  };

  const handleContinue = () => {
    navigation.navigate('PartnerDelivery');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#666' }}>Your cart is empty.</Text>
      </View>
    );
  }

  // Calculate totals for Price Details
  const totalItems = cartItems.reduce((sum, item) => sum + calculateTotalQty(item.orderDetails), 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + calculateTotalPrice(item.orderDetails, item.itemId.discountedPrice),
    0
  );

  // Calculate adjustments from invoice data
  let adjustedTotal = totalPrice;
  invoiceData.forEach(item => {
    const value = parseFloat(item.values) || 0;
    if (item.key.toLowerCase().includes('discount')) {
      adjustedTotal -= value; // Subtract discounts
    } else {
      adjustedTotal += value; // Add charges (GST, shipping, COD, etc.)
    }
  });

  return (
    <View style={styles.container}>
      <PartnerHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Stepper */}
        <View style={styles.stepRow}>
          <Text style={styles.activeStep}>● CART DETAILS</Text>
          <Text style={styles.inactiveStep}>● ADDRESS</Text>
          <Text style={styles.inactiveStep}>● PAYMENT</Text>
        </View>

        {/* Cart Items */}
        {cartItems.map((item, index) => {
          const totalQty = calculateTotalQty(item.orderDetails);
          const totalPrice = calculateTotalPrice(item.orderDetails, item.itemId.discountedPrice);

          return (
            <View key={item._id} style={styles.card}>
              <View style={styles.row}>
                <Image source={{ uri: item.itemId.image }} style={styles.productImage} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.title}>{item.itemId.name}</Text>
                  <Text style={styles.category}>{item.itemId.description}</Text>
                  <Text style={styles.price}>
                    MRP <Text style={styles.mrp}>₹{item.itemId.MRP}</Text> ₹{item.itemId.discountedPrice.toFixed(2)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.accordionToggle}>
                <Text style={{ fontWeight: '600', fontSize: 15 }}>Check Order Details</Text>
                <Icon name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} size={18} />
              </TouchableOpacity>

              {expandedIndex === index && (
                <View style={styles.accordionSection}>
                  {item.orderDetails.map((colorObj, i) => (
                    <View key={i}>
                      <View style={styles.colorRow}>
                        <Text style={styles.colorLabel}>Color: {colorObj.color}</Text>
                        <View
                          style={[
                            styles.colorBox,
                            { backgroundColor: colorHexMap[colorObj.color] || '#ccc' },
                          ]}
                        />
                      </View>

                      {colorObj.sizeAndQuantity.map((sizeObj, j) => (
                        <View key={j} style={styles.sizeQtyRow}>
                          <Text style={styles.sizeLabel}>Size: {sizeObj.size}</Text>
                          <View style={styles.quantitySelector}>
                            <TouchableOpacity
                              onPress={() =>
                                handleQuantityChange(
                                  item.itemId._id,
                                  colorObj.color,
                                  sizeObj.size,
                                  Math.max(0, sizeObj.quantity - 1)
                                )
                              }
                            >
                              <Icon name="chevron-down" size={20} color="#d2691e" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{sizeObj.quantity}</Text>
                            <TouchableOpacity
                              onPress={() =>
                                handleQuantityChange(
                                  item.itemId._id,
                                  colorObj.color,
                                  sizeObj.size,
                                  sizeObj.quantity + 1
                                )
                              }
                            >
                              <Icon name="chevron-up" size={20} color="#d2691e" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}

                  <View style={styles.totalRow}>
                    <Text>Total Qty: {totalQty}</Text>
                    <Text>Price / Pcs: ₹{item.itemId.discountedPrice}</Text>
                    <Text>Total Price: ₹{totalPrice.toFixed(2)}</Text>
                  </View>
                </View>
              )}

              <View style={styles.cardActions}>
                <TouchableOpacity
                  onPress={() => handleMoveToWishlist(item)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>Move to Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.actionButton}>
                  <Text style={styles.actionText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* Apply Coupon Section */}
        <TouchableOpacity
          onPress={() => setCouponAccordionOpen(!couponAccordionOpen)}
          style={styles.accordionToggleFullWidth}
        >
          <Text style={styles.sectionTitle}>Apply Coupon</Text>
          <Icon name={couponAccordionOpen ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>

        {couponAccordionOpen && (
          <View style={styles.accordionFullWidth}>
            <View style={styles.row}>
              <TextInput
                placeholder="Enter your Coupon code"
                style={styles.input}
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={{ color: '#fff' }}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Wallet Section */}
        <View style={styles.accordionFullWidth}>
          <Text style={styles.sectionTitle}>Use Wallet</Text>
          <TextInput
            placeholder="₹"
            style={styles.input}
            keyboardType="numeric"
            value={walletAmount}
            onChangeText={setWalletAmount}
          />
          <Text style={styles.balanceText}>Available Balance (₹40000)</Text>
        </View>

        {/* Price Details Section */}
        <View style={styles.priceBoxFullWidth}>
          <Text style={styles.priceHeading}>Price Details</Text>
          <View style={styles.priceDetailRow}>
            <Text>Total Items</Text>
            <Text>{totalItems}</Text>
          </View>
          <View style={styles.priceDetailRow}>
            <Text>Total Price</Text>
            <Text>₹{totalPrice.toFixed(2)}</Text>
          </View>
          {invoiceData.map((item, index) => (
            <View key={index} style={styles.priceDetailRow}>
              <Text style={styles.capitalize}>{item.key}</Text>
              <Text style={item.key.toLowerCase().includes('discount') ? { color: '#28a745' } : {}}>
                {item.key.toLowerCase().includes('discount') ? '- ₹' : '₹'}
                {parseFloat(item.values).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={[styles.priceDetailRow, { borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: 8 }]}>
            <Text style={{ fontWeight: 'bold' }}>Grand Total</Text>
            <Text style={{ fontWeight: 'bold' }}>₹{adjustedTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text style={styles.paymentMethod}>
          Payment Method: <Text style={{ fontWeight: 'bold' }}>UPI</Text>
        </Text>
      </ScrollView>

      <TouchableOpacity onPress={handleContinue} style={styles.continueBtn}>
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  stepRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  activeStep: { color: '#D6722F', fontWeight: 'bold' },
  inactiveStep: { color: '#ccc' },
  card: {
    backgroundColor: '#fdf6f1',
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  category: { color: '#777', marginVertical: 4 },
  price: { fontSize: 16 },
  mrp: { textDecorationLine: 'line-through', color: '#888' },
  accordionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  accordionToggleFullWidth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  accordionSection: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
  },
  sizeQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#D6722F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  actionText: {
    color: '#D6722F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  accordionFullWidth: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 6,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
  },
  applyBtn: {
    backgroundColor: '#D6722F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  balanceText: {
    marginTop: 8,
    color: '#666',
  },
  priceBoxFullWidth: {
    backgroundColor: '#fff3e8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 0,
  },
  priceHeading: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  paymentMethod: {
    paddingHorizontal: 16,
    fontSize: 15,
    marginVertical: 8,
  },
  continueBtn: {
    backgroundColor: '#D6722F',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PartnerCartScreen;