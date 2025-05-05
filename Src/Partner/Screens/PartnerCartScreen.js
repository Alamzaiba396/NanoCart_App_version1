import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const PartnerCartScreen = () => {
  const sampleColors = ['green', 'maroon', 'black', 'navy', 'goldenrod'];
  const sizes = [
    { label: 'S', qty: 15 },
    { label: 'M', qty: 25 },
    { label: 'L', qty: 30 },
    { label: 'XL', qty: 20 },
    { label: '2XL', qty: 20 },
    { label: '3XL', qty: 10 },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.cartCard}>
        {/* Product Header */}
        <View style={styles.productHeader}>
          <Image
            source={require('../../assets/Images/Carosuel1.png')}
            style={styles.productImageLarge}
          />
          <View style={styles.productInfoHeader}>
            <Text style={styles.productTitle}>MAAHI Winter Hoodie</Text>
            <Text style={styles.productDesc}>Unisex Collections</Text>
            <Text style={styles.strikePrice}>MRP ₹150.00 <Text style={styles.actualPrice}>₹100.00</Text></Text>
          </View>
        </View>

        {/* Check Order Details */}
        <Text style={styles.checkOrderTitle}>Check Order Details</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginVertical: 10 }}>
          {sampleColors.map((color, i) => (
            <View key={i} style={[styles.colorBlock, { backgroundColor: color }]} />
          ))}
        </ScrollView>

        {/* Size Qty Grid */}
        {sizes.map((item, idx) => (
          <View key={idx} style={styles.sizeRow}>
            <Text style={styles.sizeLabel}>{item.label}</Text>
            <View style={styles.qtyControls}>
              <TouchableOpacity style={styles.qtyBtn}>
                <Entypo name="chevron-down" size={14} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{item.qty}</Text>
              <TouchableOpacity style={styles.qtyBtn}>
                <Entypo name="chevron-up" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Quantity + Pricing Summary */}
        <Text style={styles.totalLine}>Qty. per Color: <Text style={styles.totalBold}>120</Text></Text>
        <View style={styles.priceSummary}>
          <Text>Total Qty. <Text style={styles.totalBold}>120</Text></Text>
          <Text>Price / Pcs <Text style={styles.totalBold}>₹100</Text></Text>
          <Text>Total Price <Text style={styles.totalBold}>₹12,000</Text></Text>
        </View>

        {/* Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.wishlistBtn}>
            <Text style={styles.actionText}>MOVE TO WISHLIST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeBtn}>
            <Text style={styles.actionText}>REMOVE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PartnerCartScreen;

const styles = StyleSheet.create({
  cartCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageLarge: {
    width: 60,
    height: 80,
    borderRadius: 4,
  },
  productInfoHeader: {
    marginLeft: 10,
    flex: 1,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productDesc: {
    fontSize: 12,
    color: '#555',
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  actualPrice: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
  },
  checkOrderTitle: {
    fontWeight: 'bold',
    marginTop: 14,
  },
  colorBlock: {
    width: 30,
    height: 20,
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#f37022',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  qtyNumber: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalLine: {
    marginTop: 10,
    textAlign: 'right',
  },
  totalBold: {
    fontWeight: 'bold',
  },
  priceSummary: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  wishlistBtn: {
    borderColor: '#D6722F',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 6,
  },
  removeBtn: {
    borderColor: '#D6722F',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 6,
  },
  actionText: {
    color: '#D6722F',
    fontWeight: 'bold',
    fontSize: 13,
  },
  continueBtn: {
    backgroundColor: '#f37022',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
