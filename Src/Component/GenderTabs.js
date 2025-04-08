import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryGrid from './CategoryGrid';
import { useNavigation } from '@react-navigation/native'; 

const GenderTabs = ({ herData, himData }) => {
  const [activeTab, setActiveTab] = useState('her');
  const navigation = useNavigation(); 

  const handleItemPress = (item) => {
    navigation.navigate('SubCategory'); 
  };

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('her')} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === 'her' && styles.activeTabText]}>For Her</Text>
          {activeTab === 'her' && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('him')} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === 'him' && styles.activeTabText]}>For Him</Text>
          {activeTab === 'him' && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>

      <CategoryGrid 
        data={activeTab === 'her' ? herData : himData} 
        onItemPress={handleItemPress} 
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  underline: {
    height: 2,
    backgroundColor: 'orange',
    width: 60,
    marginTop: 4,
  },
});

export default GenderTabs;
