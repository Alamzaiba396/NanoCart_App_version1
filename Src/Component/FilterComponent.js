import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={onValueChange}
    style={[styles.checkboxBase, value && styles.checkboxChecked]}
  >
    {value && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const categories = [
  { key: 'color', label: 'Color (7)' },
  { key: 'priceRange', label: 'Price Range' },
  { key: 'pattern', label: 'Pattern (4)' },
  { key: 'fabric', label: 'Fabric' },
  { key: 'occasion', label: 'Occasion (3)' },
  { key: 'type', label: 'Type' },
  { key: 'border', label: 'Border' },
  { key: 'filter1', label: 'Filter 1' },
  { key: 'filter2', label: 'Filter 2' },
  { key: 'filter3', label: 'Filter 3' },
];

const FilterComponent = ({ onClose }) => {
  const [filters, setFilters] = useState({
    color: { Printed: false, Solid: true, 'Woven Design': false },
    pattern: { Checked: true, Colourblocked: true, Dyed: false },
    occasion: { Embellished: false, Embroidered: true },
    type: { Striped: false },
    border: false,
  });

  const [selectedCategory, setSelectedCategory] = useState('color');

  const handleFilterChange = (category, option) => {
    if (category === 'border') {
      setFilters((prev) => ({
        ...prev,
        border: !prev.border,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [option]: !prev[category][option],
        },
      }));
    }
  };

  const clearAll = () => {
    setFilters({
      color: { Printed: false, Solid: false, 'Woven Design': false },
      pattern: { Checked: false, Colourblocked: false, Dyed: false },
      occasion: { Embellished: false, Embroidered: false },
      type: { Striped: false },
      border: false,
    });
  };

  const applyFilters = () => {
    console.log('Applied filters:', filters);
    onClose();
  };

  const renderOptions = () => {
    if (selectedCategory === 'priceRange' || selectedCategory === 'fabric') {
      return (
        <Text style={styles.placeholderText}>
          {selectedCategory === 'priceRange'
            ? 'Select price range'
            : 'Select fabric'}
        </Text>
      );
    }

    if (['filter1', 'filter2', 'filter3'].includes(selectedCategory)) {
      return <Text style={styles.placeholderText}>{selectedCategory}</Text>;
    }

    const options = filters[selectedCategory];

    if (typeof options === 'boolean') {
      return (
        <View style={styles.optionRow}>
          <CustomCheckbox
            value={filters.border}
            onValueChange={() => handleFilterChange('border')}
          />
          <Text style={styles.optionText}>Border</Text>
        </View>
      );
    }

    return Object.keys(options).map((option) => (
      <View key={option} style={styles.optionRow}>
        <CustomCheckbox
          value={options[option]}
          onValueChange={() => handleFilterChange(selectedCategory, option)}
        />
        <Text style={styles.optionText}>{option}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FILTER</Text>
          <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        {/* Main Body */}
        <View style={styles.body}>
          {/* Left Side Menu */}
          <View style={styles.leftColumn}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat.key && styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(cat.key)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.key && styles.activeCategoryText,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Right Side Options */}
          <ScrollView style={styles.rightColumn}>
            {renderOptions()}
          </ScrollView>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '90%',
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 5,
  },
  clearText: {
    fontSize: 14,
    color: '#D86427',
    fontWeight: '600',
  },
  body: {
    flexDirection: 'row',
    height: '75%',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  rightColumn: {
    width: '65%',
    padding: 15,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  activeCategory: {
    backgroundColor: '#EFE2D8',
  },
  activeCategoryText: {
    color: '#D86427',
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
  },
  applyButton: {
    backgroundColor: '#D86427',
    padding: 14,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#D86427',
    borderColor: '#D86427',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FilterComponent;
