import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function PartnerScreen({ isExtended, setIsExtended }) {
  const partners = [
    { id: '1', name: 'LVMH', logo: require('../../../assets/images/partners/LVMH.png') },
    { id: '2', name: 'Steve Madden', logo: require('../../../assets/images/partners/Steve-Madden.png') },
    { id: '3', name: 'Louis Vuitton', logo: require('../../../assets/images/partners/Louis-Vuitton.png') },
    { id: '4', name: 'Dior', logo: require('../../../assets/images/partners/dior.png') },
    { id: '5', name: 'Tiffany', logo: require('../../../assets/images/partners/tiffany.png') },
    { id: '6', name: 'Uniqlo', logo: require('../../../assets/images/partners/uniqlo-red.png') },
    { id: '7', name: 'Neiman Marcus', logo: require('../../../assets/images/partners/Neiman_Marcus.png') },
    { id: '8', name: 'Sml Wld Coffee', logo: require('../../../assets/images/partners/sml-wrld.png') },
    { id: '9', name: 'Smart Sweets', logo: require('../../../assets/images/partners/smart-sweets.png') },
    { id: '10', name: 'Tarte', logo: require('../../../assets/images/partners/tarte.png') },
    { id: '11', name: 'Michgrads', logo: require('../../../assets/images/partners/michgrads.png') },
    { id: '12', name: '818', logo: require('../../../assets/images/partners/818.png') },
    { id: '13', name: 'Sprinter', logo: require('../../../assets/images/partners/sprinter.png') },
    { id: '14', name: 'Vegobears', logo: require('../../../assets/images/partners/vegobears.png') },
    { id: '15', name: 'Happy Coffee', logo: require('../../../assets/images/partners/happy.png') },
    { id: '16', name: 'Thrifted University', logo: require('../../../assets/images/partners/thrifted-university.png') },
    { id: '17', name: 'Poppi', logo: require('../../../assets/images/partners/poppi.png') },
    { id: '18', name: 'Simply Gum', logo: require('../../../assets/images/partners/simply.png') },
    { id: '19', name: 'Sweetgreen', logo: require('../../../assets/images/partners/sweetgreen.png') },
    { id: '20', name: 'Skinny Dipped', logo: require('../../../assets/images/partners/skinny-dipped.png') },
    { id: '21', name: 'Cinnaholic', logo: require('../../../assets/images/partners/cinnaholic.jpg') },
    { id: '22', name: 'Vivrelle', logo: require('../../../assets/images/partners/vivrelle.png') },
    { id: '23', name: 'Bivouac', logo: require('../../../assets/images/partners/bivouac.jpg') },
    { id: '24', name: 'SPARC', logo: require('../../../assets/images/partners/sparc.png') },
    { id: '25', name: 'Gracious MFG', logo: require('../../../assets/images/partners/gracious-mfg.png') },
    { id: '26', name: 'Intelligent Change', logo: require('../../../assets/images/partners/intelligent-change.png') },
  ]

  console.log('Partners:', partners);

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
          <Text size={10} black style={styles.header}> </Text>
          <Text size={20} black style={styles.header}>
            2025 SUMMIT PARTNERS
          </Text>
        </View>
        
        

        <FlatList
            data={partners}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.partnerItem}>
                <Image source={item.logo} style={styles.partnerLogo} resizeMode="contain" />
              </View>
            )}
        />

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
    marginVertical: 10,
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
  partnerList: {
    alignItems: 'center',
  },
  listContainer: {
    alignItems: 'center',
    paddingRight: 10,
    width: '100%'
  },
  partnerItem: {
    marginBottom: 15,
  },
  partnerLogo: {
    width: 200,
    height: 80,
  },
});
