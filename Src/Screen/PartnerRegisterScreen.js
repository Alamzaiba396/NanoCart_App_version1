import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const BackIcon = require('../assets/Images/Backward.png');

const CustomCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity style={styles.checkboxBase} onPress={() => onValueChange(!value)}>
      {value && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );
};

const PartnerRegisterScreen = ({ navigation }) => {
  const [name] = useState('Anuradha Sharma');
  const [email] = useState('anuradha.s@gmail.com');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [shopName, setShopName] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [pincode, setPincode] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Looks like you are new here!</Text>

          <TextInput style={styles.input} value={name} editable={false} />
          <Text style={styles.input}>+91 - 6370100190</Text>
          <TextInput style={styles.input} value={email} editable={false} />

          <View style={styles.checkboxContainer}>
            <CustomCheckbox value={isSubscribed} onValueChange={setIsSubscribed} />
            <Text style={styles.checkboxText}>Email me for offers and updates.</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Shop Name*"
            value={shopName}
            onChangeText={setShopName}
            placeholderTextColor="#aaa"
          />

          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="GST No."
              value={gst}
              onChangeText={setGst}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="PAN No.*"
              value={pan}
              onChangeText={setPan}
              placeholderTextColor="#aaa"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Shop Address*"
            value={shopAddress}
            onChangeText={setShopAddress}
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={styles.input}
            placeholder="Pincode*"
            value={pincode}
            onChangeText={setPincode}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />

          {/* Register Button */}
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('PartnerVerification')}>
            <Text style={styles.registerButtonText}>REGISTER</Text>
            <Icon name="arrowright" size={18} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Having trouble logging in? <Text style={styles.whatsappText}>Whatsapp Us</Text>
          </Text>

          {/* Upload Section */}
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Shop Image*</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadText}>
                Upload <Icon name="upload" size={14} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PartnerRegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 99,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 25,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxBase: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#D86427',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#D86427',
    borderRadius: 1,
  },
  checkboxText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#555',
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: '#D86427',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  whatsappText: {
    color: '#D86427',
    fontWeight: '600',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: 14,
    color: '#444',
  },
  uploadButton: {
    backgroundColor: '#F28C38',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  uploadText: {
    color: '#fff',
    fontSize: 14,
  },
});
