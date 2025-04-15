import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For search/filter icons

export default function FindSublet() {
  return (
    <View style={styles.container}>
      {/* Top gradient banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Look for Sublets</Text>

        {/* Search bar with filter button */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search (Building Name, address etc.)"
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => console.log('Filter tapped')}>
            <Ionicons name="options-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sublet Feed */}
      <ScrollView contentContainerStyle={styles.feedContainer}>
        <Text style={styles.sectionTitle}>Recommended</Text>

        {/* Mock Listings */}
        {[1, 2].map((item) => (
          <View key={item} style={styles.card}>
            <View style={styles.imagePlaceholder}>
              {/* In future, replace with: <Image source={{ uri: imageUrl }} /> */}
              <Text style={styles.priceTag}>${item === 1 ? '2200' : '1600'}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.address}>Building Address*</Text>
              <Text style={styles.desc}>{item === 1 ? '- 5 Bedroom,' : '- 2 Bedroom,'}</Text>
              <Text style={styles.date}>
                {item === 1 ? '05/14/2025–08/27/2025' : '06/13/2025–09/20/2025'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2e2e2e',
    },
    banner: {
      backgroundColor: '#7a4dd6',
      paddingTop: 60,
      paddingBottom: 30,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      alignItems: 'center',
    },
    bannerText: {
      fontSize: 24,
      color: 'white',
      fontWeight: '600',
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 12,
      borderRadius: 12,
      width: '85%',
      height: 42,
      gap: 6,
    },
    searchIcon: {
      marginRight: 4,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
    },
    feedContainer: {
      padding: 16,
    },
    sectionTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    card: {
      backgroundColor: '#5c3f8c',
      borderRadius: 12,
      marginBottom: 20,
      overflow: 'hidden',
    },
    imagePlaceholder: {
      height: 160,
      backgroundColor: '#aaa',
      justifyContent: 'center',
      alignItems: 'center',
    },
    priceTag: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: '#6fff9f',
      color: '#006400',
      fontWeight: 'bold',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      fontSize: 14,
    },
    cardContent: {
      padding: 12,
    },
    address: {
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    desc: {
      color: '#ddd',
      fontSize: 13,
    },
    date: {
      color: '#ccc',
      fontSize: 12,
      marginTop: 4,
    },
  });
  