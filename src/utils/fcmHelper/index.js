
// import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
// import {PERMISSIONS, request} from 'react-native-permissions';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken, isDeviceRegisteredForRemoteMessages, registerDeviceForRemoteMessages, unregisterDeviceForRemoteMessages, deleteToken, requestPermission, onMessage, getInitialNotification, setBackgroundMessageHandler, AuthorizationStatus } from '@react-native-firebase/messaging';

const app = getApp();
const messaging = getMessaging(app);

// method was called to get FCM token for notification
export const getFcmToken = async () => {
    let token = null; 
    await checkApplicationNotificationPermission();
    await registerAppWithFCM();

    try {
        token = await getToken(messaging);
        console.log('FCM Token: ', token);
    } catch (error) {
        console.log('FCM Token Error: ', error);
    }

    return token;
};

// method called on user reigster with firebase fcm for notification
export async function registerAppWithFCM() {
    console.log(
        'registerAppWithFCM status',
        isDeviceRegisteredForRemoteMessages(messaging),
    );

    if (!isDeviceRegisteredForRemoteMessages(messaging)) {
        try {
            await registerDeviceForRemoteMessages(messaging);
            console.log('registerDeviceForRemoteMessages success');
        } catch (error) {
            console.log('registerDeviceForRemoteMessages error', error);
        }
    }
};

// method called to stopp user from receiving notifications through unregistering them
export async function unregisterAppWithFCM() {
    console.log('unregisterAppWithFCM status', isDeviceRegisteredForRemoteMessages(messaging));

    if (isDeviceRegisteredForRemoteMessages(messaging)) {
        try {
            await unregisterDeviceForRemoteMessages(messaging);
            console.log('unregisterDeviceForRemoteMessages success');
        } catch (error) {
            console.log('unregisterDeviceForRemoteMessages error', error);
        }
    }

    await deleteToken(messaging);
    console.log('unRegisterAppWithFCM status', isDeviceRegisteredForRemoteMessages(messaging));
}

// Method to check and request notification permission

export const checkApplicationNotificationPermission = async () => {
    try {
        // Request permission for iOS devices
        const authStatus = await requestPermission(messaging);
        
        const enabled = 
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log("Authorization status:", authStatus);
            return true;
        } else {
            console.log("User notification permission denied or restricted");
            return false;
        }
    } catch (error) {
        console.log("Request permission error: ", error);
        return false;
    };
}


//listener events from firebase for notification trigger
export function registerListenerWithFCM() {
    const unsubscribe = onMessage(messaging, async (remoteMessage) => {
        console.log('onMessageReceived: ', JSON.stringify(remoteMessage));

        if (remoteMessage?.notification?.title && remoteMessage?.notification?.body) {
            onDisplayNotification(
                remoteMessage.notification.title,
                remoteMessage.notification.body,
                remoteMessage?.data,
            );
        }
    });
    notifee.onForegroundEvent(async ({ type, detail }) => {
        switch(type) {
            case EventType.DISMISSED:
                console.log('User dismissed the notification:', detail.notification);
                break;
            case EventType.PRESS:
                console.log('User pressed the notification:', detail.notification);
                break;
        }

    });

    // Check if an initial notification is available
    getInitialNotification(messaging).then(remoteMessage => {
        if (remoteMessage) {
            console.log( 'Notification caused app to open from quit state:', remoteMessage);
        }
    });

    return unsubscribe;
}

// method to display notification

async function onDisplayNotification(title, body, data) {
    console.log('onDisplayNotification: ', JSON.stringify(data));

    // request permissions ios
    await notifee.requestPermission(); 

    // display notification
    await notifee.displayNotification ({
        title: title,
        body: body, 
        data: data, 
    })
}

// Optional: Add a listener for when notification is received while app is in foreground
export const setupForegroundNotificationListener = () => {
    return onMessage(messaging, async (remoteMessage) => {
        console.log('Notification received in foreground!', JSON.stringify(remoteMessage));
        // Handle foreground notification display here
        // You can use a local notification library like react-native-push-notification
        // to show notifications when the app is in foreground
    });
}

// Background message handler function
export const setupBackgroundHandler = () => {
    // Setting background message handler - this must be done early in app initialization
    setBackgroundMessageHandler(messaging, async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
        // Handle background notifications here
    });
}