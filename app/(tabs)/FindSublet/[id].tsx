import { SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
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

export default function Sublet() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [listing, setListing] = useState<SubletListing | null>(null);

  console.log("Got sublet ID:", id);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "Sublets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing({
          id: docSnap.id,
          ...(docSnap.data() as Omit<SubletListing, "id">),
        });
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top gradient banner */}
      <SafeAreaView style={styles.banner}>
        <Text style={styles.bannerText}>Sublet Details</Text>
      </SafeAreaView>

      <ScrollView>
        {/* Listing Photos */}
        <SafeAreaView style={styles.imagePlaceholderContainer}>
          {/* Replace with actual image */}
          {/* <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: 150 }} /> */}
          <Image style={styles.imagePlaceholder} source={PlaceHolder} resizeMode="cover" />
          <Text style={styles.priceTag}>${listing.price}</Text>
        </SafeAreaView>

        {/* Address, Start/End Dates, Bed/Baths */}
        <SafeAreaView style={styles.section}>
          <Text style={styles.sectionTitle}>{listing.address}</Text>

          <Text style={styles.date}>Available from {listing.startDate} to {listing.endDate}</Text>
          <Text style={styles.bedBath}>{`${listing.bedrooms} bed, ${listing.bathrooms} bath`}</Text>
        </SafeAreaView>
          
        {/* Features list */}
        <SafeAreaView style={styles.section}>
          <Text style={styles.sectionHeader}>Features</Text>
          <SafeAreaView style={styles.grid}>
            {listing.features.map((item: string) => (
              <TouchableOpacity key={item} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </SafeAreaView>

        {/* Description */}
        <SafeAreaView style={styles.section}>
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.desc}>{listing.description}</Text>
        </SafeAreaView>

        {/* Contact */}
        <TouchableOpacity style={styles.contact} onPress={() => router.navigate('/Profile')}>
          <Text style={styles.contactText}>Contact</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  section: {
    color: '#fff',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 6,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionText: {
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 16,
  },
  imagePlaceholderContainer: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
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
    fontSize: 16,
  },
  address: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  desc: {
    color: '#ddd',
    fontSize: 16,
  },
  date: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 4,
  },
  bedBath:{
    color: '#ccc',
    fontSize: 16,
    marginTop: 4,
  },
  contact: {
    marginTop: 24,
    marginRight: '35%',
    marginLeft: '35%',
    marginBottom: 24,
    backgroundColor: '#8a2be2',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactText: {
    color: 'white',
    fontWeight: 'bold',
  },
});