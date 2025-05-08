import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import AvatarIcon from '@/assets/images/Profile.png'; 

export default function EditProfile() {
  const [isUWStudent, setIsUWStudent] = useState(true);

  return (
    <View style={styles.container}>
      {/* Purple top banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Profile</Text>
      </View>

      <View style={styles.avatarWrapper}>
        <Image source={AvatarIcon} style={styles.avatar} />
        <TouchableOpacity style={styles.editIcon}>
          <Text>📷</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit Post</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} placeholder="Your name" />

        <Text style={styles.label}>Email address *</Text>
        <TextInput style={styles.input} keyboardType="email-address" placeholder="you@uw.edu" />

        <Text style={styles.label}>UW Student?</Text>
        <View style={styles.switchRow}>
          <TouchableOpacity onPress={() => setIsUWStudent(true)}>
            <Text style={[styles.switchBtn, isUWStudent && styles.activeSwitch]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsUWStudent(false)}>
            <Text style={[styles.switchBtn, !isUWStudent && styles.activeSwitch]}>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Pronoun</Text>
        <TextInput style={styles.input} placeholder="He/Him" />

        <Text style={styles.labelItalic}>Personal Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Personal Info"
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2e2e2e',
      alignItems: 'center',
    },
    banner: {
      backgroundColor: '#7a4dd6',
      paddingTop: 60,
      paddingBottom: 30,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
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
      right: 10,
      backgroundColor: 'white',
      padding: 6,
      borderRadius: 20,
    },
    editBtn: {
      marginTop: 10,
      backgroundColor: '#b18fff',
      paddingVertical: 8,
      paddingHorizontal: 24,
      borderRadius: 16,
    },
    editText: {
      color: 'white',
      fontWeight: '600',
    },
    form: {
      marginTop: 20,
      width: '85%',
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
      backgroundColor: '#d9534f',
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 12,
    },
    logoutText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  