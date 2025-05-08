import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TouchableOpacity style={styles.imageUpload}>
        <Text style={{ fontSize: 24 }}></Text>
      </TouchableOpacity>

      <TextInput placeholder="Full name" style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" placeholderTextColor="#ccc" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#ccc" />
      <TextInput placeholder="Confirm your password" style={styles.input} secureTextEntry placeholderTextColor="#ccc" />

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign up</Text>
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
    marginBottom: 24,
  },
  imageUpload: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 6,
    color: 'white',
    marginBottom: 12,
  },
  signUpButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  signUpText: {
    fontWeight: 'bold',
    color: '#333',
  },
});
