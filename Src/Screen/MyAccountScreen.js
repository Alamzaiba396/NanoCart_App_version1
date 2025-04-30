import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [name, setName] = useState('');

  const fetchProfile = async () => {
    try {
      console.log(' Fetching Profile API...');
      const response = await fetch('http://10.0.2.2:4000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('✅ Profile API Response:', data);

      if (response.ok && data?.data?.name) {
        setName(data.data.name);
      } else {
        console.warn('⚠️ Failed to fetch name.');
      }
    } catch (error) {
      console.log(' Error fetching profile:', error);
    }
  };

  // 👇 Fetch profile every time screen focuses
  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchProfile();
      }
    }, [token])
  );

  if (!token) {
    return (
      <View style={styles.container}>
        {/* Your "Uh-oh" popup */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/Images/Backward.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>MY ACCOUNT</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/Images/SearchIcon.png')} style={styles.icon} />
            <Image source={require('../assets/Images/CartIcon.png')} style={styles.icon} />
          </View>
        </View>

        <View style={styles.popupContainer}>
          <Text style={styles.uhOhText}>Uh-oh!</Text>
          <Text style={styles.popupSubtitle}>Looks like you haven't logged in!</Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login', { fromScreen: 'MyAccount' })}
          >
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Images/Backward.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>MY ACCOUNT</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../assets/Images/SearchIcon.png')} style={styles.icon} />
          <Image source={require('../assets/Images/CartIcon.png')} style={styles.icon} />
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/Images/Group.png')} style={styles.logo} />
        <Text style={styles.greeting}>Hi, {name || 'User'}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        {[
          { label: 'Profile', route: 'Profile' },
          { label: 'Order History' },
          { label: 'Saved Address' },
          { label: 'Try Before You Buy (TBYB)' },
          { label: 'Become Partner', route: 'PartnerRegister' },
          { label: 'Settings' },
          { label: 'Help Centre' },
          { label: 'Privacy Policy' },
          { label: 'Delete Account' },
          { label: 'Logout Account' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => item.route && navigation.navigate(item.route)}
          >
            <Text style={styles.menuText}>{item.label}</Text>
            <Image source={require('../assets/Images/arrowright.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  backIcon: { width: 20, height: 20, tintColor: '#000' },
  icon: { width: 20, height: 20, marginLeft: 15, tintColor: '#000' },

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

  // 👉 Popup screen styles
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

export default MyAccountScreen;
