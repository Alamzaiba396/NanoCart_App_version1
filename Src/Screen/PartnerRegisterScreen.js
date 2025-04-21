import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';

const CustomCheckbox = ({value, onValueChange}) => {
  return (
    <TouchableOpacity
      style={styles.checkboxBase}
      onPress={() => onValueChange(!value)}>
      {value && <View style={styles.checkboxTick} />}
    </TouchableOpacity>
  );
};

const PartnerRegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [shopname, setShopname] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [shopaddress, setShopaddress] = useState('');
  const [pincode, setPincode] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.backButtonWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
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
                <Text style={styles.checkboxText}>
                  Email me for offers and updates.
                </Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Shop Name*"
                placeholderTextColor="#aaa"
                value={shopname}
                onChangeText={setShopname}
              />
              <View style={styles.requiredNo}>
                <TextInput
                  style={styles.input}
                  placeholder="GST No.*"
                  placeholderTextColor="#aaa"
                  value={gst}
                  onChangeText={setGst}
                />
                <TextInput
                  style={styles.input}
                  placeholder="PAN No.*"
                  placeholderTextColor="#aaa"
                  value={pan}
                  onChangeText={setPan}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Shop Address*"
                placeholderTextColor="#aaa"
                value={shopaddress}
                onChangeText={setShopaddress}
              />
              <TextInput
                style={styles.input}
                placeholder="Pincode"
                placeholderTextColor="#aaa"
                value={pincode}
                onChangeText={setPincode}
              />
            </View>
          </ScrollView>

          {/* Button at the bottom */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('PartnerVerification')}>
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

          <View style={styles.uploadContainer}>
            <Text style={styles.label}>
              Shop Image<Text style={{color: '#F4A261'}}>*</Text>
            </Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.buttonText}>
                Upload
                <Icon
                  name="upload"
                  size={16}
                  color="#fff"
                  style={{marginLeft: 20}}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PartnerRegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  label: {
    color: '#757575',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#D86427',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
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
  requiredNo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  uploadButton: {
    backgroundColor: '#F28C38',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  uploadContainer: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
