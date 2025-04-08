import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, ScrollView } from 'react-native';

const FilterComponent = ({ onClose }) => {
  const [filters, setFilters] = React.useState({
    color: { Printed: false, Solid: true, 'Woven Design': false },
    pattern: { Checked: true, Colourblocked: false, Dyed: false },
    occasion: { Embroidered: true },
    type: { Striped: false },
    border: false,
  });

  const handleFilterChange = (category, option) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: !prev[category][option],
      },
    }));
  };

  const applyFilters = () => {
    console.log('Applied filters:', filters);
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>FILTER</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* Color */}
        <Text style={styles.sectionTitle}>Color (7)</Text>
        {Object.keys(filters.color).map((option) => (
          <View key={option} style={styles.optionRow}>
            <CheckBox
              value={filters.color[option]}
              onValueChange={() => handleFilterChange('color', option)}
              tintColors={{ true: '#D86427', false: '#000' }}
            />
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}

        {/* Pattern */}
        <Text style={styles.sectionTitle}>Pattern (4)</Text>
        {Object.keys(filters.pattern).map((option) => (
          <View key={option} style={styles.optionRow}>
            <CheckBox
              value={filters.pattern[option]}
              onValueChange={() => handleFilterChange('pattern', option)}
              tintColors={{ true: '#D86427', false: '#000' }}
            />
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}

        {/* Occasion */}
        <Text style={styles.sectionTitle}>Occasion (3)</Text>
        {Object.keys(filters.occasion).map((option) => (
          <View key={option} style={styles.optionRow}>
            <CheckBox
              value={filters.occasion[option]}
              onValueChange={() => handleFilterChange('occasion', option)}
              tintColors={{ true: '#D86427', false: '#000' }}
            />
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}

        {/* Type */}
        <Text style={styles.sectionTitle}>Type</Text>
        {Object.keys(filters.type).map((option) => (
          <View key={option} style={styles.optionRow}>
            <CheckBox
              value={filters.type[option]}
              onValueChange={() => handleFilterChange('type', option)}
              tintColors={{ true: '#D86427', false: '#000' }}
            />
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}

        {/* Border */}
        <Text style={styles.sectionTitle}>Border</Text>
        <View style={styles.optionRow}>
          <CheckBox
            value={filters.border}
            onValueChange={() => handleFilterChange('border', 'border')}
            tintColors={{ true: '#D86427', false: '#000' }}
          />
          <Text style={styles.optionText}>Border</Text>
        </View>

        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#D86427',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterComponent;