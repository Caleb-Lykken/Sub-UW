import { SafeAreaView, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For search/filter icons
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import PlaceHolder from '@/assets/images/placeholder.png';

// UNFINISHED
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

export default function Sublet() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Details of user {id} </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});