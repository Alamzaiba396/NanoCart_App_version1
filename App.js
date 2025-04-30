import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './Src/Screen/SplashScreen';
import LoginScreen from './Src/Screen/LoginScreen';
import VerificationScreen from './Src/Screen/VerificationScreen';
import RegisterScreen from './Src/Screen/RegisterScreen';
import BottomTabBar from './Src/Component/BottomTabBar';
import PromoBanner from './Src/Component/PromoBanner';
import CardSlider from './Src/Component/CardSlider';
import SearchCategory from './Src/Screen/SearchCategory';
import SubCategoryScreen from './Src/Screen/SubCategoryScreen';
import ProductDetailScreen from './Src/Screen/ProductDetailScreen';
import ProductDetailPhotoScreen from './Src/Screen/ProductDetailPhotoScreen';
import SizeChartScreen from './Src/Screen/SizeChartScreen';
import CartScreen from './Src/Screen/CartScreen';
import DeliveryAddressScreen from './Src/Screen/DeliveryAddressScreen';
import AddNewAddressScreen from './Src/Screen/AddNewAddressScreen';
import EditScreen from './Src/Screen/EditScreen';
import PaymentScreen from './Src/Screen/PaymentScreen';
import MyAccountScreen from './Src/Screen/MyAccountScreen';
import {Provider} from 'react-redux';
import {store} from './Src/redux/store';
import LoginVerifyOtpScreen from './Src/Screen/LoginVerifyOtpScreen';
import ProfileScreen from './Src/Screen/ProfileScreen';
import PartnerCatalogueScreen from './Src/Partner/Screens/PartnerCatalogueScreen';
import WishlistScreen from './Src/Screen/WishlistScreen';
import SavedAddressScreen from './Src/Screen/SavedAddressScreen';
import PartnerRegisterScreen from './Src/Partner/Screens/PartnerRegisterScreen';
import PartnerHomeScreen from './Src/Partner/Screens/PartnerHomeScreen';
import PartnerSearchCategory from './Src/Partner/Screens/PartnerSearchCategory';
import PartnerSubCategoryScreen from './Src/Partner/Screens/PartnerSubCategoryScreen';
import PartnerWalletScreen from './Src/Partner/Screens/PartnerWalletScreen';
import OrderConfirmationScreen from './Src/Screen/OrderConfirmScreen';
import OrderHistoryScreen from './Src/Screen/OrderHistoryScreen';
import PartnerOrderConfirmationScreen from './Src/Partner/Screens/PartnerOrderConfirmScreen';
import PartnerOrderHistoryScreen from './Src/Partner/Screens/PartnerOrderHistoryScreen';
import PartnerAccountScreen from './Src/Partner/Screens/PartnerAccountScreen';
import PartnerVerificationScreen from './Src/Partner/Screens/PartnerVerificationScreen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={BottomTabBar} />
          <Stack.Screen name="Promo" component={PromoBanner} />
          <Stack.Screen name="Card" component={CardSlider} />
          <Stack.Screen name="Search" component={SearchCategory} />
          <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen
            name="ProductDetailPhoto"
            component={ProductDetailPhotoScreen}
          />
          <Stack.Screen name="SizeChart" component={SizeChartScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Delivery" component={DeliveryAddressScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VerifyOtp" component={VerificationScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
          <Stack.Screen name="edit" component={EditScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Account" component={MyAccountScreen} />
          <Stack.Screen
            name="LoginVerifyOtp"
            component={LoginVerifyOtpScreen}
          />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="PartnerAccount"
            component={PartnerAccountScreen}
          />
          <Stack.Screen
            name="PartnerRegister"
            component={PartnerRegisterScreen}
          />
          <Stack.Screen
            name="PatnerVerification"
            component={PartnerVerificationScreen}
          />
          <Stack.Screen
            name="PartnerCatalogue"
            component={PartnerCatalogueScreen}
          />
          <Stack.Screen name="PartnerHome" component={PartnerHomeScreen} />
          <Stack.Screen
            name="PartnerSearchCategory"
            component={PartnerSearchCategory}
          />
          <Stack.Screen
            name="PartnerSubCategory"
            component={PartnerSubCategoryScreen}
          />
          <Stack.Screen name="PartnerWallet" component={PartnerWalletScreen} />
          <Stack.Screen
            name="PartnerOrderConfirmation"
            component={PartnerOrderConfirmationScreen}
          />
          <Stack.Screen
            name="PartnerOrderHistory"
            component={PartnerOrderHistoryScreen}
          />

          <Stack.Screen name="Saved" component={SavedAddressScreen} />
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
          />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useSelector } from "react-redux";
// import { Provider } from "react-redux";
// import { store } from "./Src/redux/store";
// import jwtDecode from "jwt-decode";

// // Screens
// import SplashScreen from "./Src/Screen/SplashScreen";
// import LoginScreen from "./Src/Screen/LoginScreen";
// import VerificationScreen from "./Src/Screen/VerificationScreen";
// import RegisterScreen from "./Src/Screen/RegisterScreen";
// import BottomTabBar from "./Src/Component/BottomTabBar";
// import PartnerVerificationScreen from "./Src/Screen/PartnerVerificationScreen";
// import PartnerCatalogueScreen from "./Src/Screen/PartnerCatalogueScreen";
// import PartnerRegisterScreen from "./Src/Partner/Screens/PartnerRegisterScreen";
// // Import all other screens you already have...

// const Stack = createStackNavigator();

// const UserFlow = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Home" component={BottomTabBar} />
//     <Stack.Screen name="Search" component={SearchCategory} />
//     <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
//     <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
//     <Stack.Screen name="Cart" component={CartScreen} />
//     <Stack.Screen name="Account" component={MyAccountScreen} />
//     {/* ➔ Add more user screens here */}
//   </Stack.Navigator>
// );

// const PartnerFlow = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="PartnerVerification" component={PartnerVerificationScreen} />
//     <Stack.Screen name="PartnerCatalogue" component={PartnerCatalogueScreen} />
//     {/* ➔ Add more partner screens here */}
//   </Stack.Navigator>
// );

// const AuthFlow = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Splash" component={SplashScreen} />
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="VerifyOtp" component={VerificationScreen} />
//     <Stack.Screen name="Register" component={RegisterScreen} />
//     <Stack.Screen name="PartnerRegister" component={PartnerRegisterScreen} />
//     {/* ➔ Add more auth screens here */}
//   </Stack.Navigator>
// );

// const RootNavigator = () => {
//   const token = useSelector((state) => state.auth.token);

//   console.log('🛡️ Token found:', token);

//   if (!token) {
//     console.log('🔓 No token found ➔ showing Auth Flow');
//     return <AuthFlow />;
//   }

//   try {
//     const decoded = jwtDecode(token);
//     console.log('🔍 Decoded Token:', decoded);

//     if (decoded?.role === "Partner") {
//       console.log('👨‍💼 Partner role ➔ showing Partner Flow');
//       return <PartnerFlow />;
//     } else if (decoded?.role === "User") {
//       console.log('🛒 User role ➔ showing User Flow');
//       return <UserFlow />;
//     } else {
//       console.warn('⚠️ Unknown role, fallback to Auth Flow');
//       return <AuthFlow />;
//     }
//   } catch (error) {
//     console.error('❌ Error decoding token:', error);
//     return <AuthFlow />;
//   }
// };

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;
