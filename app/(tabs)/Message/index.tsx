import {
  SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput,
  TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For search/filter icons
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import PlaceHolder from '@/assets/images/master_chief.png';
import Profile from '@/assets/images/Profile.png';

export default function Message() {
  {/* Routing and listing fetching for sublet feed */ }
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top gradient banner */}
      <SafeAreaView style={styles.banner}>
        <Text style={styles.bannerText}>Messages</Text>
      </SafeAreaView>

      {/* Search bar*/}
      <SafeAreaView style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </SafeAreaView>

      {/* Contacts */}
      <ScrollView contentContainerStyle={styles.feedContainer}>
        <Text style={styles.sectionTitle}>Contacts</Text>

        {/* Example contact list */}
        {['Master Chief', 'Bob', 'Charlie'].map((name, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(`/Message/${name}`)}
          >
            <View style={styles.cardContent}>
              <Image source={Profile} style={styles.avatar} />

              <View style={styles.cardColumn1}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.lastMessage}>Last message...</Text>
              </View>
              
              <View style={styles.cardColumn2}>
                <Text style={styles.date}>5 mins</Text>
              </View>
            </View>
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderBottomColor: '#555555',
  },
  imagePlaceholder: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 6,
  },
  cardColumn1: {
    height: '100%',
    flexDirection: 'column',
  },
  cardColumn2: {
    height: '100%',
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 4,
  },
  lastMessage: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 4,
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
});
  