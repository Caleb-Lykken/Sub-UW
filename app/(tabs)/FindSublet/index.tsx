import {
  SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput,
  TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
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

const amenities = [
  'Parking', 'Water', 'Trash', 'Electricity',
  'Pet', 'In-Unit Laundry', 'In-Building Laundry', 'Security',
  'Fitness', 'Air Conditioning', 'Dishwasher', 'Pool',
  'Heater', 'Online Payment',
];

const accessibility = [
  'Elevator Access', 'Wheel Chair Accessible', 'Accessible Bathroom', 'Ground Floor Access',
  'Service Animal Friendly', 'Visual Aid', 'Hearing Aid', 'Parking Accessibility', 'Accessible Kitchen',
];

const bedrooms = [1, 2, 3, 4, 5];

const bathrooms = [1, 1.5, 2, 3, 4,];

export default function FindSublet() {
  {/* Routing and listing fetching for sublet feed */ }
  const router = useRouter();
  const [listings, setListings] = useState<SubletListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  {/* State for filter options */ }
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

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

  {/* Filtering function */ }
  const filteredListings = listings.filter(listing => {
    const lStart = new Date(listing.startDate);
    const lEnd   = new Date(listing.endDate);

    const fStart = startDate ? new Date(startDate) : null;
    const fEnd   = endDate   ? new Date(endDate)   : null;

    return (
      (!selectedBedrooms || listing.bedrooms === selectedBedrooms) &&
      (!selectedBathrooms || listing.bathrooms === selectedBathrooms) &&
      (!minPrice || listing.price >= parseInt(minPrice)) &&
      (!maxPrice || listing.price <= parseInt(maxPrice)) &&
      selectedFeatures.every(a => listing.features.includes(a)) &&

      // date filtering
      (!fStart || lStart >= fStart) &&          // begins on/after filter start
      (!fEnd   || lEnd   <= fEnd)               // ends   on/before filter end
    );
  });

  const clearForm = () => {
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");
    setSelectedBedrooms(null);
    setSelectedBathrooms(null);
    setSelectedFeatures([]);
  };

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
        <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
          <Ionicons name="options-outline" size={24} color="#333" style={styles.optionsIcon} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Sublet Feed */}
      <ScrollView contentContainerStyle={styles.feedContainer}>
        <Text style={styles.sectionTitle}>Recommended</Text>

        {/* Sublet Card */}
        {filteredListings.map((item) => (
          <TouchableOpacity onPress={() => router.push(`FindSublet/Sublet/${String(item.id)}` as any)} key={item.id}>
            <SafeAreaView key={item.id} style={styles.card}>

              {/* Card Photo */}
              <SafeAreaView style={styles.imagePlaceholder}>
                {/* Replace with actual image */}
                {/* <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: 150 }} /> */}
                <Image source={PlaceHolder} style={styles.imagePlaceholder} resizeMode="cover" />
                <Text style={styles.priceTag}>${item.price}</Text>
              </SafeAreaView>

              {/* Card Content */}
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

      {/* Filter Modal */}
      <Modal visible={isFilterVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Sublets</Text>

            {/* Price Range */}
            <Text style={styles.modalHeader}>Price Range</Text>
            <TextInput placeholder="Min Price" value={minPrice} onChangeText={setMinPrice} style={styles.input} />
            <TextInput placeholder="Max Price" value={maxPrice} onChangeText={setMaxPrice} style={styles.input} />

            {/* Start/End Dates */}
            <Text style={styles.modalHeader}>Start Date</Text>
            <TextInput
              placeholder="MM/DD/YYYY"
              value={startDate}
              onChangeText={setStartDate}
              style={styles.input}
            />

            <Text style={styles.modalHeader}>End Date</Text>
            <TextInput
              placeholder="MM/DD/YYYY"
              value={endDate}
              onChangeText={setEndDate}
              style={styles.input}
            />

            {/* Bedroom/Bathroom selectors */}
            <Text style={styles.modalHeader}>Bedrooms</Text>
            <View style={styles.tagContainer}>
              {bedrooms.map(num => (
                <TouchableOpacity key={num} onPress={() => setSelectedBedrooms(num)}
                  style={[styles.tag, selectedBedrooms === num && styles.tagSelected]}>
                  <Text>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalHeader}>Bathrooms</Text>
            <View style={styles.tagContainer}>
              {bathrooms.map(num => (
                <TouchableOpacity key={num} onPress={() => setSelectedBathrooms(num)}
                  style={[styles.tag, selectedBathrooms === num && styles.tagSelected]}>
                  <Text>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Amenities & Accessibility – checkboxes or toggle style */}
            <Text style={styles.modalHeader}>Amenities</Text>
            <View style={styles.tagContainer}>
              {amenities.map(amenity => (
                <TouchableOpacity key={amenity} onPress={() =>
                  setSelectedFeatures(prev =>
                    prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
                  )}
                  style={[styles.tag, selectedFeatures.includes(amenity) && styles.tagSelected]}>
                  <Text>{amenity}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalHeader}>Amenities</Text>
            <View style={styles.tagContainer}>
              {accessibility.map(amenity => (
                <TouchableOpacity key={amenity} onPress={() =>
                  setSelectedFeatures(prev =>
                    prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
                  )}
                  style={[styles.tag, selectedFeatures.includes(amenity) && styles.tagSelected]}>
                  <Text>{amenity}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Cancel/Reset/Apply */}
            <View style={styles.modalButtonRow}>

              <TouchableOpacity onPress={() => setIsFilterVisible(false)} style={styles.button}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                clearForm();
                setIsFilterVisible(false);
              }} style={styles.button}>
                <Text>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                setIsFilterVisible(false);
                // Apply filter logic here
              }} style={styles.button}>
                <Text>Apply</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#2e2e2e',
    marginHorizontal: '5%',
    marginVertical: '10%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalHeader: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tagSelected: {
    backgroundColor: '#d4a0ff',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
  