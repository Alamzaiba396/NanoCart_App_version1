import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PartnerProfileScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('');
  const [mapLink, setMapLink] = useState('');

  useEffect(() => {
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
        if (response.ok && data?.data) {
          const d = data.data;
          setName(d.name || '');
          setEmail(d.email || '');
          setMobile(d.phoneNumber || '');
          setShopName(d.shopName || '');
          setGstNo(d.gstNo || '');
          setPanNo(d.panNo || '');
          setShopAddress(d.shopAddress || '');
          setPincode(d.pincode || '');
          setTown(d.town || '');
          setState(d.state || '');
          setMapLink(d.mapLink || '');
        } else {
          Alert.alert('Error', 'Failed to load profile');
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong');
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <InputLabel title="Name" value={name} onChange={setName} />
        <InputLabel title="Mobile" value={`+91-${mobile}`} editable={false} />
        <InputLabel title="Email ID" value={email} onChange={setEmail} />
        <InputLabel title="Shop Name" value={shopName} onChange={setShopName} />
        <InputLabel title="GST No" value={gstNo} onChange={setGstNo} />
        <InputLabel title="PAN No" value={panNo} onChange={setPanNo} />
        <InputLabel title="Shop Address" value={shopAddress} onChange={setShopAddress} />
        <InputLabel title="Pincode" value={pincode} onChange={setPincode} />
        <InputLabel title="Town/City" value={town} onChange={setTown} />
        <InputLabel title="State" value={state} onChange={setState} />
        <InputLabel title="Google Map Address Link" value={mapLink} onChange={setMapLink} />
      </ScrollView>
    </View>
  );
};

const InputLabel = ({ title, value, onChange, editable = true }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{title}</Text>
    <TextInput
      style={[styles.input, !editable && { color: '#999' }]}
      value={value}
      editable={editable}
      onChangeText={onChange}
    />
  </View>
);

export default PartnerProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.8,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    fontSize: 15,
    color: '#000',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
