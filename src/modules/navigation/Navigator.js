import * as React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { 
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';

import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';
import { colors } from '../../styles';
const iconHome = require('../../../assets/images/home.png');
const iconTicket = require('../../../assets/images/tickets.png');
const iconResumeDrop = require('../../../assets/images/resume.png');
const iconPartners = require('../../../assets/images/handshake.png');
const iconFFS = require('../../../assets/images/ffs_icon.png');
const iconFAQ = require('../../../assets/images/faq.png');
const logoImage = require('../../../assets/images/secondary_white.png')

const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
    onPress: (navigation) => navigation.navigate('Home'),
  },
  // {
  //   name: 'Buy Your Ticket',
  //   icon: iconTicket,
  //   onPress: () => Linking.openURL('https://www.eventbrite.com/'),
  // },
  {
    name: 'Resume Drop',
    icon: iconResumeDrop,
    onPress: () => Linking.openURL('https://forms.gle/1YXDsY7ktsLKc2GR7'),
  },
  {
    name: 'FAQ',
    icon: iconFAQ,
    onPress: (navigation) => navigation.navigate('FAQ')
  },
  {
    name: 'Partners',
    icon: iconPartners,
    onPress: (navigation) => navigation.navigate('Partners'),
  },
  {
    name: 'Fashion Forward Showcase',
    icon: iconFFS,
    onPress: (navigation) => navigation.navigate('FFS'),
  }
];

const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props} style={{ padding: 0 }}>
//       <View style={styles.imageContainer}>
//         <Image style={styles.drawerImage} source={logoImage} />
//       </View>
//       {drawerData.map((item, idx) => (
//         <><DrawerItem
//           key={`drawer_item-${idx + 1}`}
//           label={() => (
//             <View
//               style={styles.menuLabelFlex}>
//               <Image
//                 style={{ width: 25, height: 25, resizeMode: 'contain' }}
//                 source={item.icon}
//               />
//               <Text style={styles.menuTitle}>{item.name}</Text>
//             </View>
//           )}
//           onPress={() => props.navigation.navigate(item.name)} 
//           activeBackgroundColor={colors.blue} 
//           activeTintColor={colors.white}
//           />
//           {idx < drawerData.length - 1 && <View style={styles.divider} />}
//          </>
//       ))}
//       </DrawerContentScrollView>
//   );
// }



function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      {/* Header Section with Logo */}
      <View style={styles.imageContainer}>
        <Image style={styles.drawerImage} source={logoImage} />
      </View>

      {/* Drawer Items */}
      {drawerData.map((item, idx) => (
        <View key={`drawer_item-${idx + 1}`}>
          <DrawerItem
            label={() => (
              <View style={styles.menuLabelFlex}>
                <Image
                  style={{ width: 25, height: 25, resizeMode: 'contain' }}
                  source={item.icon}
                />
                <Text style={styles.menuTitle}>{item.name}</Text>
              </View>
            )}
            onPress={() => item.onPress(props.navigation)}
            activeBackgroundColor={colors.blue}
            activeTintColor={colors.white}
          />
          {/* Divider */}
          {idx < drawerData.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </DrawerContentScrollView>
  );
}

export default function App() {

  return (

    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: colors.white,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: colors.black,
  },
  menuLabelFlex: {
    color: colors.black,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  divider: {
    borderBottomColor: colors.black,
    opacity: 0.2,
    borderBottomWidth: 1,
  },
  imageContainer: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16
  },
  drawerImage: {
    width: "100%",
    height: 200,
    resizeMode: 'contain',
  },
});

