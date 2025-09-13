import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {


const [fontsLoaded] = useFonts({ // without map
  "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
  "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
  "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
  "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
  "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
});

useEffect(() => {
  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded]); // without deps

if(!fontsLoaded)return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
