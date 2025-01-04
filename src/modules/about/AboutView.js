import React, { useState } from 'react';

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

  const now = new Date();


  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setScrollPosition(yOffset);
  };

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
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>who we are</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>who we are</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>who we are</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>who we are</Text>
            <Text style={styles.outlinedText}>who we are</Text>
          </View>
          <Text> {'\n'} </Text>

          <Text size={25} style={styles.header}>Our Story</Text>
          <Text style={styles.body}>We are a student-led organization established in 2018 to provide opportunities for students aspiring for careers in fashion and media. The MFMS was founded to connect the “leaders and best” to a multitude of career options in these fields. Our objective remains to help shape the future fabric of fashion through greater exposure to the experiences and opportunities available. </Text>

          <Text size={25} style={styles.header}>Our Summit</Text>
          <Text style={styles.body}>The Michigan Fashion Media Summit is an annual day-long event in the Ross School of Business that connects students with industry leaders. Our conference comprises keynote conversations, collaborative panel discussions, exclusive networking events, and skill-building workshops. The event concludes with the Fashion Forward Showcase, our initiative to highlight emerging, nationwide student designers.</Text>
          
          <Text size={25} style={styles.header}>Our Mission</Text>
          <Text style={styles.body}>Our mission is to provide students with the resources and connections necessary to succeed in the fashion and media industries. We aim to foster a community of driven individuals who are passionate about the future of fashion and media. Our goal is to inspire and empower students to pursue their dreams and make a lasting impact on the industry.</Text>


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
    textTransform: 'uppercase',
    color: colors.black,
    textAlign: 'left',
  },
  header2: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  }, 
  body: {
    fontFamily: "Times New Roman",
    fontSize: 16, 
    margin: 10,
    textAlign: 'center',
  },
  panel: {
    width: '80%',    
    fontFamily: "Times New Roman",
    textAlign: 'center',
    fontWeight: "bold",
    color: colors.blue,
    fontSize: 25
  }, 
  speaker: {
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    fontWeight: "bold", 
    fontSize: 20,
  }, 
  font: {
    fontFamily: "Times New Roman",
  }

});
