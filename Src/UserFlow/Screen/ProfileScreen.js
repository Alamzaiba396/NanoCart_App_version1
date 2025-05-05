
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation=useNavigation();
  const token = useSelector(state => state.auth.token);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('📦 Fetching profile...');
        const response = await fetch('http://10.0.2.2:4000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('👤 Profile Data:', data);

        if (response.ok && data?.data) {
          setName(data.data.name || '');
          setEmail(data.data.email || '');
          setMobile(data.data.phoneNumber || '');
        } else {
          Alert.alert('Error', 'Failed to load profile');
        }
      } catch (err) {
        console.log(' Error fetching profile:', err);
        Alert.alert('Error', 'Something went wrong');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      Alert.alert('Login Required', 'Please log in to view your profile');
      navigation.navigate('Login');
    }
  }, [token]);

  const handleSave = async () => {
    try {
      const payload = {
        name,
        email,
      };

      console.log(' Updating profile with:', payload);

      const response = await fetch('http://10.0.2.2:4000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(' PUT Response:', data);

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate('Account'); // Navigate to MyAccount after saving
      } else {
        Alert.alert('Error', data.message || 'Update failed');
      }
    } catch (error) {
      console.log(' Error updating profile:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor="#999"
        />

        <Text style={styles.inputTitle}>Mobile</Text>
        <TextInput
          style={[styles.input, { color: '#999' }]}
          value={mobile}
          editable={false}
          placeholder="Mobile number"
        />

        <Text style={styles.inputTitle}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputTitle: {
    fontSize: 14,
    marginBottom: 4,
    color: '#777',
  },
  input: {
    fontSize: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 25,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#D86427',
    paddingVertical: 14,
    marginTop: 'auto',
    marginBottom: 20,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
