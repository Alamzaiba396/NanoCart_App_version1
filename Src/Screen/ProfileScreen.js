import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

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
          placeholder="Anuradha Sharma"
          placeholderTextColor="#999"
        />

        <Text style={styles.inputTitle}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="+91-6370100190"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />

        <Text style={styles.inputTitle}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="anuradha.s@gmail.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default ProfileScreen;
