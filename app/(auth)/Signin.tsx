import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';




export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} keyboardType="email-address" />

      <SafeAreaView style={styles.passwordRow}>
        <Text style={styles.label}>Password</Text>
      </SafeAreaView>
      <TextInput style={styles.input} secureTextEntry />
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.rememberRow}>
      <Checkbox
        value={rememberMe}
        onValueChange={setRememberMe}
        color={rememberMe ? 'white' : undefined}
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </SafeAreaView>

      <TouchableOpacity style={styles.signInButton} onPress={() => router.replace('/MainMenu')}>
      <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: '5%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    color: 'white',
    marginTop: 16,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#444',
    padding: 12,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 6,
    color: 'white',
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgot: {
    color: 'yellow',
    marginRight: 20,
    fontSize: 12,
    textAlign: 'right',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: '5%',
    marginRight: '5%',
  },
  rememberText: {
    color: 'white',
    marginLeft: 8,
  },
  signInButton: {
    backgroundColor: '#b283dc',
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  signInText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
