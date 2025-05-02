import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For search/filter icons
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase';

interface SubletListing {
  id: string;
  address: string;
  description: string;
  features: string[];
  price: number;
  bathrooms: number;
  bedrooms: number;
  isAvailable: boolean;
  title: string;
  userID: string;
  startDate: string;
  endDate: string;
}

export default function FindSublet() {
  const [listings, setListings] = useState<SubletListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Posts"));
        const data: SubletListing[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<SubletListing, "id">),
        }));
        setListings(data);
        // console.log(data);
      } catch (error) {
        console.error("Failed to load sublets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

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

        {listings.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.imagePlaceholder}>
              {/* Replace with actual image */}
              {/* <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: 150 }} /> */}
              <Text style={styles.priceTag}>${item.price}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.desc}>{`${item.bedrooms} Bedroom, ${item.bathrooms} Bathroom`}</Text>
              <Text style={styles.date}>{`${item.startDate} - ${item.endDate}`}</Text>
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
  