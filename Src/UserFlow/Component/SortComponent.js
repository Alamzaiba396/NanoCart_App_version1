import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SortComponent = ({ onClose, onApplySort }) => {
  const [selectedSort, setSelectedSort] = React.useState('popularity');

  const sortOptions = [
    { label: 'latest', value: 'latest' },
    { label: 'popularity', value: 'popularity' },
    { label: 'priceHighToLow', value: 'price_desc' },
    { label: 'priceLowToHigh', value: 'price_asc' },
    { label: 'Offers & discount', value: 'discount' },
  ];

  const applySort = () => {
    onApplySort(selectedSort);
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>SORT BY</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.optionRow}
            onPress={() => setSelectedSort(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === option.value && styles.selectedOption,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.applyButton} onPress={applySort}>
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
    maxHeight: '50%',
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
  optionRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 14,
  },
  selectedOption: {
    color: '#D86427',
    fontWeight: 'bold',
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

export default SortComponent;
