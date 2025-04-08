import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BackIcon from '../assets/Images/Backward.png';
import ForwardIcon from '../assets/Images/Forward.png';

const CustomCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={styles.checkboxBase}
      onPress={() => onValueChange(!value)}>
      {value && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.backButtonWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>Looks like you are new here!</Text>

              <TextInput
                style={styles.input}
                placeholder="Name*"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.staticPhone}>+91 – 6370100190</Text>

              <TextInput
                style={styles.input}
                placeholder="E-mail ID*"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <View style={styles.checkboxContainer}>
                <CustomCheckbox
                  value={isSubscribed}
                  onValueChange={setIsSubscribed}
                />
                <Text style={styles.checkboxText}>Email me for offers and updates.</Text>
              </View>
            </View>
          </ScrollView>

          {/* Button at the bottom */}
          <View style={styles.bottomSection}>
          <TouchableOpacity 
  style={styles.registerButton}  
  onPress={() => navigation.navigate('Home')} 
>
  <View style={styles.registerContent}>
    <Text style={styles.registerText}>REGISTER</Text>
    <Image source={ForwardIcon} style={styles.forwardIcon} />
  </View>
</TouchableOpacity>

            <Text style={styles.footerText}>
              Having trouble logging in?{' '}
              <Text style={styles.whatsappText}>Whatsapp Us</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    padding: 25,
    paddingTop: 80,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
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
  },
  staticPhone: {
    fontSize: 16,
    marginBottom: 25,
    color: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 12,
    color: '#555',
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#D86427',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: '#D86427',
    borderRadius: 2,
  },
  bottomSection: {
    padding: 25,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#D86427',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 15,
  },
  registerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forwardIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  whatsappText: {
    color: '#D86427',
    fontWeight: '600',
  },
});
