import { SafeAreaView, View, ScrollView, Text, StyleSheet,
  TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PlaceHolder from '@/assets/images/master_chief.png';

export default function Contact() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Contact name header */}
      <View style={styles.header}>
        <Image source={PlaceHolder} style={styles.avatar} />
        <Text style={styles.headerText}>{name}</Text>
      </View>

      {/* Chat messages */}
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {/* Incoming message */}
        <View>
          <View style={styles.incomingMessage}>
            <Text style={styles.incomingText}>Hey! Are you still looking for a sublet?</Text>
          </View>
          <View style={styles.incomingBubble}/>
        </View>

        {/* Outgoing message */}
        <View>
          <View style={styles.outgoingMessage}>
            <Text style={styles.outgoingText}>Yes! I'm interested in the one near campus.</Text>
          </View>
          <View style={styles.outgoingBubble}/>
        </View>
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputRow}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e'
  },
  banner: {
    backgroundColor: '#7a4dd6',
    paddingTop: 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  header: {
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#555555',
    marginHorizontal: '5%',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesContainer: {
    paddingVertical: '5%',
    paddingHorizontal: 10,
  },
  incomingMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginLeft: 15,
    maxWidth: '75%',
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6E00FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginRight: 15,
    maxWidth: '75%',
  },
  incomingText: {
    fontSize: 16,
  },
  incomingBubble: {
    alignSelf: 'flex-start',
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    bottom: 10,
  },
  outgoingText: {
    color: 'white',
    fontSize: 16,
  },
  outgoingBubble: {
    alignSelf: 'flex-end',
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#6E00FF',
    bottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    margin: '5%',
  },
  input: {
    color: 'white',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#6E00FF',
    borderRadius: 20,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
  },
});