import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SizeChartScreen = () => {
  const navigation = useNavigation();
  const [unit, setUnit] = useState('inches');
  const [selectedSize, setSelectedSize] = useState(null);

  const sizeData = {
    inches: {
      headers: ['Size', 'Chest', 'Shoulder', 'Length'],
      data: [
        { size: 'XS', chest: 38, shoulder: 16, length: 27 },
        { size: 'S', chest: 40, shoulder: 17, length: 28 },
        { size: 'M', chest: 42, shoulder: 18, length: 29 },
        { size: 'L', chest: 44, shoulder: 19, length: 30 },
        { size: 'XL', chest: 46, shoulder: 20, length: 31 },
        { size: '2XL', chest: 48, shoulder: 21, length: 32 },
        { size: '3XL', chest: 50, shoulder: 22, length: 33 },
      ],
    },
    cm: {
      headers: ['Size', 'Chest', 'Shoulder', 'Length'],
      data: [
        { size: 'XS', chest: 96.5, shoulder: 40.6, length: 68.6 },
        { size: 'S', chest: 101.6, shoulder: 43.2, length: 71.1 },
        { size: 'M', chest: 106.7, shoulder: 45.7, length: 73.7 },
        { size: 'L', chest: 111.8, shoulder: 48.3, length: 76.2 },
        { size: 'XL', chest: 116.8, shoulder: 50.8, length: 78.7 },
        { size: '2XL', chest: 121.9, shoulder: 53.3, length: 81.3 },
        { size: '3XL', chest: 127, shoulder: 55.9, length: 83.8 },
      ],
    },
  };

  const CustomCheckbox = ({ isSelected, onPress }) => {
    return (
      <TouchableOpacity
        style={[styles.checkbox, isSelected && styles.checkboxSelected]}
        onPress={onPress}
      >
        {isSelected && <Icon name="check" size={14} color="#fff" />}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SIZE CHART - UNISEX HOODIES</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, unit === 'inches' && styles.activeTab]}
          onPress={() => setUnit('inches')}
        >
          <Text style={[styles.tabText, unit === 'inches' && styles.activeTabText]}>In Inches</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, unit === 'cm' && styles.activeTab]}
          onPress={() => setUnit('cm')}
        >
          <Text style={[styles.tabText, unit === 'cm' && styles.activeTabText]}>In CM</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {sizeData[unit].headers.map((header, index) => (
            <Text key={index} style={styles.tableHeaderText}>{header}</Text>
          ))}
        </View>
        {sizeData[unit].data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <CustomCheckbox
                isSelected={selectedSize === row.size}
                onPress={() => setSelectedSize(row.size === selectedSize ? null : row.size)}
              />
              <Text style={styles.tableCellText}>{row.size}</Text>
            </View>
            <Text style={styles.tableCell}>{row.chest}</Text>
            <Text style={styles.tableCell}>{row.shoulder}</Text>
            <Text style={styles.tableCell}>{row.length}</Text>
          </View>
        ))}
      </View>

      <View style={styles.howToMeasureSection}>
        <Text style={styles.howToMeasureTitle}>How to Measure</Text>
        <View style={styles.howToMeasureContent}>
          <Text style={styles.howToMeasureText}>Chest:</Text>
          <Text style={styles.howToMeasureDescription}>
            Measure around the body under the arms at the fullest part of the chest with your arms relaxed at both sides.
          </Text>
          <Text style={styles.howToMeasureText}>Shoulder:</Text>
          <Text style={styles.howToMeasureDescription}>
            Measure the shoulder at the back, from edge to edge with arms relaxed on both sides.
          </Text>
          <Text style={styles.howToMeasureText}>Length:</Text>
          <Text style={styles.howToMeasureDescription}>
            Measure from the highest point of the shoulder seam to the bottom hem of the garment.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')} style={styles.wishlistButton}>
          <Icon name="heart" size={16} color="#F57C00" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>WISHLIST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Icon name="shopping-cart" size={16} color="#fff" style={styles.buttonIcon} />
          <Text style={[styles.buttonText, { color: '#fff' }]}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SizeChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 20, // Header slightly lower
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#F57C00',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#F57C00',
    fontWeight: 'bold',
  },
  table: {
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  tableCellText: {
    textAlign: 'center',
    color: '#333',
    marginLeft: 10, // Adjust spacing after checkbox
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkboxSelected: {
    backgroundColor: '#F57C00',
    borderColor: '#F57C00',
  },
  howToMeasureSection: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff5e6',
    borderRadius: 5,
  },
  howToMeasureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 10,
  },
  howToMeasureContent: {
    marginTop: 5,
  },
  howToMeasureText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  howToMeasureDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  wishlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F57C00',
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F57C00',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: '#F57C00',
    fontSize: 14,
    fontWeight: 'bold',
  },
});