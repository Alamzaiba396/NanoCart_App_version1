// import React, { useState } from 'react'; 
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import CategoryGrid from './CategoryGrid';
// import { useNavigation } from '@react-navigation/native'; 

// const GenderTabs = ({ herData, himData }) => {
//   const [activeTab, setActiveTab] = useState('her');
//   const navigation = useNavigation(); 

//   const handleItemPress = (item) => {
//     navigation.navigate('SubCategory'); 
//   };

//   return (
//     <View>
//       <View style={styles.tabContainer}>
//         <TouchableOpacity onPress={() => setActiveTab('her')} style={styles.tab}>
//           <Text style={[styles.tabText, activeTab === 'her' && styles.activeTabText]}>For Her</Text>
//           {activeTab === 'her' && <View style={styles.underline} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('him')} style={styles.tab}>
//           <Text style={[styles.tabText, activeTab === 'him' && styles.activeTabText]}>For Him</Text>
//           {activeTab === 'him' && <View style={styles.underline} />}
//         </TouchableOpacity>
//       </View>

//       <CategoryGrid 
//         data={activeTab === 'her' ? herData : himData} 
//         onItemPress={handleItemPress} 
//       />
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   tab: {
//     alignItems: 'center',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#888',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   underline: {
//     height: 2,
//     backgroundColor: 'orange',
//     width: 60,
//     marginTop: 4,
//   },
// });
// export default GenderTabs;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import CategoryGrid from './CategoryGrid';
// import { useNavigation } from '@react-navigation/native';

// const GenderTabs = () => {
//   const [categories, setCategories] = useState([]);
//   const [activeTab, setActiveTab] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetch('http://192.168.1.24:4000/api/category')
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.success && Array.isArray(json.data)) {
//           setCategories(json.data);
//           setActiveTab(json.data[0]?._id);
//           fetchSubCategories(json.data[0]?._id);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching categories:', err);
//       });
//   }, []);

//   const fetchSubCategories = (categoryId) => {
//     setLoading(true);
//     fetch(`http://192.168.1.24:4000/api/subcategory/categories/${categoryId}/?page=1&limit=6`)
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.success && json.data?.subCategories) {
//           setSubCategories(json.data.subCategories);
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching subcategories:', err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleTabPress = (categoryId) => {
//     setActiveTab(categoryId);
//     fetchSubCategories(categoryId);
//   };

//   const handleItemPress = (item) => {
//     navigation.navigate('SubCategory', { subCategory: item });
//   };

//   return (
//     <View>
//       {/* Horizontal Tabs */}
//       <FlatList
//         data={categories}
//         keyExtractor={(item) => item._id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.tabContainer}
//         renderItem={({ item: category }) => (
//           <TouchableOpacity
//             onPress={() => handleTabPress(category._id)}
//             style={styles.tab}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === category._id && styles.activeTabText,
//               ]}
//             >
//               For {category.name}
//             </Text>
//             {activeTab === category._id && <View style={styles.underline} />}
//           </TouchableOpacity>
//         )}
//       />

//       {/* Subcategories Grid */}
//       {loading ? (
//         <ActivityIndicator size="large" color="orange" style={styles.loader} />
//       ) : (
//         <CategoryGrid data={subCategories} onItemPress={handleItemPress} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//     paddingHorizontal: 10,
//   },
//   tab: {
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#888',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   underline: {
//     height: 2,
//     backgroundColor: 'orange',
//     width: 60,
//     marginTop: 4,
//   },
//   loader: {
//     marginTop: 20,
//   },
// });
// export default GenderTabs;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import CategoryGrid from './CategoryGrid';
import { useNavigation } from '@react-navigation/native';

const GenderTabs = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // fetch category api here  :
  useEffect(() => {
    fetch('http://10.0.2.2:4000/api/category')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
          setActiveTab(json.data[0]?._id);
          fetchSubCategories(json.data[0]?._id);
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);


  //  fetch the subcategory here
  const fetchSubCategories = (categoryId) => {
    setLoading(true);
    fetch(`http://10.0.2.2:4000/api/subcategory/categories/${categoryId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.subCategories) {
          setSubCategories(json.data.subCategories);
        }
      })
      .catch((err) => {
        console.error('Error fetching subcategories:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  // for category tab press
  const handleTabPress = (categoryId) => {
    setActiveTab(categoryId);
    fetchSubCategories(categoryId);
  };


  // for subcategory item press
  const handleItemPress = (item) => {
    navigation.navigate('SubCategory', { subCategory: item });
  };

  return (
    <View>
      {/* Horizontal Tabs */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            onPress={() => handleTabPress(category._id)}
            style={styles.tab}>
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

      {/* Subcategories Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="orange" style={styles.loader} />
      ) : (
        <CategoryGrid data={subCategories} onItemPress={handleItemPress} />
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
    fontWeight: 'bold',
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
});

export default GenderTabs;