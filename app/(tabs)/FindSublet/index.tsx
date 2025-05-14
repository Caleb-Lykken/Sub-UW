import { SafeAreaView, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For search/filter icons
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import PlaceHolder from '@/assets/images/placeholder.png';

interface SubletListing {
  id: string;
  address: string;
  description: string;
  features: string[];
  price: number;
  bathrooms: number;
  bedrooms: number;
  userID: string;
  startDate: string;
  endDate: string;
}

export default function FindSublet() {
  const router = useRouter();
  const [listings, setListings] = useState<SubletListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Sublets"));
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
    <SafeAreaView style={styles.container}>
      {/* Top gradient banner */}
      <SafeAreaView style={styles.banner}>
        <Text style={styles.bannerText}>Find a Sublet</Text>
      </SafeAreaView>
      {/* Search bar with filter button */}
      <SafeAreaView style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search (Building Name, address etc.)"
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={() => console.log('Filter tapped')}>
          <Ionicons name="options-outline" size={24} color="#333" style={styles.optionsIcon} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Sublet Feed */}
      <ScrollView contentContainerStyle={styles.feedContainer}>
        <Text style={styles.sectionTitle}>Recommended</Text>

        {listings.map((item) => (
          <TouchableOpacity>
            <SafeAreaView key={item.id} style={styles.card}>
              <SafeAreaView style={styles.imagePlaceholder}>
                {/* Replace with actual image */}
                {/* <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: 150 }} /> */}
                <Image source={PlaceHolder} style={styles.imagePlaceholder} resizeMode="cover" />
                <Text style={styles.priceTag}>${item.price}</Text>
              </SafeAreaView>
              <SafeAreaView style={styles.cardContent}>
                <Text style={styles.address}>{item.address}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.desc}>{`${item.bedrooms} bed, ${item.bathrooms} bath`}</Text>
                <Text style={styles.date}>{`${item.startDate} - ${item.endDate}`}</Text>
              </SafeAreaView>
            </SafeAreaView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2e2e2e',
    },
    banner: {
      backgroundColor: '#7a4dd6',
      paddingTop: 30,
      paddingBottom: 40,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      alignItems: 'center',
    },
    bannerText: {
      fontSize: 24,
      color: 'white',
      fontWeight: '600',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 12,
      borderRadius: 12,
      width: '90%',
      height: 42,
      gap: 6,
      marginTop: '-8%',
      marginLeft: '5%',
      marginRight: '5%',
    },
    searchIcon: {
      marginLeft: 6,
      marginRight: 0,
    },
    optionsIcon: {
      marginLeft: 6,
      marginRight: 6,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
    },
    feedContainer: {
      padding: '5%',
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
      width: '100%',
      overflow: 'hidden',
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
      marginTop: 6,
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 6,
    },
    address: {
      color: 'white',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    desc: {
      color: '#ddd',
      fontSize: 12,
    },
    date: {
      color: '#ccc',
      fontSize: 12,
      marginTop: 4,
    },
  });
  