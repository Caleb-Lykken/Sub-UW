import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';




export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} keyboardType="email-address" />

      <View style={styles.passwordRow}>
        <Text style={styles.label}>Password</Text>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} secureTextEntry />

      <View style={styles.rememberRow}>
      <Checkbox
        value={rememberMe}
        onValueChange={setRememberMe}
        color={rememberMe ? 'white' : undefined}
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={() => router.replace('/MainMenu')}>
      <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 24,
    justifyContent: 'center',
    borderRadius: 24,
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
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#444',
    padding: 12,
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
    fontSize: 12,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
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
    alignItems: 'center',
  },
  signInText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
