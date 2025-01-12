import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function PartnerScreen({ isExtended, setIsExtended }) {
  const partners = [
    { id: '1', name: 'LVMH', logo: require('../../../../assets/images/partners/lvmh.png') },
    { id: '2', name: 'Steve Madden', logo: require('../../../../assets/images/partners/Steve-Madden.png') },
    { id: '3', name: 'Louis Vuitton', logo: require('../../../assets/logos/Louis-Vuitton.png') },
    { id: '4', name: 'Dior', logo: require('../../../assets/logos/dior.png') },
    { id: '5', name: 'Sweetgreen', logo: require('../../../assets/logos/sweetgreen.png') },
    { id: '6', name: 'Saks Fifth Avenue', logo: require('../../../assets/logos/saks.png') },
    { id: '7', name: 'Amazon', logo: require('../../../assets/logos/amazon.png') },
    { id: '8', name: 'WME', logo: require('../../../assets/logos/wme.png') },
  ]
  return (
    
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >

        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/transparent_black.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.section}>
          <Text size={10} black style={styles.header}> </Text>
          <Text size={20} black style={styles.header}>
            2025 SUMMIT PARTNERS
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo :{
    width: 50,
    height: 50,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    fontFamily: fonts.primaryBoldItalic,
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  divider: {
    width: '50%',       // Use less than '100%' to prevent it from reaching the edges
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
    alignSelf: 'center' // Centers the divider within its parent container
  },
  header: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  header2: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  }, 
});
