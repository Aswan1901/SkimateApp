// app/_layout.tsx
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MyLightTheme, MyDarkTheme } from '@/constants/navigationThemes';
import NavBar from '@/components/NavBar';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  // Chargement des polices
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Détermine si la NavBar doit être masquée
  const hideNavbar = pathname === '/login' || pathname === '/register';

  const backgroundColor = useThemeColor({}, 'background');
  const navigationTheme = colorScheme === 'dark' ? MyDarkTheme : MyLightTheme;

  if (!fontsLoaded) {
    return null; // le splash reste visible
  }
  return (
      <SafeAreaProvider>
        <ThemeProvider value={navigationTheme}>
          <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <Slot />

            {/* NavBar globale en bas, sauf si "hideNavbar" */}
            {!hideNavbar && <NavBar />}
          </SafeAreaView>

          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
