import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  Alert,
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
import PartnerHeader from '../Components/PartnerHeader';
import PartnerAccordionItem from '../Components/PartnerAccordionItem';

const { width } = Dimensions.get('window');

const PartnerProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { itemId } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [availableColors, setAvailableColors] = useState([]); // State for colors from API
  const selectedPrice = product?.PPQ?.[0]?.pricePerUnit || 0;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:4000/api/itemDetails/${itemId}`);
        const json = await res.json();
        console.log('Product Details Response:', json);
        if (json.data && json.data.length > 0) {
          const productData = json.data[0];
          console.log('Product Dataaaaaaa:', productData);
          setProduct(productData);
          // Set the colors from the API response
          setAvailableColors(json.colors || []);
          if (productData.imagesByColor?.length > 0) {
            setSelectedColorImages(productData.imagesByColor[0].images);
            setSizes(productData.imagesByColor[0].sizes || []);
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

  const { itemId: itemInfo, imagesByColor, sizeChart, deliveryDescription, returnPolicy, About, isSize, howToMeasure, PPQ, deliveryPincode } = product;

  const handleAddToWishlist = async () => {
    console.log('Wishlist button pressed');

    if (!token) {
      console.log('No token found. Redirecting to login screen...');
      navigation.navigate('Login', {
        fromScreen: 'PartnerProductDetail',
        itemId: product.itemId._id,
      });
      return;
    }

    console.log('Token found:', token);

    const colorObj = imagesByColor.find((colorSet) =>
      colorSet.images.some((img) => img.url === selectedColorImages[0]?.url)
    );
    const selectedColor = colorObj?.color || 'Default Color';

    console.log('Selected color:', selectedColor);
    console.log('Item ID:', product.itemId._id);

    const payload = {
      itemId: product.itemId._id,
      color: selectedColor,
    };

    console.log('Request Payload:', payload);

    try {
      const response = await fetch('http://10.0.2.2:4000/api/partner/wishlist/create', {
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
        Alert.alert('Success', 'Partner Added to wishlist');
        navigation.navigate('PartnerWishlist');
      } else {
        console.warn('Wishlist API error:', data.message);
        Alert.alert('Error', data.message || 'Failed to add to wishlist');
      }
    } catch (err) {
      console.error('Network/API Error while adding to wishlist:', err);
      Alert.alert('Error', 'Something went wrong while adding to wishlist');
    }
  };

  return (
    <View style={styles.container}>
      <PartnerHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
        {/* Main Image & Thumbnails */}
        <View style={styles.imageSection}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('PartnerProductPhoto', { images: selectedColorImages })}>
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
            <Text style={styles.shareText}>Catalogue</Text>
            <Feather name="download" size={16} color="black" style={{ marginLeft: 5 }} />
          </View>
        </View>

        {/* Color Buttons */}
        <View style={styles.colors}>
          {availableColors.map((colorObj, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.colorBox,
                { backgroundColor: colorObj.hexCode }, // Use hexCode from API
                selectedColorIndex === idx && styles.selectedColorBox, // Highlight selected color
              ]}
              onPress={() => {
                setSelectedColorIndex(idx);
                const colorMatch = imagesByColor.find((c) => c.color === colorObj.color);
                if (colorMatch) {
                  setSelectedColorImages(colorMatch.images);
                  setSizes(colorMatch.sizes || []);
                }
              }}
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
              <TouchableOpacity onPress={() => navigation.navigate('PartnerSizeChart', { sizeChart, howToMeasure })}>
                <Text style={styles.sizeChartText}>SIZE CHART</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sizeOptions}>
              {sizes.map((sz, idx) => (
                <TouchableOpacity key={idx} style={styles.sizeBox}>
                  <Text style={styles.sizeBoxText}>{sz.size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Accordion Sections */}
        <PartnerAccordionItem title="About the Product">
          <Text>{About}</Text>
        </PartnerAccordionItem>

        {PPQ?.length > 0 && (
          <PartnerAccordionItem title="Pricing Per Quantity">
            {PPQ.map((ppqItem, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                }}>
                <Text style={{ fontSize: 14, color: '#333' }}>
                  {ppqItem.maxQty
                    ? `${ppqItem.minQty}-${ppqItem.maxQty} pcs`
                    : `> ${ppqItem.minQty} pcs`}
                </Text>
                <Text style={{ fontSize: 14, color: 'orange', fontWeight: 'bold' }}>
                  ₹{ppqItem.pricePerUnit}.00
                </Text>
              </View>
            ))}
          </PartnerAccordionItem>
        )}

        <PartnerAccordionItem title="Choose Items">
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Select Quantity</Text>

            {/* Color Buttons Row */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
              {availableColors.map((colorObj, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.quantityColorBox,
                    { backgroundColor: colorObj.hexCode }, // Use hexCode from API
                    selectedColorIndex === idx && styles.selectedColorBox,
                  ]}
                  onPress={() => {
                    setSelectedColorIndex(idx);
                    const colorMatch = imagesByColor.find((c) => c.color === colorObj.color);
                    if (colorMatch) {
                      setSelectedColorImages(colorMatch.images);
                      setSizes(colorMatch.sizes || []);
                    }
                  }}
                />
              ))}
            </View>

            {/* Quantity Selector */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setQuantity(prev => Math.max(0, prev - 1))}>
                <Feather name="chevron-down" size={24} color="#d2691e" />
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 20, fontSize: 18 }}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)}>
                <Feather name="chevron-up" size={24} color="#d2691e" />
              </TouchableOpacity>
            </View>

            {/* Pricing Table with Logic */}
            {(() => {
              let pricePerPcs = 0;

              if (PPQ?.length > 0) {
                for (let i = 0; i < PPQ.length; i++) {
                  const { minQty, maxQty, pricePerUnit } = PPQ[i];
                  if (maxQty) {
                    if (quantity >= minQty && quantity <= maxQty) {
                      pricePerPcs = pricePerUnit;
                      break;
                    }
                  } else {
                    if (quantity >= minQty) {
                      pricePerPcs = pricePerUnit;
                      break;
                    }
                  }
                }
              }

              const totalPrice = quantity * pricePerPcs;

              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      paddingHorizontal: 10,
                    }}>
                    <Text>Total Qty.</Text>
                    <Text>Price / Pcs</Text>
                    <Text>Total Price</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      marginTop: 5,
                    }}>
                    <Text>{quantity}</Text>
                    <Text>₹{pricePerPcs}</Text>
                    <Text>₹{totalPrice}</Text>
                  </View>
                </>
              );
            })()}
          </View>
        </PartnerAccordionItem>

        <PartnerAccordionItem title="Return Policies">
          <Text>{returnPolicy}</Text>
        </PartnerAccordionItem>

        <PartnerAccordionItem title="How to Measure">
          {howToMeasure?.map((item, idx) => {
            const [key] = Object.keys(item);
            return (
              <View key={idx}>
                <Text style={{ fontWeight: 'bold' }}>{key.toUpperCase()}</Text>
                <Text>{item[key]}</Text>
              </View>
            );
          })}
        </PartnerAccordionItem>

        {deliveryPincode?.length > 0 && (
          <PartnerAccordionItem title="Delivery Available At">
            <Text style={{ marginBottom: 5 }}>We deliver to the following pin codes:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {deliveryPincode.map((pincode, index) => (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#eee',
                    borderRadius: 5,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                  <Text>{pincode}</Text>
                </View>
              ))}
            </View>
          </PartnerAccordionItem>
        )}
      </ScrollView>

      {/* Sticky Buttons at Bottom */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.wishlistButton} onPress={handleAddToWishlist}>
          <Icon name="heart-o" size={18} color="black" />
          <Text style={styles.wishlistText}>WISHLIST</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={async () => {
            console.log('🛒 Add to cart button pressed');

            if (!token) {
              console.warn(' No token found. Redirecting to login.');
              navigation.navigate('Login', {
                fromScreen: 'ProductDetail',
                itemId: product.itemId._id,
              });
              return;
            }

            // Construct the orderDetails array
            const orderDetails = imagesByColor.map((colorObj) => ({
              color: colorObj.color,
              sizeAndQuantity: colorObj.sizes.map((sizeObj) => ({
                size: sizeObj.size,
                quantity: sizeObj.quantity || 1,
                skuId: sizeObj.skuId,
              })),
            }));

            // Calculate totalQuantity and totalPrice
            const totalQuantity = orderDetails.reduce(
              (total, colorObj) =>
                total +
                colorObj.sizeAndQuantity.reduce(
                  (subTotal, sizeObj) => subTotal + sizeObj.quantity,
                  0
                ),
              0
            );

            const totalPrice = totalQuantity * selectedPrice;

            const payload = {
              itemId: product.itemId._id,
              orderDetails,
              totalQuantity,
              totalPrice,
            };

            console.log(' Cart Payload:', payload);

            try {
              const response = await fetch('http://10.0.2.2:4000/api/partner/cart/create', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });

              const data = await response.json();

              console.log(' Cart API Response:', data);

              if (response.ok) {
                alert('Added to cart successfully.');
                navigation.navigate('PartnerCart');
              } else {
                alert(data.message || 'Failed to add to cart.');
              }
            } catch (error) {
              console.error(' Cart API Error:', error);
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

export default PartnerProductDetail;

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
    width: 40, // Rectangular shape
    height: 30,
    borderRadius: 5, // Slight border radius (set to 0 for sharp corners)
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorBox: {
    borderWidth: 3,
    borderColor: '#d2691e', // Highlight color for selected box
  },
  quantityColorBox: {
    width: 40, // Rectangular shape
    height: 30,
    borderRadius: 5, // Slight border radius (set to 0 for sharp corners)
    borderWidth: 2,
    borderColor: '#d2691e',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
  sizeBoxText: {
    fontSize: 14,
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