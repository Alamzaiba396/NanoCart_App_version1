import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../Component/Header';
import AccordionItem from '../Component/AccordionItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../redux/reducers/wishlistSlice';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { itemId } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null); // Track selected color
  const [selectedSize, setSelectedSize] = useState(null);  // Track selected size

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:4000/api/itemDetails/${itemId}`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          const productData = json.data[0];
          setProduct(productData);
          if (productData.imagesByColor?.length > 0) {
            setSelectedColorImages(productData.imagesByColor[0].images);
            setSizes(productData.imagesByColor[0].sizes || []);
            setSelectedColor(productData.imagesByColor[0].color); // Default to first color
            setSelectedSize(productData.imagesByColor[0].sizes?.[0]?.size || null); // Default to first size
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [itemId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!product) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>No product found</Text>;
  }

  const { itemId: itemInfo, imagesByColor, sizeChart, deliveryDescription, returnPolicy, About, isSize, howToMeasure } = product;

  const handleColorSelect = (colorObj) => {
    setSelectedColor(colorObj.color);
    setSelectedColorImages(colorObj.images);
    setSizes(colorObj.sizes);
    setSelectedSize(colorObj.sizes?.[0]?.size || null); // Reset size selection when color changes
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
        {/* Main Image & Thumbnails */}
        <View style={styles.imageSection}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetailPhoto', { images: selectedColorImages })}>
            <Image source={{ uri: selectedColorImages[0]?.url }} style={styles.mainImage} resizeMode="cover" />
          </TouchableWithoutFeedback>
          <ScrollView style={styles.sideImages} showsVerticalScrollIndicator={true}>
            {selectedColorImages.slice(1).map((img, idx) => (
              <Image key={idx} source={{ uri: img.url }} style={styles.thumbnail} resizeMode="cover" />
            ))}
          </ScrollView>
        </View>

        {/* Colors */}
        <View style={styles.colorsRow}>
          <Text style={styles.colorsText}>Colors</Text>
          <View style={styles.shareContainer}>
            <Text style={styles.shareText}>SHARE</Text>
            <Feather name="share-2" size={16} color="black" style={{ marginLeft: 5 }} />
          </View>
        </View>

        {/* Color Buttons */}
        <View style={styles.colors}>
          {imagesByColor.map((colorObj, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.colorBox,
                { backgroundColor: colorObj.hexCode },
                selectedColor === colorObj.color ? styles.selectedColorBox : {},
              ]}
              onPress={() => handleColorSelect(colorObj)}
            />
          ))}
        </View>

        {/* Product Details */}
        <View style={styles.details}>
          <Text style={styles.title}>{itemInfo.name}</Text>
          <Text style={styles.subTitle}>{itemInfo.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.strikeThrough}>₹{itemInfo.MRP}</Text>
            <Text style={styles.price}> ₹{itemInfo.discountedPrice}</Text>
            <Text style={styles.discount}>({Math.round(itemInfo.discountPercentage)}% off)</Text>
          </View>
          <Text style={styles.delivery}>{deliveryDescription}</Text>
        </View>

        {/* Sizes */}
        {isSize && (
          <View style={styles.priceSizeSection}>
            <View style={styles.sizeRow}>
              <Text style={styles.sizeText}>Select a size</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SizeChart', { sizeChart, howToMeasure })}>
                <Text style={styles.sizeChartText}>SIZE CHART</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sizeOptions}>
              {sizes.map((sz, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.sizeBox,
                    selectedSize === sz.size ? styles.selectedSizeBox : {},
                  ]}
                  onPress={() => handleSizeSelect(sz.size)}
                >
                  <Text
                    style={[
                      styles.sizeBoxText,
                      selectedSize === sz.size ? styles.selectedSizeBoxText : {},
                    ]}
                  >
                    {sz.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Accordion Sections */}
        <AccordionItem title="About the Product">
          <Text>{About}</Text>
        </AccordionItem>

        <AccordionItem title="Return Policies">
          <Text>{returnPolicy}</Text>
        </AccordionItem>

        <AccordionItem title="How to Measure">
          {howToMeasure?.map((item, idx) => {
            const [key] = Object.keys(item);
            return (
              <View key={idx}>
                <Text style={{ fontWeight: 'bold' }}>{key.toUpperCase()}</Text>
                <Text>{item[key]}</Text>
              </View>
            );
          })}
        </AccordionItem>
      </ScrollView>

      {/* Sticky Buttons at Bottom */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={async () => {
            console.log('Wishlist button pressed');

            if (!token) {
              console.log('No token found. Redirecting to login screen...');
              navigation.navigate('Login', {
                fromScreen: 'ProductDetail',
                itemId: product.itemId._id,
              });
              return;
            }

            console.log('Token found:', token);

            const payload = {
              itemId: product.itemId._id,
              color: selectedColor || 'Black',
            };

            console.log('Request Payload:', payload);

            try {
              const response = await fetch('http://10.0.2.2:4000/api/userwishlist/create', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });

              console.log('Wishlist API Response Status:', response.status);

              const data = await response.json();
              console.log('Wishlist API Response Data:', data);

              if (response.ok) {
                console.log('Item added to wishlist successfully.');
                dispatch(addToWishlist(data));
                console.log('Wishlist item dispatched to Redux:', data);
                alert('Added to wishlist');
                navigation.navigate('Wishlist');
              } else {
                console.warn('Wishlist API error:', data.message);
                alert(data.message || 'Failed to add to wishlist');
              }
            } catch (err) {
              console.error('Network/API Error while adding to wishlist:', err);
              alert('Something went wrong while adding to wishlist');
            }
          }}
        >
          <Icon name="heart-o" size={18} color="black" />
          <Text style={styles.wishlistText}>WISHLIST</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={async () => {
            console.log('🛒 Add to cart button pressed');

            if (!token) {
              console.warn('No token found. Redirecting to login.');
              navigation.navigate('Login', {
                fromScreen: 'ProductDetail',
                itemId: product.itemId._id,
              });
              return;
            }

            if (!selectedSize) {
              alert('Please select a size.');
              return;
            }

            const selectedColorObj = imagesByColor.find(colorObj => colorObj.color === selectedColor);
            const selectedSizeObj = selectedColorObj?.sizes?.find(sz => sz.size === selectedSize);

            if (!selectedSizeObj) {
              alert('Selected size is not available for this color.');
              return;
            }

            const payload = {
              itemId: product.itemId._id,
              quantity: 1,
              size: selectedSize,
              color: selectedColor || 'Black',
              skuId: selectedSizeObj.skuId,
            };

            console.log('Cart Payload:', payload);

            try {
              const response = await fetch('http://10.0.2.2:4000/api/usercart/create', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });

              const data = await response.json();

              console.log('Cart API Response:', data);

              if (response.ok) {
                alert('Added to cart successfully.');
                navigation.navigate('Cart');
              } else {
                alert(data.message || 'Failed to add to cart.');
              }
            } catch (error) {
              console.error('Cart API Error:', error);
              alert('Something went wrong while adding to cart.');
            }
          }}
        >
          <Feather name="shopping-cart" size={18} color="#fff" />
          <Text style={styles.cartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  imageSection: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  mainImage: {
    width: '70%',
    height: 350,
    borderRadius: 10,
  },
  sideImages: {
    marginLeft: 10,
    width: '25%',
    height: 350,
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  colorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  colorsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    fontSize: 14,
  },
  colors: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorBox: {
    width: 40,
    height: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedColorBox: {
    borderWidth: 2,
    borderColor: '#D2691E',
  },
  details: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    color: 'gray',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  discount: {
    color: 'orange',
    marginLeft: 8,
  },
  delivery: {
    color: 'gray',
    marginTop: 5,
  },
  priceSizeSection: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeText: {
    fontSize: 14,
  },
  sizeChartText: {
    fontSize: 14,
    color: '#F57C00',
    textDecorationLine: 'underline',
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  sizeBox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  selectedSizeBox: {
    backgroundColor: '#D2691E',
    borderColor: '#D2691E',
  },
  sizeBoxText: {
    fontSize: 14,
  },
  selectedSizeBoxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'space-between',
  },
  wishlistButton: {
    borderWidth: 1,
    borderColor: '#D2691E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  wishlistText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  cartButton: {
    backgroundColor: '#D2691E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
  },
  cartText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
});