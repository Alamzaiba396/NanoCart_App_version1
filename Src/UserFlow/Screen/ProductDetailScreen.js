import { useRoute, useNavigation } from '@react-navigation/native';import Header from '../Component/Header';
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

 const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { itemId } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [sizes, setSizes] = useState([]);

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
              style={[styles.colorBox]}
              onPress={() => {
                setSelectedColorImages(colorObj.images);
                setSizes(colorObj.sizes);
              }}>
              <Text style={{ fontSize: 10 }}>{colorObj.color}</Text>
            </TouchableOpacity>
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
                <TouchableOpacity key={idx} style={styles.sizeBox}>
                  <Text style={styles.sizeBoxText}>{sz.size}</Text>
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
    console.log(' Wishlist button pressed');

    if (!token) {
      console.log(' No token found. Redirecting to login screen...');
      navigation.navigate('Login', {
        fromScreen: 'ProductDetail',
        itemId: product.itemId._id,
      });
      return;
    }

    console.log(' Token found:', token);

    const colorObj = imagesByColor.find(colorSet =>
      colorSet.images.some(img => img.url === selectedColorImages[0]?.url)
    );
    const selectedColor = colorObj?.color || 'Black';

    console.log(' Selected color:', selectedColor);
    console.log(' Item ID:', product.itemId._id);

    const payload = {
      itemId: product.itemId._id,
      color: selectedColor,
    };

    console.log(' Request Payload:', payload);

    try {
      const response = await fetch('http://10.0.2.2:4000/api/userwishlist/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(' Wishlist API Response Status:', response.status);

      const data = await response.json();
      console.log(' Wishlist API Response Data:', data);

      if (response.ok) {
        console.log(' Item added to wishlist successfully.');
        dispatch(addToWishlist(data));
        console.log(' Wishlist item dispatched to Redux:', data);
        alert('Added to wishlist');
        navigation.navigate('Wishlist');
      } else {
        console.warn(' Wishlist API error:', data.message);
        alert(data.message || 'Failed to add to wishlist');
      }
    } catch (err) {screen
      console.error(' Network/API Error while adding to wishlist:', err);
      alert('Something went wrong while adding to wishlist');
    }
  }}>
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

    const selectedColorObj = imagesByColor.find(colorObj =>
      colorObj.images.some(img => img.url === selectedColorImages[0]?.url)
    );

    const selectedColor = selectedColorObj?.color || 'Black';

    console.log(' Selected Color:', selectedColor);

    // Get selected size (you can make user select size dynamically later)
    const selectedSizeObj = selectedColorObj?.sizes?.[0]; // take first available size for now
    const selectedSize = selectedSizeObj?.size || '';
    const skuId = selectedSizeObj?.skuId || '';

    console.log(' Selected Size:', selectedSize);
    console.log(' Selected SKU ID:', skuId);

    if (!selectedSize || !skuId) {
      alert('Please select a valid size.');
      return;
    }

    const payload = {
      itemId: product.itemId._id,
      quantity: 1, // default 1
      size: selectedSize,
      color: selectedColor,
      skuId: skuId,
    };

    console.log(' Cart Payload:', payload);

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

      console.log(' Cart API Response:', data);

      if (response.ok) {
        alert('Added to cart successfully.');
        navigation.navigate('Cart'); // ✅ navigate to cart
      } else {
        alert(data.message || 'Failed to add to cart.');
      }
    } catch (error) {
      console.error(' Cart API Error:', error);
      alert('Something went wrong while adding to cart.');
    }
  }}>
  <Feather name="shopping-cart" size={18} color="#fff" />
  <Text style={styles.cartText}>ADD TO CART</Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

export default ProductDetail;

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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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



// logic for rating and review get from api


// // import { useRoute, useNavigation } from '@react-navigation/native'; 
// // import Header from '../Component/Header';
// // import AccordionItem from '../Component/AccordionItem';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import Feather from 'react-native-vector-icons/Feather';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   Image,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   StyleSheet,
// //   Dimensions,
// //   TouchableWithoutFeedback,
// // } from 'react-native';
// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { addToWishlist } from '../redux/reducers/wishlistSlice';

// // const { width } = Dimensions.get('window');

// // const ProductDetail = () => {
// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const dispatch = useDispatch();
// //   const token = useSelector(state => state.auth.token);
// //   const { itemId } = route.params;

// //   const [loading, setLoading] = useState(true);
// //   const [product, setProduct] = useState(null);
// //   const [selectedColorImages, setSelectedColorImages] = useState([]);
// //   const [sizes, setSizes] = useState([]);
// //   const [reviewsData, setReviewsData] = useState(null);

