import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SubletInfo() {
    const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sublet Information</Text>
      </View>

      {/* Duration */}
      <Text style={styles.label}>Sublet Duration<Text style={styles.required}>*</Text></Text>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="mm/dd/yyyy" />
        <Text style={styles.toText}>to</Text>
        <TextInput style={styles.input} placeholder="mm/dd/yyyy" />
      </View>

      {/* Payment */}
      <Text style={styles.label}>Monthly Payment<Text style={styles.required}>*</Text></Text>
      <TextInput style={styles.input} placeholder="$-----" keyboardType="numeric" />

      {/* Photos */}
      <Text style={styles.label}>Photos<Text style={styles.required}>*</Text></Text>
      <View style={styles.photoGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={styles.photoBox}>
            <Text style={styles.plus}>＋</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.label}>Additional Description</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder="Add details about your sublet..."
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/PostSublet')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3c3c3c',
    padding: 20,
    paddingBottom: 60,
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#802fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontStyle: 'italic',
  },
  label: {
    color: 'white',
    marginBottom: 4,
    fontWeight: '600',
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  toText: {
    alignSelf: 'center',
    color: 'white',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  photoBox: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  plus: {
    fontSize: 28,
    color: '#555',
  },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#a85ff0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  postButton: {
    backgroundColor: '#8000b3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
