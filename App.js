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
import WishlistScreen from './Src/Screen/WishlistScreen';
import ProfileScreen from './Src/Screen/ProfileScreen';
import PartnerRegisterScreen from './Src/Screen/PartnerRegisterScreen';
import PartnerVerificationScreen from './Src/Screen/PartnerVerificationScreen';
import PartnerCatalogueScreen from './Src/Screen/PartnerCatalogueScreen';
import OrderConfirmation from './Src/Screen/OrderConfirmScreen';
import OrderConfirmationScreen from './Src/Screen/OrderConfirmScreen';
import PartnerOrderHistoryScreen from './Src/Screen/PartnerOrderHistoryScreen';
import PartnerAccountScreen from './Src/Screen/PartnerAccountScreen';
import PartnerWalletScreen from './Src/Screen/PartnerWalletScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={BottomTabBar} />
          <Stack.Screen name="wishlist" component={BottomTabBar} />
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
            name="PartnerRegister"
            component={PartnerRegisterScreen}
          />
          <Stack.Screen
            name="PartnerVerification"
            component={PartnerVerificationScreen}
          />
          <Stack.Screen
            name="PartnerCatalogue"
            component={PartnerCatalogueScreen}
          />
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
          />
          <Stack.Screen
            name="PartnerOrderHistory"
            component={PartnerOrderHistoryScreen}
          />
          <Stack.Screen
            name="PartnerAccount"
            component={PartnerAccountScreen}
          />
          <Stack.Screen name="PartnerWallet" component={PartnerWalletScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
