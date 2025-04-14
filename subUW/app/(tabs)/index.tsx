import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import HomeScreenImg from '@/assets/images/HomeScreen.png';
import Logo from '@/assets/images/Logo.png';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={HomeScreenImg}
        resizeMode="contain"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />

          <TouchableOpacity style={styles.button} onPress={() => router.push('/Signin')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/SignUp')}>
            <Text style={styles.signUpText}>
              Don’t have an account? <Text style={styles.highlight}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 160,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpText: {
    color: 'white',
    fontSize: 14,
  },
  highlight: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default HomeScreen;


