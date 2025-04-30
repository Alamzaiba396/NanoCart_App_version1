import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BackIcon from '../../assets/Images/Backward.png';
import {useNavigation} from '@react-navigation/native';

const PartnerVerificationScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Partner Verification</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter the partner verification code"
          placeholderTextColor="#757575"
          value={code}
          onChangeText={setCode}
        />

        <Text style={styles.subText}>
          Don’t have one? <Text style={styles.link}>Whatsapp Us</Text>
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Partner Registration is incomplete without the code.
            {'\n'}If you're unable to reach us, don't worry!
            {'\n'}Our team will contact you shortly.
          </Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Home')}>
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={navigation.navigate('PartnerAccount')}>
          <Text style={styles.buttonText}>GET STARTED</Text>
          <Icon name="arrowright" size={18} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PartnerVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  content: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: 'serif',
    fontWeight: '500',
    color: '#000',
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 25,
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  link: {
    color: '#D86427',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#D2691E0D',
    padding: 12,
    borderRadius: 4,
  },
  infoText: {
    color: '#696969',
    fontSize: 14,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#D86427',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 'auto',
    marginBottom: 25,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
