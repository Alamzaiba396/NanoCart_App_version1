import {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import Icon from 'react-native-vector-icons/Ionicons';
  import ForwardIcon from '../assets/Images/Forward.png';
  
  const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Icon name="arrow-back" size={22} color="#000" />
            <Text style={styles.headerTitle}>PROFILE</Text>
          </View>
          <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              value={name}
              onChange={setName}
              placeholder=""
              style={styles.input}></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}>Mobile</Text>
            <TextInput
              value={mobile}
              onChange={setMobile}
              placeholder=""
              style={styles.input}></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}>Email ID</Text>
            <TextInput
              value={email}
              onChange={setEmail}
              placeholder=""
              style={styles.input}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              // onPress={() => navigation.navigate('Home')}
            >
              <View style={styles.saveContent}>
                <Text style={styles.saveText}>SAVE CHANGES</Text>
                <Image source={ForwardIcon} style={styles.forwardIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
      justifyContent: 'space-between',
    },
  
    header: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#aaa',
      fontSize: 16,
      paddingVertical: 10,
      marginBottom: 20,
    },
    inputTitle: {
      fontSize: 16,
      marginBottom: 5,
      color: '#696969',
    },
    saveButton: {
      backgroundColor: '#D86427',
      paddingVertical: 14,
      alignItems: 'center',
      borderRadius: 4,
      marginBottom: 15,
    },
    saveContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    saveText: {
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
  });
  export default ProfileScreen;
  
  