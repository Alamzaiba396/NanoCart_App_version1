import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Src/Screen/SplashScreen";
import LoginScreen from "./Src/Screen/LoginScreen";
import VerificationScreen from "./Src/Screen/VerificationScreen";
import RegisterScreen from "./Src/Screen/RegisterScreen";
import BottomTabBar from "./Src/Component/BottomTabBar";
import AccountScreen from "./Src/Screen/AccountScreen";
import PromoBanner from "./Src/Component/PromoBanner";
import CardSlider from "./Src/Component/CardSlider";
import SearchCategory from "./Src/Screen/SearchCategory";
import SubCategoryScreen from "./Src/Screen/SubCategoryScreen";
import ProductDetailScreen from "./Src/Screen/ProductDetailScreen";
import ProductDetailPhotoScreen from "./Src/Screen/ProductDetailPhotoScreen";
import SizeChartScreen from "./Src/Screen/SizeChartScreen";
import CartScreen from "./Src/Screen/CartScreen";
import DeliveryAddressScreen from "./Src/Screen/DeliveryAddressScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={BottomTabBar} />
        <Stack.Screen name="wishlist" component={BottomTabBar} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Promo" component={PromoBanner} />
        <Stack.Screen name="Card" component={CardSlider} />
        <Stack.Screen name="Search" component={SearchCategory} />
        <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductDetailPhoto" component={ProductDetailPhotoScreen} />
        <Stack.Screen name="SizeChart" component={SizeChartScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Delivery" component={DeliveryAddressScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="VerifyOtp" component={VerificationScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
