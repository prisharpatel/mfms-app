import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';
import messaging from '@react-native-firebase/messaging';

import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';

// Function to request notification permissions
const requestUserPermission = async () => {
  // On iOS, we need to request permission first
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // Get the FCM token
      getFcmToken();
    } else {
      console.log('Notification permission denied');
    }
  } else {
    // On Android, permissions are granted automatically for standard notifications
    // For Android 13+ (API level 33+), we need to request the POST_NOTIFICATIONS permission
    // Note: This would require additional code with the permissions package
    getFcmToken();
  }
};

// Function to get FCM token
const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Store this token on your server for sending notifications
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

export default function App() {
  useEffect(() => {
    requestUserPermission();

    // Set up notification handlers
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      // Handle foreground notifications here
      // You can use a local notification library to show it to the user
    });

    // Set background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background notification received:', remoteMessage);
      // Handle background notifications here
    });

    // Clean up subscription
    return () => unsubscribeOnMessage();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate
          loading={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <View style={styles.container}>
              <ActivityIndicator color={colors.red} />
            </View>
          }
          persistor={persistor}
        >
          <AppView />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
