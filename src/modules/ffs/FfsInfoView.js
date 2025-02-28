import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { ScrollView } from 'react-native-gesture-handler';

const images = [
  { id: '1', source: require('../../../assets/images/ffs/ffs1.png')},
  { id: '2', source: require('../../../assets/images/ffs/ffs2.png') },
  { id: '3', source: require('../../../assets/images/ffs/ffs3.png') },
  { id: '4', source: require('../../../assets/images/ffs/ffs4.png') },
  { id: '5', source: require('../../../assets/images/ffs/ffs5.png') },
  { id: '6', source: require('../../../assets/images/ffs/ffs6.png') },
];

const SCREEN_WIDTH = Dimensions.get('window').width;




export default function FFSScreen({ isExtended, setIsExtended }) {
  const [showAbout, setShowAbout] = useState(false);
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const REPEATING_TEXT_1 = Array(1000).fill('Leaders • Creators • Visionaries • Designers • Pioneers • ');


  useEffect(() => {
    const animateStream = (animation) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: -SCREEN_WIDTH * 50,
            duration: 999999,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ])
      ).start();
    };
  
    animateStream(slideAnim1);
  }, [slideAnim1]);


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}>
      <Text style={styles.title} >Fashion Forward Showcase</Text>
      <Text size={10}></Text>
      <Text style={styles.title2}>Presented by Steve Madden</Text>

      <View style={styles.aboutContainer}>
      {!showAbout ? (
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => setShowAbout(true)} style={styles.button}>
            <Text style={styles.buttonText}>About →</Text>
          </TouchableOpacity>
          <Image source={require('../../../assets/images/ffs_logo.png')} style={styles.logo} />
        </View>
      ) : (
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => setShowAbout(false)} style={styles.button}>
            <Text style={styles.buttonText}>About ↓</Text>
          </TouchableOpacity>
          <Text style={styles.aboutText}>
            The MFMS Fashion Forward Showcase recognizes college students at U of M and 
            across the country who are innovators and entrepreneurs in the fashion and media 
            worlds. From those who are fashion-forward in their pursuits 
            to those who are already making strides to be members of the next generation of 
            fashion industry leaders, MFMS provides a platform to recognize all.
          </Text>
        </View>
      )}
    </View>
    
    <FlatList
      nestedScrollEnabled={true}
      scrollEnabled={false}
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={item.source} style={styles.image} />
        </View>
      )}
      contentContainerStyle={styles.gallery}
    />

    <View style={styles.slidingContainer}>
      <Animated.View 
        style={[
          styles.slidingStream, 
          { transform: [{ translateX: slideAnim1 }] }
        ]}
      >
        <Text style={styles.slidingText}>{REPEATING_TEXT_1}</Text>
        <Text style={styles.slidingText}>{REPEATING_TEXT_1}</Text>
      </Animated.View>
    </View>

    <Text style={styles.bottomtext}>Five finalists will present their work at the Michigan Fashion Media Summit before top industry leaders. One winner will receive an exclusive 
    professional development opportunity. The FFS is a career-defining platform for student creatives to gain exposure and connections.</Text>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  flexGrow: {
    flex: 1,
    backgroundColor: colors.white
  },
  title:{
    color: colors.black,
    fontWeight: 'bold', 
    marginHorizontal: SCREEN_WIDTH*.05,
    alignSelf: 'center',
    fontSize: 19,
    marginTop: 20,
    fontFamily: "NeueHaasDisplayRoman",
  },
  title2:{
    color: colors.black,
    fontStyle: 'italic', 
    marginHorizontal: SCREEN_WIDTH*.05,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: "Arial",
  },
  logoContainer:{
    marginTop: 40,
    marginHorizontal: SCREEN_WIDTH * 0.001,
  },
  logo :{
    width: 227,
    height: 124,
    alignSelf: 'center',
    marginTop: 20
  },
  button:{
    marginLeft: SCREEN_WIDTH * 0.06,
  },
  textContainer:{
    marginTop: 40
  },
  buttonText:{
    color: colors.black,
    fontSize: 17,
  },
  aboutContainer:{
    marginVertical: 2,
    marginHorizontal: SCREEN_WIDTH * 0.01,
  },
  aboutText:{
    alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: SCREEN_WIDTH * 0.06,
    fontSize: 15,
    fontFamily: "NeueHaasDisplayRoman",
  },
  gallery:{
    alignSelf: 'center',
    marginTop: 40
  },
  imageContainer:{
    alignContent:'center',
    marginLeft: 7,
    marginRight: 7
  },
  bottomtext:{
    fontFamily: "NeueHaasDisplayRoman",
    textAlign: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.06,
    marginBottom: 130,
    fontSize: 18
  },
  slidingContainer: {
    width: SCREEN_WIDTH*2,
    overflow: 'hidden',
    height: 26,
    marginVertical: 30,
  },
  slidingStream: {
    flexDirection: 'row',
    position: 'absolute',
    width: SCREEN_WIDTH * 100,
  },
  slidingText: {
    fontSize: 20,
    fontFamily: "Times New Roman",
    color: colors.blue,
    fontStyle: 'italic',
  },

});
