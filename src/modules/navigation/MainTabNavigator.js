import * as React from 'react';
import { Text, View, Image, StyleSheet, Platform, TouchableOpacity, Linking} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles';

import tabNavigationData from './tabNavigationData';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator tabBarOptions={{style: {height: Platform.OS === 'ios' ? 90 : 50, backgroundColor:colors.white}}}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen 
          key={`tab_item${idx+1}`}
          name={item.name}
          component={item.component}
          options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              <Image
                resizeMode="contain"
                source={item.icon}
                style={[
                  styles.tabBarIcon,
                  item.name === 'MFMS' && styles.tabBarIconMFMS, // Apply special style for MFMS icon
                  focused && styles.tabBarIconFocused
                ]}
              />
            </View>
          ),
          tabBarButton: (props) => (
            item.externalLink ? (
              <TouchableOpacity
                {...props}
                onPress={() => Linking.openURL(item.externalLink)}
              >
                
              </TouchableOpacity>
            ) : (
              <TouchableOpacity {...props} />
            )
          ),
          tabBarLabel: ({ focused }) => <Text style={{fontSize: 10, color: focused ? colors.blue : colors.white }}>{item.name}</Text>,
        }}
        />        
      ))}
    </Tab.Navigator>
  );
};

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
  tabBarIconMFMS: {
    width: 40,  // Larger width for MFMS icon
    height: 45, // Larger height for MFMS icon
  },
  tabBarIconFocused: {
    tintColor: colors.blue,
  },
});
