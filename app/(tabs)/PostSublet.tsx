import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from '@/firebase';

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

export default function PostSublet() {
  const [address, setAddress] = useState<string>();
  const [rent, setRent] = useState<string>();
  const [selectedBedrooms, setSelectedBedrooms] = useState<number>();
  const [selectedBathrooms, setSelectedBathrooms] = useState<number>();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedAccess, setSelectedAccess] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [listing, setListing] = useState<SubletListing>();

  const toggleItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const clearForm = () => {
    setAddress("");
    setRent("");
    setStartDate("");
    setEndDate("");
    setSelectedBedrooms(undefined);
    setSelectedBathrooms(undefined);
    setSelectedAmenities([]);
    setSelectedAccess([]);
    setDescription("");
  };

  const handleSubmit = async () => {
  if (!address || !rent || !startDate || !endDate || !selectedBedrooms || !selectedBathrooms) {
    alert("Please fill in all required fields.");
    return;
  }

  const newListing: Omit<SubletListing, "id"> = {
    address,
    price: parseFloat(rent),
    startDate,
    endDate,
    bedrooms: selectedBedrooms,
    bathrooms: selectedBathrooms,
    features: [...selectedAmenities, ...selectedAccess],
    description: description || "",
    userID: "demoUser123", // replace with auth user ID if using auth
  };

  try {
    await addDoc(collection(db, "Sublets"), newListing);
    alert("Listing posted!");
    // Optionally reset state or navigate
  } catch (error) {
    console.error("Error posting sublet:", error);
    alert("Failed to post listing.");
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Banner */}
      <SafeAreaView style={styles.banner}>
        <Text style={styles.bannerText}>Post a Sublet</Text>
      </SafeAreaView>

      {/* Form */}
      <SafeAreaView style={styles.form}>
        <Text style={styles.label}>Building Address *</Text>
        <TextInput style={styles.input}
          placeholder="Ex. 1234 Ave NE"
          value={address}
          onChangeText={setAddress}/>

        <Text style={styles.label}>Current Rent *</Text>
        <TextInput style={styles.input}
          placeholder="Ex. 1100"
          inputMode='numeric'
          value={rent}
          onChangeText={setRent}/>

        <Text style={styles.label}>Start Date *</Text>
        <TextInput style={styles.input}
          placeholder="MM/DD/YYYY"
          value={startDate}
          onChangeText={setStartDate}/>

        <Text style={styles.label}>End Date *</Text>
        <TextInput style={styles.input}
          placeholder="MM/DD/YYYY"
          value={endDate}
          onChangeText={setEndDate}/>

        {/* Bed and Bath Selection */}
        <Text style={styles.label}>Number of Bedrooms *</Text>
        <SafeAreaView style={styles.grid}>
          {bedrooms.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tag2,
                item == selectedBedrooms && styles.tagSelected
              ]}
              onPress={() => setSelectedBedrooms(item)}
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>

        <Text style={styles.label}>Number of Bathrooms *</Text>
        <SafeAreaView style={styles.grid}>
          {bathrooms.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tag2,
                item == selectedBathrooms && styles.tagSelected
              ]}
              onPress={() => setSelectedBathrooms(item)}
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>

        {/* Tags list */}
        <Text style={styles.section}>Amenities Included *</Text>
        <SafeAreaView style={styles.grid}>
          {amenities.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tag,
                selectedAmenities.includes(item) && styles.tagSelected
              ]}
              onPress={() => toggleItem(item, selectedAmenities, setSelectedAmenities)}
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>

        <Text style={styles.section}>Accessibility</Text>
        <SafeAreaView style={styles.grid}>
          {accessibility.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.tag,
                selectedAccess.includes(item) && styles.tagSelected
              ]}
              onPress={() => toggleItem(item, selectedAccess, setSelectedAccess)}
            >
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>

        <Text style={styles.section}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline placeholder="Any extra info..."
          value={description}
          onChangeText={setDescription}/>
      </SafeAreaView>

      {/* Cancel and Confirm buttons */}
      <SafeAreaView style={styles.buttonRow}>

        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={clearForm}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.next]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      paddingBottom: 40,
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
    form: {
      padding: 16,
      width: '80%',
      marginTop: 16,
      marginLeft: '10%',
      marginRight: '10%',
    },
    label: {
      color: 'white',
      marginBottom: 6,
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
    },
    section: {
      color: '#fff',
      marginTop: 12,
      marginBottom: 8,
      fontWeight: 'bold',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    tag: {
      backgroundColor: 'white',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    tag2: {
      backgroundColor: 'white',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      width: '15%',
      alignItems: 'center',
    },
    tagSelected: {
      backgroundColor: '#d4a0ff',
    },
    tagText: {
      fontSize: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      marginTop: 10,
    },
    button: {
      flex: 1,
      marginHorizontal: 8,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
    },
    cancel: {
      backgroundColor: '#c14f7a',
    },
    next: {
      backgroundColor: '#8a2be2',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  