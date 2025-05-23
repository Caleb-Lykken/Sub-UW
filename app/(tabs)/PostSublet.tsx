import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; 

const amenities = [
  'Parking', 'Water', 'Trash', 'Electricity',
  'Pet', 'In-Unit Laundry', 'On-unit Laundry', 'Security',
  'Fitness', 'Air Condition', 'Dishwash Machine', 'Pool',
  'Heater Included', 'Online Payment',
];

const accessibility = [
  'Elevator Access', 'Wheel Chair Accessible', 'Accessible Bathroom', 'Ground Floor Access',
  'Service Animal Friendly', 'Visual Aid', 'Hearing Aid', 'Parking Accessibility', 'Accessible Kitchen',
];

export default function PostSublet() {
  const router = useRouter(); 

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedAccess, setSelectedAccess] = useState<string[]>([]);

  const toggleItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Create a Post</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Building Name *</Text>
        <TextInput style={styles.input} placeholder="Ex: The Nine" />

        <Text style={styles.label}>Building Address *</Text>
        <TextInput style={styles.input} placeholder="1234 Ave NE" />

        {/* Dropdowns (can replace with pickers later) */}
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Bedroom Size ▼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Bathroom ▼</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Amenities Included *</Text>
        <View style={styles.grid}>
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
        </View>

        <Text style={styles.section}>Accessibility</Text>
        <View style={styles.grid}>
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
        </View>

        <Text style={styles.section}>Additional Notes</Text>
        <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="Any extra info..." />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => router.push('/MainMenu')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.next]} onPress={() => router.push('/SubletInfo')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  },
  form: {
    padding: 16,
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
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 14,
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
