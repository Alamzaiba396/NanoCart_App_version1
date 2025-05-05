import React, { useState, useEffect } from 'react';
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

const FilterComponent = ({ onClose }) => {
  const [filtersData, setFiltersData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch('http://10.0.2.2:4000/api/filter');
        const json = await res.json();
        console.log('🎯 Fetched filters:', json);
        if (json.success) {
          const mappedFilters = {};
          json.data.forEach((filter) => {
            mappedFilters[filter.key] = {};
            filter.values.forEach((val) => {
              mappedFilters[filter.key][val] = false;
            });
          });
          setFiltersData(json.data);
          setFilters(mappedFilters);
          setSelectedCategory(json.data[0]?.key);
        }
      } catch (error) {
        console.error('❌ Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (category, option) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: !prev[category][option],
      },
    }));
  };

  const clearAll = () => {
    const cleared = {};
    filtersData.forEach((filter) => {
      cleared[filter.key] = {};
      filter.values.forEach((val) => {
        cleared[filter.key][val] = false;
      });
    });
    setFilters(cleared);
  };

  const applyFilters = async () => {
    console.log('✅ Applied filters:', filters);
  
    // Build query params from selected filters
    const queryParams = [];
  
    Object.keys(filters).forEach((key) => {
      const selectedValues = Object.entries(filters[key])
        .filter(([_, isSelected]) => isSelected)
        .map(([val]) => val);
  
      if (selectedValues.length > 0) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(selectedValues.join(','))}`);
      }
    });
  
    const queryString = queryParams.join('&');
    const apiUrl = `http://10.0.2.2:4000/api/items/filtersitems?${queryString}`;
  
    console.log('🌐 Fetching filtered items from:', apiUrl);
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('📦 Filtered items:', data);
      // You can pass data back to parent or update state here if needed
      onClose();
    } catch (error) {
      console.error('❌ Error applying filters:', error);
    }
  };
  

  const renderOptions = () => {
    if (!selectedCategory || !filters[selectedCategory]) return null;
    return Object.keys(filters[selectedCategory]).map((option) => (
      <View key={option} style={styles.optionRow}>
        <CustomCheckbox
          value={filters[selectedCategory][option]}
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
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left Side */}
          <ScrollView style={styles.leftColumn}>
            {filtersData.map((cat) => (
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
                  {cat.key} ({cat.values.length})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Right Side */}
          <View style={styles.rightColumn}>
            <ScrollView>{renderOptions()}</ScrollView>
          </View>
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
    color: '#F36F25',
    fontWeight: 'bold',
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#f9f9f9',
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  rightColumn: {
    flex: 1,
    padding: 15,
  },
  categoryButton: {
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  activeCategory: {
    backgroundColor: '#EFE2D8',
  },
  activeCategoryText: {
    color: '#F36F25',
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#F36F25',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    backgroundColor: '#F36F25',
    borderColor: '#F36F25',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FilterComponent;