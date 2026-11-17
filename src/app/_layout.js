import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import { AppProvider } from '../context/AppContext';

// Configure how notifications appear
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const triggerNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome back to CineTrack! 🍿",
        body: "Check out your favorite movies today.",
      },
      trigger: { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2 
      },
    });
  } catch (err) {
    console.warn('Failed to schedule notification:', err);
  }
};

export default function RootLayout() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // 1. Request Permissions & configure channel for Android
    async function requestPermissions() {
      try {
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        await Notifications.requestPermissionsAsync();
      } catch (err) {
        console.warn('Notification permission error:', err);
      }
    }
    requestPermissions();

    // 2. AppState Listener
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if ((appState.current === 'inactive' || appState.current === 'background') && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        triggerNotification();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: 'Movie Details' }} />
      </Stack>
    </AppProvider>
  );
}