// //   useEffect(() => {
// //     const fetchProductDetails = async () => {
// //       try {
// //         const res = await fetch(`http://10.0.2.2:4000/api/itemDetails/${itemId}`);
// //         const json = await res.json();
// //         if (json.data && json.data.length > 0) {
// //           const productData = json.data[0];
// //           setProduct(productData);
// //           if (productData.imagesByColor?.length > 0) {
// //             setSelectedColorImages(productData.imagesByColor[0].images);
// //             setSizes(productData.imagesByColor[0].sizes || []);
// //           }
// //         }
// //       } catch (err) {
// //         console.error('Error fetching product details:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const fetchReviews = async () => {
// //       try {
// //         const res = await fetch(`http://10.0.2.2:4000/api/user/ratingreview/${itemId}`);
// //         const json = await res.json();
// //         console.log("📥 Reviews Response:", json);
// //         if (json.success) {
// //           setReviewsData(json.data);
// //         }
// //       } catch (error) {
// //         console.error("❌ Error fetching reviews:", error);
// //       }
// //     };

// //     fetchProductDetails();
// //     fetchReviews();
// //   }, [itemId]);

// //   if (loading) {
// //     return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
// //   }

// //   if (!product) {
// //     return <Text style={{ textAlign: 'center', marginTop: 50 }}>No product found</Text>;
// //   }

// //   const { itemId: itemInfo, imagesByColor, sizeChart, deliveryDescription, returnPolicy, About, isSize, howToMeasure } = product;

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-GB', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Header />
// //       <ScrollView contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
// //         {/* Product Images, Details, Sizes, How to Measure, etc. come before here */}

// //         <AccordionItem title="How to Measure">
// //           {howToMeasure?.map((item, idx) => {
// //             const [key] = Object.keys(item);
// //             return (
// //               <View key={idx}>
// //                 <Text style={{ fontWeight: 'bold' }}>{key.toUpperCase()}</Text>
// //                 <Text>{item[key]}</Text>
// //               </View>
// //             );
// //           })}
// //         </AccordionItem>

// //         {reviewsData && (
// //           <View style={{ marginTop: 20 }}>
// //             <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Ratings & Reviews</Text>

// //             {reviewsData.arrayOfCustomerImage?.length > 0 && (
// //               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginBottom: 10 }}>
// //                 {reviewsData.arrayOfCustomerImage.map((imgUrl, idx) => (
// //                   <Image
// //                     key={idx}
// //                     source={{ uri: imgUrl }}
// //                     style={{ width: 80, height: 100, borderRadius: 8, marginRight: 10 }}
// //                     resizeMode="cover"
// //                   />
// //                 ))}
// //               </ScrollView>
// //             )}

// //             {reviewsData.data.map((reviewItem, idx) => (
// //               <View key={idx} style={{ backgroundColor: '#f9f9f9', padding: 10, marginBottom: 10, borderRadius: 8 }}>
// //                 <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{reviewItem.userId.name}</Text>
// //                 <Text style={{ fontSize: 12, color: 'gray' }}>Size bought: {reviewItem.sizeBought} | {formatDate(reviewItem.createdAt)}</Text>
// //                 <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
// //                   <Text style={{ backgroundColor: '#FFA500', color: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 12 }}>
// //                     {reviewItem.rating} ★
// //                   </Text>
// //                 </View>
// //                 <Text style={{ fontSize: 13 }}>{reviewItem.review}</Text>
// //               </View>
// //             ))}
// //           </View>
// //         )}

// //         {/* Remaining scrollable product content below remains unchanged */}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default ProductDetail;


// import { useRoute, useNavigation } from '@react-navigation/native'; 
// import Header from '../Component/Header';
// import AccordionItem from '../Component/AccordionItem';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToWishlist } from '../redux/reducers/wishlistSlice';

// const { width } = Dimensions.get('window');

// const ProductDetail = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const token = useSelector(state => state.auth.token);
//   const { itemId } = route.params;

//   const [loading, setLoading] = useState(true);
//   const [product, setProduct] = useState(null);
//   const [selectedColorImages, setSelectedColorImages] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [reviewsData, setReviewsData] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const res = await fetch(`http://10.0.2.2:4000/api/itemDetails/${itemId}`);
//         const json = await res.json();
//         if (json.data && json.data.length > 0) {
//           const productData = json.data[0];
//           setProduct(productData);
//           if (productData.imagesByColor?.length > 0) {
//             setSelectedColorImages(productData.imagesByColor[0].images);
//             setSizes(productData.imagesByColor[0].sizes || []);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching product details:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const res = await fetch(`http://10.0.2.2:4000/api/user/ratingreview/68063593070d8264e0b8e85a`);
//         const json = await res.json();
//         console.log("📥 Reviews Response:", json);
//         if (json.success) {
//           setReviewsData(json.data);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching reviews:", error);
//       }
//     };

