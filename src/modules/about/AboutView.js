import React from 'react';
import { StyleSheet,View, ImageBackground, ScrollView} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function AboutScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };



  return (
    
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text size={25} black > </Text>
          <View style={styles.outlinedTextContainer}>
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>about</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>about</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>about</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>about</Text>
            <Text style={styles.outlinedText}>about</Text>
          </View>
          <Text> {'\n'} </Text>

        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
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
    height: 100
  },
  title: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.blue,
    textAlign: 'center'

  },
  divider: {
    width: '80%',       // Use less than '100%' to prevent it from reaching the edges
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
    alignSelf: 'center' // Centers the divider within its parent container
  },
  outlinedTextContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white, // Transparent fill
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  outlinedTextShadow: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.blue, // Outline color
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  header: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.blue,
    textAlign: 'center'
  },
  font: {
    fontFamily: "Times New Roman",
  }

});
