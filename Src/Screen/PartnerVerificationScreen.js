import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import ForwardIcon from '../assets/Images/Forward.png';

const PartnerVerificationScreen = () => {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Partner Verification</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter the partner verification code"
          placeholderTextColor="#757575"
        />

        <Text style={styles.subText}>
          Don’t have one? <Text style={styles.link}>Whatsapp Us</Text>
        </Text>

        <Text style={styles.infoText}>
          Partner Registration is incomplete without the code.{'\n'}
          If you're unable to reach us, don't worry!
          {'\n'}
          Our team will contact you shortly.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.getStartButton}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.getStartContent}>
            <Text style={styles.getStartText}>GET STARTED</Text>
            <Icon name="arrowright" style={styles.forwardIcon} />
            {/* <Image source={ForwardIcon} style={styles.forwardIcon} /> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  content: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },

  input: {
    justifyContentcent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 25,
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  link: {
    fontWeight: 'bold',
    color: '#D86427',
    textDecorationLine: 'underline',
  },
  infoText: {
    padding: 10,
    fontSize: 14,
    backgroundColor: '#D2691E0D',
    color: '#696969',
    textAlign: 'center',
    marginBottom: 20,
  },

  getStartButton: {
    marginTop: 50,
    backgroundColor: '#D86427',
    paddingVertical: 14,
    alignItems: 'center',
  },
  getStartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  getStartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forwardIcon: {
    width: 16,
    height: 16,
    tintColor: '#000',
    resizeMode: 'contain',
  },
});

export default PartnerVerificationScreen;
