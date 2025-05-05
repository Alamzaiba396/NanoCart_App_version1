// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useSelector } from 'react-redux';

// // Screens
// import LoginScreen from './UserFlow/Screen/LoginScreen';
// import RegisterScreen from './UserFlow/Screen/UserRegisterScreen';
// import LoginVerifyOtpScreen from './UserFlow/Screen/LoginVerifyOtpScreen';
// import PartnerWalletScreen from './Partner/Screens/PartnerWalletScreen';
// import BottomTabBar from './UserFlow/Component/BottomTabBar'; // User home
// import MyAccountScreen from './UserFlow/Screen/MyAccountScreen';
// import CartScreen from './UserFlow/Screen/CartScreen';
// import PartnerAccountScreen from './Partner/Screens/PartnerAccountScreen';
// import PartnerRegisterScreen from './Partner/Screens/PartnerRegisterScreen';
// import PartnerCatalogueScreen from './Partner/Screens/PartnerCatalogueScreen';
// import PartnerOrderConfirmationScreen from './Partner/Screens/PartnerOrderConfirmScreen';
// import PartnerOrderHistoryScreen from './Partner/Screens/PartnerOrderHistoryScreen';
// import SearchCategory from './UserFlow/Screen/SearchCategory';
// import SubCategoryScreen from './UserFlow/Screen/SubCategoryScreen';
// import ProductDetail from './UserFlow/Screen/ProductDetailScreen';
// import ProductDetailPhotoScreen from './UserFlow/Screen/ProductDetailPhotoScreen';
// import SizeChartScreen from './UserFlow/Screen/SizeChartScreen';
// import SplashScreen from './UserFlow/Screen/SplashScreen';
// import UserRegisterScreen from './UserFlow/Screen/UserRegisterScreen';
// import EditScreen from './UserFlow/Screen/EditScreen';
// import PaymentScreen from './UserFlow/Screen/PaymentScreen';
// import DeliveryAddressScreen from './UserFlow/Screen/DeliveryAddressScreen';
// import WishlistScreen from './UserFlow/Screen/WishlistScreen';
// import ProfileScreen from './UserFlow/Screen/ProfileScreen';
// import RateProductScreen from './UserFlow/Screen/RateProductScreen';
// import AddNewAddressScreen from './UserFlow/Screen/AddNewAddressScreen';
// import PartnerCartScreen from './Partner/Screens/PartnerCartScreen';
// import PartnerProfileScreen from './Partner/Screens/PartnerProfileScreen';
// import SavedAddressesScreen from './UserFlow/Screen/SavedAddressScreen';
// import VerificationScreen from './UserFlow/Screen/RegisterVerificationScreen';

// const Stack = createStackNavigator();

// const AuthNavigation = () => {
//   const token = useSelector((state) => state.auth.token);
//   const role = useSelector((state) => state.auth.role);

//   return (
//     <NavigationContainer>
//       {token ? (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {role === 'Partner' ? (
//             <>
//           <Stack.Screen name="Home" component={BottomTabBar} />
//           <Stack.Screen name="Search" component={SearchCategory} />
//           <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
//           <Stack.Screen name="PartnerAccount" component={PartnerAccountScreen}/>
//           <Stack.Screen name="PartnerProfile" component={PartnerProfileScreen}/>
        
//           <Stack.Screen name="PartnerCatalogue"  component={PartnerCatalogueScreen} />
//           <Stack.Screen name="PartnerCart" component={PartnerCartScreen} />
//           <Stack.Screen name="PartnerOrderConfirmation" component={PartnerOrderConfirmationScreen}/>
//           <Stack.Screen  name="PartnerOrderHistory"component={PartnerOrderHistoryScreen}/>
//           <Stack.Screen name="PartnerWallet" component={PartnerWalletScreen} />
//             </>
//           ) : (
//             <>
//               <Stack.Screen name="Home" component={BottomTabBar} />
//               <Stack.Screen name="Cart" component={CartScreen} />
//               <Stack.Screen name="Search" component={SearchCategory} />
//              <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
//              <Stack.Screen name="ProductDetail" component={ProductDetail} />
//              <Stack.Screen name="ProductDetailPhoto" component={ProductDetailPhotoScreen} />
//              <Stack.Screen name="SizeChart" component={SizeChartScreen} />
           
//              <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
//              <Stack.Screen name="edit" component={EditScreen} />
//             <Stack.Screen name="Payment" component={PaymentScreen} />
//             <Stack.Screen name="Account" component={MyAccountScreen} />
//             <Stack.Screen name="Delivery" component={DeliveryAddressScreen} />
//             <Stack.Screen name="Wishlist" component={WishlistScreen} />
//            <Stack.Screen name="Profile" component={ProfileScreen} />
//           <Stack.Screen name="RateProduct" component={RateProductScreen} /> 
         
