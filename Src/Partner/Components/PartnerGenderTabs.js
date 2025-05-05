import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import PartnerCategoryGrid from './PartnerCategoryGrid';

const PartnerGenderTabs = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fetch categories on mount
  useEffect(() => {
    setLoading(true);
    fetch('http://10.0.2.2:4000/api/category')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);

          // Set the first category ("For Her") as the default active tab
          const firstCategoryId = json.data[0]?._id;
          if (firstCategoryId) {
            setActiveTab(firstCategoryId);
          } else {
            console.warn('No categories found in API response');
          }
        } else {
          console.warn('Failed to load categories:', json.message);
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch subcategories when activeTab changes
  useEffect(() => {
    if (!activeTab) return;

    setLoading(true);
    setSubCategories([]); // Clear previous subcategories to avoid stale data
    fetch(`http://10.0.2.2:4000/api/subcategory/categories/${activeTab}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.subCategories) {
          setSubCategories(json.data.subCategories);
        } else {
          console.warn('Failed to load subcategories:', json.message);
          setSubCategories([]); // Ensure subCategories is empty if fetch fails
        }
      })
      .catch((err) => {
        console.error('Error fetching subcategories:', err);
        setSubCategories([]); // Ensure subCategories is empty on error
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

  const handleTabPress = (categoryId) => {
    if (categoryId !== activeTab) {
      setActiveTab(categoryId);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('PartnerSubCategory', { subCategory: item });
  };

  return (
    <View>
      {/* Tabs */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            onPress={() => handleTabPress(category._id)}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === category._id && styles.activeTabText,
              ]}
            >
              For {category.name}
            </Text>
            {activeTab === category._id && <View style={styles.underline} />}
          </TouchableOpacity>
        )}
      />

      {/* Subcategory Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loader} />
      ) : subCategories.length === 0 ? (
        <Text style={styles.noDataText}>No subcategories available</Text>
      ) : (
        <PartnerCategoryGrid data={subCategories} onItemPress={handleItemPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold:',
  },
  underline: {
    height: 2,
    backgroundColor: 'orange',
    width: 60,
    marginTop: 4,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
});

export default PartnerGenderTabs;