//     fetchProductDetails();
//     fetchReviews();
//   }, [itemId]);

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
//   }

//   if (!product) {
//     return <Text style={{ textAlign: 'center', marginTop: 50 }}>No product found</Text>;
//   }

//   const { itemId: itemInfo, imagesByColor, sizeChart, deliveryDescription, returnPolicy, About, isSize, howToMeasure } = product;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
//         {/* Product Images, Details, Sizes, How to Measure, etc. come before here */}

//         <AccordionItem title="How to Measure">
//           {howToMeasure?.map((item, idx) => {
//             const [key] = Object.keys(item);
//             return (
//               <View key={idx}>
//                 <Text style={{ fontWeight: 'bold' }}>{key.toUpperCase()}</Text>
//                 <Text>{item[key]}</Text>
//               </View>
//             );
//           })}
//         </AccordionItem>

//         {reviewsData && (
//           <View style={{ marginTop: 20 }}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>Ratings & Reviews</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//               <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{parseFloat(reviewsData.averageRating).toFixed(1)} </Text>
//               <Icon name="star" size={16} color="#FFA500" />
//               <Text style={{ marginLeft: 8, fontSize: 12, color: 'gray' }}>{reviewsData.totalRating} Ratings | {reviewsData.data.length} Reviews</Text>
//             </View>

//             {reviewsData.arrayOfCustomerImage?.length > 0 && (
//               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginBottom: 10 }}>
//                 {reviewsData.arrayOfCustomerImage.map((imgUrl, idx) => (
//                   <Image
//                     key={idx}
//                     source={{ uri: imgUrl }}
//                     style={{ width: 80, height: 100, borderRadius: 8, marginRight: 10 }}
//                     resizeMode="cover"
//                   />
//                 ))}
//               </ScrollView>
//             )}
//             {reviewsData.data.map((reviewItem, idx) => (
//               <View key={idx} style={{ backgroundColor: '#f9f9f9', padding: 10, marginBottom: 10, borderRadius: 8 }}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{reviewItem.userId.name}</Text>
//                 <Text style={{ fontSize: 12, color: 'gray' }}>Size bought: {reviewItem.sizeBought} | {formatDate(reviewItem.createdAt)}</Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
//                   <Text style={{ backgroundColor: '#FFA500', color: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontSize: 12 }}>
//                     {reviewItem.rating} ★
//                   </Text>
//                 </View>
//                 <Text style={{ fontSize: 13 }}>{reviewItem.review}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Remaining scrollable product content below remains unchanged */}
//       </ScrollView>
//     </View>
//   );
// };

// export default ProductDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   imageSection: {
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   mainImage: {
//     width: '70%',
//     height: 350,
//     borderRadius: 10,
//   },
//   sideImages: {
//     marginLeft: 10,
//     width: '25%',
//     height: 350,
//   },
//   thumbnail: {
//     width: '100%',
//     height: 100,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   colorsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   colorsText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   shareContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   shareText: {
//     fontSize: 14,
//   },
//   colors: {
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   colorBox: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   details: {
//     marginVertical: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   subTitle: {
//     color: 'gray',
//     marginBottom: 5,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   strikeThrough: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   discount: {
//     color: 'orange',
//     marginLeft: 8,
//   },
//   delivery: {
//     color: 'gray',
//     marginTop: 5,
//   },
//   priceSizeSection: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   sizeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   sizeText: {
//     fontSize: 14,
//   },
//   sizeChartText: {
//     fontSize: 14,
//     color: '#F57C00',
//     textDecorationLine: 'underline',
//   },
//   sizeOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10,
//   },
//   sizeBox: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginRight: 10,
//     marginBottom: 5,
//   },
//   sizeBoxText: {
//     fontSize: 14,
//   },
//   bottomButtons: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     justifyContent: 'space-between',
//   },
//   wishlistButton: {
//     borderWidth: 1,
//     borderColor: '#D2691E',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 3,
//     flex: 1,
//     marginRight: 10,
//     justifyContent: 'center',
//   },
//   wishlistText: {
//     marginLeft: 8,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   cartButton: {
//     backgroundColor: '#D2691E',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 3,
//     flex: 1,
//     justifyContent: 'center',
//   },
//   cartText: {
//     marginLeft: 8,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });