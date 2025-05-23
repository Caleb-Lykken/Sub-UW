import { Redirect, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }}/>;
}