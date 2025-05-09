import { SafeAreaView, StyleSheet, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import HomeBack from '@/assets/images/HomeBack.png';
import WordMark from '@/assets/images/WordMark.png';
import Logo from '@/assets/images/Logo.png';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} >
      <ImageBackground
        source={HomeBack}
        resizeMode="cover"
        style={styles.background}
      >
        <Image source={WordMark} style={styles.wordmark} resizeMode="contain" />
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <SafeAreaView style={styles.overlay}>
          <TouchableOpacity style={styles.button} onPress={() => router.navigate('/Signin')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.navigate('/SignUp')}>
            <Text style={styles.signUpText}>
              Don’t have an account? <Text style={styles.highlight}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#7a4dd6',
    paddingTop: 60,
    paddingBottom: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0
  },
  overlay: {
    backgroundColor: '#333',
    paddingTop: '10%',
    paddingBottom: '10%',
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  wordmark: {
    width: '80%',
    bottom: '15%',
  },
  logo: {
    width: '100%',
    bottom: '10%',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: 'black',
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