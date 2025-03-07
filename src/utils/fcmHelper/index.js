
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
// import {PERMISSIONS, request} from 'react-native-permissions';

// method was called to get FCM token for notification
export const getFcmToken = async () => {
    let token = null; 
    await checkApplicationNotificationPermission();
    await registerAppWithFCM();

    try{
        token = await messaging().getToken();
        console.log('FCM Token: ', token);

    }catch (error) {
        console.log('FCM Token Error: ', error);
    }

    return token;
};

// method called on user reigster with firebase fcm for notification
export async function registerAppWithFCM() {
    console.log(
        'registerAppWithFCM status',
        messaging().isDeviceRegisteredForRemoteMessages,
    )

    if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging()
        .registerDeviceForRemoteMessages()
        .then(status => {
            console.log('registerDeviceForRemoteMessages status', status);
        })
        .catch(error => {
            console.log('registerDeviceForRemoteMessages error', error);
        });
    }
};

// method called to stopp user from receiving notifications through unregistering them
export async function unregisterAppWithFCM() {
    console.log('unregisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);

    if (messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging()
        .unregisterDeviceForRemoteMessages()
        .then(status => {
            console.log('unregisterDeviceForRemoteMessages status', status);
        })
        .catch(error => {
            console.log('unregisterDeviceForRemoteMessages error', error);
        });
    }
    await messaging().deleteToken();
    console.log('unRegisterAppWithFCM status', messaging().isDeviceRegisteredForRemoteMessages);
}

export const checkApplicationNotificationPermission = async () => {
    try {
        // Request permission for iOS devices
        const authStatus = await messaging().requestPermission();
        
        const enabled = 
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

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
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('onMessageReceived: ', JSON.stringify(remoteMessage));

        if ( remoteMessage?.notification.title && remoteMessage?.notification.body) {
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

    // check if an initial notification is available
    messaging().getInitialNotification().then(remoteMessage => {
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
    return messaging().onMessage(async remoteMessage => {
        console.log('Notification received in foreground!', JSON.stringify(remoteMessage));
        // Handle foreground notification display here
        // You can use a local notification library like react-native-push-notification
        // to show notifications when the app is in foreground
    });
}

// Optional: Add a background handler function
export const setupBackgroundHandler = () => {
    // Setting background message handler - this must be done early in app initialization
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        // Handle background notifications here
    });
}