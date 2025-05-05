import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Src/UserFlow/Screen/SplashScreen";
import LoginScreen from "./Src/UserFlow/Screen/LoginScreen";

import RegisterScreen from "./Src/UserFlow/Screen/UserRegisterScreen";
import BottomTabBar from "./Src/UserFlow/Component/BottomTabBar";
import PromoBanner from "./Src/UserFlow/Component/PromoBanner";
import CardSlider from "./Src/UserFlow/Component/CardSlider";
import SearchCategory from "./Src/UserFlow/Screen/SearchCategory";
import SubCategoryScreen from "./Src/UserFlow/Screen/SubCategoryScreen";
import ProductDetailScreen from "./Src/UserFlow/Screen/ProductDetailScreen";
import ProductDetailPhotoScreen from "./Src/UserFlow/Screen/ProductDetailPhotoScreen";
import SizeChartScreen from "./Src/UserFlow/Screen/SizeChartScreen";
import CartScreen from "./Src/UserFlow/Screen/CartScreen";
import DeliveryAddressScreen from "./Src/UserFlow/Screen/DeliveryAddressScreen";
import AddNewAddressScreen from "./Src/UserFlow/Screen/AddNewAddressScreen";
import EditScreen from "./Src/UserFlow/Screen/EditScreen";
import PaymentScreen from "./Src/UserFlow/Screen/PaymentScreen";
import MyAccountScreen from "./Src/UserFlow/Screen/MyAccountScreen";
import { Provider } from "react-redux";
import { store } from "./Src/redux/store";
import LoginVerifyOtpScreen from "./Src/UserFlow/Screen/LoginVerifyOtpScreen";
import ProfileScreen from "./Src/UserFlow/Screen/ProfileScreen";
import PartnerCatalogueScreen from "./Src/Partner/Screens/PartnerCatalogueScreen";
import WishlistScreen from "./Src/UserFlow/Screen/WishlistScreen";
import SavedAddressScreen from "./Src/UserFlow/Screen/SavedAddressScreen";
import PartnerRegisterScreen from "./Src/Partner/Screens/PartnerRegisterScreen";
import PartnerAccountScreen from "./Src/Partner/Screens/PartnerAccountScreen";


// 
import PartnerOrderConfirmationScreen from "./Src/Partner/Screens/PartnerOrderConfirmScreen";
import PartnerOrderHistoryScreen from "./Src/Partner/Screens/PartnerOrderHistoryScreen";

import PartnerWalletScreen from "./Src/Partner/Screens/PartnerWalletScreen";

import RegisterVerificationScreen from "./Src/UserFlow/Screen/RegisterVerificationScreen";
import RateProductScreen from "./Src/UserFlow/Screen/RateProductScreen";

import OrderHistoryScreen from "./Src/UserFlow/Screen/OrderHistoryScreen";
import TrackOrderScreen from "./Src/UserFlow/Screen/TrackOrderScreen";
import OrderConfirmationScreen from "./Src/UserFlow/Screen/OrderConfirmationScreen";
import CancelOrderScreen from "./Src/UserFlow/Screen/CancelOrderScreen";
import ReturnExchangeScreen from "./Src/UserFlow/Screen/ReturnExchnageScreen";
import ReturnConfirmationScreen from "./Src/UserFlow/Screen/ReturnConfirmationScreen";
import TBYBScreen from "./Src/UserFlow/Screen/TBYBScreen";
import PartnerBottomTabBar from "./Src/Partner/Components/PartnerBottomTabBar";
import PartnerSearchCategory from "./Src/Partner/Screens/PartnerSearchCategoryScreen";
import PartnerSubCategoryScreen from "./Src/Partner/Screens/PartnerSubCategoryScreen";
import PartnerProductDetail from "./Src/Partner/Screens/PartnerProductDetail";
import PartnerSizeChartScreen from "./Src/Partner/Screens/PartnerSizeChartScreen";
import PartnerAddNewAddressScreen from "./Src/Partner/Screens/PartnerAddNewAddressScreen";
import PartnerDeliveryAddressScreen from "./Src/Partner/Screens/PartnerDeliveryAddressScreen";
import PartnerEditScreen from "./Src/Partner/Screens/PartnerEditScreen";
import PartnerSavedAddressScreen from "./Src/Partner/Screens/PartnerSavedAddressScreen";
import PartnerProfileScreen from "./Src/Partner/Screens/PartnerProfileScreen";


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
        <Provider store={store}> 
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserRegister" component={RegisterScreen} />
        <Stack.Screen name="LoginVerifyOtp" component={LoginVerifyOtpScreen} />
        <Stack.Screen name="PartnerRegister" component={PartnerRegisterScreen}  />
        <Stack.Screen name="RegisterVerifyOtp" component={RegisterVerificationScreen} />
      
        <Stack.Screen name="Home" component={BottomTabBar} />
        <Stack.Screen name="Promo" component={PromoBanner} />
        <Stack.Screen name="Card" component={CardSlider} />
        <Stack.Screen name="Search" component={SearchCategory} />
        <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductDetailPhoto" component={ProductDetailPhotoScreen} />
        <Stack.Screen name="SizeChart" component={SizeChartScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Delivery" component={DeliveryAddressScreen} />
        <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
        <Stack.Screen name="edit" component={EditScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Account" component={MyAccountScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RateProduct" component={RateProductScreen} />
        <Stack.Screen name="Saved" component={SavedAddressScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
        <Stack.Screen name="ReturnExchange" component={ReturnExchangeScreen} />
        <Stack.Screen name="ReturnConfirm" component={ReturnConfirmationScreen} />
        <Stack.Screen name="TBYB" component={TBYBScreen} />



        <Stack.Screen name="PartnerHome" component={PartnerBottomTabBar} />
        <Stack.Screen name="PartnerSearch"component={PartnerSearchCategory} />
        <Stack.Screen name="PartnerProductDetail" component={PartnerProductDetail} />
          <Stack.Screen name="PartnerAccount" component={PartnerAccountScreen} />
          <Stack.Screen name="PartnerCatalogue"component={PartnerCatalogueScreen} />
          <Stack.Screen name="PartnerSubCategory"component={PartnerSubCategoryScreen} />
          <Stack.Screen name="PartnerSizeChat"component={PartnerSizeChartScreen} />
          <Stack.Screen name="PartnerWallet" component={PartnerWalletScreen} />
          <Stack.Screen  name="PartnerOrderConfirmation"  component={PartnerOrderConfirmationScreen}  /> 
          <Stack.Screen  name="PartnerOrderHistory"  component={PartnerOrderHistoryScreen}/>
          <Stack.Screen  name="PartnerAddNewAddress"  component={PartnerAddNewAddressScreen}/>
          <Stack.Screen  name="PartnerEdit"  component={PartnerEditScreen}/>
          <Stack.Screen  name="PartnerProfile"  component={PartnerProfileScreen}/>
          <Stack.Screen  name="PartnerDeliveryAddress"  component={PartnerDeliveryAddressScreen}/>
          <Stack.Screen  name="PartnerSavedAddress"  component={PartnerSavedAddressScreen}/>
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  ); 
};
export default App;




// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './Src/redux/store';
// import AuthNavigation from './Src/AuthNavigation';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AuthNavigation />
//     </Provider>
//   );
// };

// export default App;
