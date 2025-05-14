import { SafeAreaView, StyleSheet, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import WordMark from '@/assets/images/WordMark.png';
import Logo from '@/assets/images/logo_large.png';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} >
      <SafeAreaView style={styles.banner}>
        <Image source={WordMark} style={styles.wordmark} resizeMode="contain" />
      </SafeAreaView>

      <SafeAreaView style={styles.background}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </SafeAreaView>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#7a4dd6',
    paddingTop: 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#333',
    paddingTop: '10%',
    paddingBottom: '10%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  wordmark: {
    width: '80%',
    bottom: '0%',
  },
  logo: {
    width: '100%',
    bottom: '15%',
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