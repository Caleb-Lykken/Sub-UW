import {
  SafeAreaView, ScrollView, Text, StyleSheet,
  TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AvatarIcon from '@/assets/images/Profile.png'; 

export default function Profile() {
  const router = useRouter();
  const [isUWStudent, setIsUWStudent] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* Purple top banner */}
      <SafeAreaView style={styles.banner}>
        <Text style={styles.bannerText}>Profile</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.avatarWrapper}>
        <Image source={AvatarIcon} style={styles.avatar} />
        <TouchableOpacity style={styles.editIcon}>
          <Text>📷</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <TouchableOpacity style={styles.editBtn} onPress={() => router.navigate('/Profile/EditProfile')}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.section}>
        <Text style={styles.sectionTitle}>Name</Text>

        <Text style={styles.sectionHeader}>Email Address</Text>
        <Text style={styles.sectionText}>hotmail@gmail.edu</Text>

        <Text style={styles.sectionHeader}>Phone Number</Text>
        <Text style={styles.sectionText}>123-456-7890</Text>

        <Text style={styles.sectionHeader}>Pronouns</Text>
        <Text style={styles.sectionText}>He/Him</Text>

        <Text style={styles.sectionHeader}>Personal Description</Text>
        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
            qui officia deserunt mollit anim id est laborum.</Text>

      </SafeAreaView>
    </ScrollView>
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
        width: '100%',
    },
    bannerText: {
        fontSize: 24,
        color: 'white',
        fontWeight: '600',
    },
    avatarWrapper: {
        marginTop: -40,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
        backgroundColor: '#ccc',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: '40%',
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 20,
    },
    editBtn: {
        marginTop: 10,
        marginRight: '35%',
        marginLeft: '35%',
        backgroundColor: '#b18fff',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
    },
    editText: {
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
        marginTop: 12,
        marginBottom: 4,
    },
    sectionText: {
        color: '#ddd',
    },
    logout: {
        marginTop: 24,
        marginRight: '35%',
        marginLeft: '35%',
        marginBottom: 24,
        backgroundColor: '#d9534f',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
});