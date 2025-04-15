import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import HeaderImage from '@/assets/images/Mainmenu.png'; 

export default function MainMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={HeaderImage} style={styles.headerImage} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.locationButton}>📍 Location</Text>
          <Text style={styles.headerText}>Find Your Perfect{'\n'}Sublet Match with Us.</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.title}>Home page</Text>

        <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonBox} onPress={() => router.push('/FindSublet')}>
            <Text style={styles.buttonIcon}>📍</Text>
            <Text style={styles.buttonText}>Find Sublets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBox} onPress={() => router.push('/PostSublet')}>
            <Text style={styles.buttonIcon}>📤</Text>
            <Text style={styles.buttonText}>Post Sublets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBox} onPress={() => router.push('/EditProfile')}>
          <Text style={styles.buttonIcon}>👤</Text>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
  },
  headerContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  locationButton: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 10,
  },
  headerText: {
    color: '#e5b6ff',
    fontSize: 22,
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBox: {
    backgroundColor: '#c793f9',
    width: '30%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
  },
});