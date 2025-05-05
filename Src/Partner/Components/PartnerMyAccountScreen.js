import React, { useState, useCallback } from 'react';
import {
  Alert,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';

const PartnerMyAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [name, setName] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://10.0.2.2:4000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data?.data?.name) {
        setName(data.data.name);
      }
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) fetchProfile();
    }, [token])
  );

  const handleDeleteAccount = () => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete the account?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            const response = await fetch('http://10.0.2.2:4000/api/auth', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();
            if (response.ok && data.success) {
              Alert.alert('Deleted', 'Your account has been deleted.', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Login'),
                },
              ]);
            } else {
              Alert.alert('Error', data.message || 'Failed to delete account.');
            }
          } catch (error) {
            Alert.alert('Error', 'Something went wrong while deleting account.');
            console.error(error);
          }
        },
      },
    ]);
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/Images/Back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>MY ACCOUNT</Text>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity>
              <Image source={require('../../assets/Images/SearchIcon.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.cartIconWrapper}>
              <Image source={require('../../assets/Images/Cart.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.popupContainer}>
          <Text style={styles.uhOhText}>Uh-oh!</Text>
          <Text style={styles.popupSubtitle}>Looks like you haven't logged in!</Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login', { fromScreen: 'MyAccount' })}>
            <Text style={styles.loginButtonText}>LOGIN TO CONTINUE</Text>
          </TouchableOpacity>

          <Text style={styles.helpText}>
            Having trouble logging in? <Text style={styles.helpLink}>Whatsapp Us</Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/Images/Back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MY ACCOUNT</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity>
            <Image source={require('../../assets/Images/SearchIcon.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cartIconWrapper}
            onPress={() => {
              if (token) navigation.navigate('Cart');
              else Alert.alert('Login Required', 'Please login to view your cart.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Login', onPress: () => navigation.navigate('Login') },
              ]);
            }}>
            <Image source={require('../../assets/Images/Cart.png')} style={styles.icon} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.profileSection}>
          <Image source={require('../../assets/Images/Group.png')} style={styles.logo} />
          <Text style={styles.greeting}>Hi, {name || 'User'}</Text>
        </View>

        <View style={styles.menu}>
          {[{ label: 'Profile', route: 'Profile' },
            { label: 'Order History' ,route: 'OrderConfirmation'},
            { label: 'Saved Address', route: 'Saved' },
            { label: 'Try Before You Buy (TBYB)' },
            { label: 'Become Partner', route: 'PartnerRegister' },
            { label: 'Settings' },
            { label: 'Help Centre' },
            { label: 'Privacy Policy' },
            { label: 'Delete Account', action: handleDeleteAccount },
            { label: 'Rate Product', route: 'RateProduct' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.route) navigation.navigate(item.route);
                else if (item.action) item.action();
              }}>
              <Text style={styles.menuText}>{item.label}</Text>
              <Image source={require('../../assets/Images/arrowright.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(logout());
            navigation.replace('Login');
          }}
          style={styles.logoutButton}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PartnerMyAccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 32,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', textTransform: 'uppercase' },
  rightIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 22, height: 22, resizeMode: 'contain', marginHorizontal: 8 },
  cartIconWrapper: { position: 'relative' },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  logo: { width: 50, height: 50, marginRight: 15, borderRadius: 8 },
  greeting: { fontSize: 16, fontWeight: '600', color: '#000' },
  menu: { marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuText: { fontSize: 15, color: '#000' },
  arrowIcon: { width: 15, height: 15, tintColor: '#999' },
  logoutButton: {
    backgroundColor: '#DB4E2D',
    paddingVertical: 12,
    marginHorizontal: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uhOhText: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  popupSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  loginButton: {
    backgroundColor: '#f37022',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  helpText: { fontSize: 12, color: '#666' },
  helpLink: { color: '#f37022', fontWeight: 'bold' },
});
