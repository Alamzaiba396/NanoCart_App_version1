import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SuggestionCard = ({
  title,
  productImage,
  productName,
  productDesc,
  price,
  oldPrice,
  discount,
  rating,
  reviews,
  sizes,
  colors,
  buttonLabel,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.card}>
        <Image source={productImage} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.name}>{productName}</Text>
          <Text style={styles.desc}>{productDesc}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.oldPrice}>₹{oldPrice}</Text>
            <Text style={styles.discount}>Flat {discount}% Off</Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Icon name="star" size={10} color="#fff" />
              <Text style={styles.ratingText}> {rating}</Text>
            </View>
            <Text style={styles.review}>{reviews}</Text>
          </View>

          <Text style={styles.sizeText}>Available in {sizes.join(', ')}</Text>

          <View style={styles.colorRow}>
            {colors.map((color, index) => (
              <View
                key={index}
                style={[styles.colorDot, { backgroundColor: color }]}
              />
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    
    padding: 10,
  },
  image: {
    width: 100,
    height: 130,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 14,
  },
  desc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  discount: {
    color: '#DB4E2D',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingBox: {
    flexDirection: 'row',
    backgroundColor: '#DB4E2D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  review: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  sizeText: {
    fontSize: 12,
    marginVertical: 2,
  },
  colorRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    borderWidth: 1,
    borderColor: '#DB4E2D',
    paddingVertical: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#DB4E2D',
    fontWeight: '600',
  },
});

export default SuggestionCard;
