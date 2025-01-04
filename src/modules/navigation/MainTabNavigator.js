import * as React from 'react';
import { Text, View, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../../styles';
import WebViewScreen from '../../screens/WebViewScreen'; // Import the WebView screen

import tabNavigationData from './tabNavigationData';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: Platform.OS === 'ios' ? 90 : 50,
          backgroundColor: colors.white,
        },
      }}
    >
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          initialParams={item.externalLink ? { url: item.externalLink } : {}}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              </View>
            ),
            tabBarButton: (props) =>
              item.externalLink ? (
                <TouchableOpacity
                  {...props}
                  onPress={() =>
                    props.navigation.navigate('WebViewScreen', { url: item.externalLink })
                  }
                />
              ) : (
                <TouchableOpacity {...props} />
              ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? colors.blue : colors.white,
                }}
              >
                {item.name}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{ headerShown: true, title: 'Web View' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 30,
    height: 35,
  },
  tabBarIconFocused: {
    tintColor: colors.blue,
  },
});
