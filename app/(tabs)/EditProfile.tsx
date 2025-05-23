import {
  SafeAreaView, ScrollView, Text, StyleSheet,
  TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AvatarIcon from '@/assets/images/Profile.png'; 

export default function EditProfile() {
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

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit Post</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} placeholder="Your name" />

        <Text style={styles.label}>Email address *</Text>
        <TextInput style={styles.input} keyboardType="email-address" placeholder="you@uw.edu" />

        <Text style={styles.label}>UW Student?</Text>
        <SafeAreaView style={styles.switchRow}>
          <TouchableOpacity onPress={() => setIsUWStudent(true)}>
            <Text style={[styles.switchBtn, isUWStudent && styles.activeSwitch]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsUWStudent(false)}>
            <Text style={[styles.switchBtn, !isUWStudent && styles.activeSwitch]}>No</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <Text style={styles.label}>Pronoun</Text>
        <TextInput style={styles.input} placeholder="He/Him" />

        <Text style={styles.labelItalic}>Personal Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Personal Info"
        />
      </SafeAreaView>

      {/* Logout */}
      <TouchableOpacity style={styles.logout} onPress={() => router.navigate('/')}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
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
    form: {
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
    },
    label: {
      color: 'white',
      marginBottom: 4,
      marginTop: 10,
    },
    labelItalic: {
      color: 'white',
      fontStyle: 'italic',
      marginBottom: 4,
      marginTop: 10,
    },
    input: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
    },
    switchRow: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 12,
    },
    switchBtn: {
      backgroundColor: '#555',
      color: 'white',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    activeSwitch: {
      backgroundColor: '#f0c',
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
  