//           <Stack.Screen name="Saved"component={SavedAddressesScreen}/>
//             </>
//           )}
//         </Stack.Navigator>
//       ) : (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Splash" component={SplashScreen} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="LoginVerifyOtp" component={LoginVerifyOtpScreen} />
//           <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
//           <Stack.Screen name="PartnerRegister"component={PartnerRegisterScreen}/>
//           <Stack.Screen name="VerifyOtp"component={VerificationScreen}/>
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// };

// export default AuthNavigation;



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// Common Screen
import HomeScreen from './UserFlow/Screen/HomeScreen'; // New common HomeScreen

// Screens
import LoginScreen from './UserFlow/Screen/LoginScreen';
import RegisterScreen from './UserFlow/Screen/UserRegisterScreen';
import LoginVerifyOtpScreen from './UserFlow/Screen/LoginVerifyOtpScreen';
import PartnerWalletScreen from './Partner/Screens/PartnerWalletScreen';
 // User home
import MyAccountScreen from './UserFlow/Screen/MyAccountScreen';
import CartScreen from './UserFlow/Screen/CartScreen';
import PartnerAccountScreen from './Partner/Screens/PartnerAccountScreen';
import PartnerRegisterScreen from './Partner/Screens/PartnerRegisterScreen';
import PartnerCatalogueScreen from './Partner/Screens/PartnerCatalogueScreen';
import PartnerOrderConfirmationScreen from './Partner/Screens/PartnerOrderConfirmScreen';
import PartnerOrderHistoryScreen from './Partner/Screens/PartnerOrderHistoryScreen';
import SearchCategory from './UserFlow/Screen/SearchCategory';
import SubCategoryScreen from './UserFlow/Screen/SubCategoryScreen';
import ProductDetail from './UserFlow/Screen/ProductDetailScreen';
import ProductDetailPhotoScreen from './UserFlow/Screen/ProductDetailPhotoScreen';
import SizeChartScreen from './UserFlow/Screen/SizeChartScreen';
import SplashScreen from './UserFlow/Screen/SplashScreen';
import UserRegisterScreen from './UserFlow/Screen/UserRegisterScreen';
import EditScreen from './UserFlow/Screen/EditScreen';
import PaymentScreen from './UserFlow/Screen/PaymentScreen';
import DeliveryAddressScreen from './UserFlow/Screen/DeliveryAddressScreen';
import WishlistScreen from './UserFlow/Screen/WishlistScreen';
import ProfileScreen from './UserFlow/Screen/ProfileScreen';
import RateProductScreen from './UserFlow/Screen/RateProductScreen';
import AddNewAddressScreen from './UserFlow/Screen/AddNewAddressScreen';
import PartnerCartScreen from './Partner/Screens/PartnerCartScreen';
import PartnerProfileScreen from './Partner/Screens/PartnerProfileScreen';
import SavedAddressesScreen from './UserFlow/Screen/SavedAddressScreen';
import VerificationScreen from './UserFlow/Screen/RegisterVerificationScreen';
import BottomTabBar from './UserFlow/Component/BottomTabBar';
import OrderConfirmationScreen from './UserFlow/Screen/OrderConfirmationScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash Screen as the initial screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Common Home Screen for all users (authenticated or not) */}
        <Stack.Screen name="Home" component={BottomTabBar} />

        {/* Authenticated user navigation */}
        {token ? (
          <>
            {role === 'Partner' ? (
              <>
                <Stack.Screen name="PartnerAccount" component={PartnerAccountScreen} />
                <Stack.Screen name="PartnerProfile" component={PartnerProfileScreen} />
                <Stack.Screen name="PartnerCatalogue" component={PartnerCatalogueScreen} />
                <Stack.Screen name="PartnerCart" component={PartnerCartScreen} />
                <Stack.Screen name="PartnerOrderConfirmation" component={PartnerOrderConfirmationScreen} />
                <Stack.Screen name="PartnerOrderHistory" component={PartnerOrderHistoryScreen} />
                <Stack.Screen name="PartnerWallet" component={PartnerWalletScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="BottomTabBar" component={BottomTabBar} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Account" component={MyAccountScreen} />
                <Stack.Screen name="Delivery" component={DeliveryAddressScreen} />
                <Stack.Screen name="Wishlist" component={WishlistScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="RateProduct" component={RateProductScreen} />
                <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
                <Stack.Screen name="edit" component={EditScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="Saved" component={SavedAddressesScreen} />
                <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen}/>
              </>
            )}
          </>
        ) : (
          <>
            {/* Unauthenticated user navigation (skip flow) */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginVerifyOtp" component={LoginVerifyOtpScreen} />
            <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
            <Stack.Screen name="PartnerRegister" component={PartnerRegisterScreen} />
            <Stack.Screen name="VerifyOtp" component={VerificationScreen} />
          </>
        )}

        {/* Screens accessible to both authenticated and unauthenticated users */}
        <Stack.Screen name="Search" component={SearchCategory} />
        <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ProductDetailPhoto" component={ProductDetailPhotoScreen} />
        <Stack.Screen name="SizeChart" component={SizeChartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
