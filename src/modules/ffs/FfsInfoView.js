import React, { useState, useEffect, useRef } from 'react';;
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  Animated,
  Dimensions
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

const { width } = Dimensions.get("window");


export default function FFSScreen({ isExtended, setIsExtended }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}>
      <Text style={styles.title} >The 2025 MFMS Fashion Forward Showcase Presented by Steve Madden</Text>

      <View style={styles.aboutcontainer}>
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
            worlds. From those who are fashion-forward in their thinking and their pursuits 
            to those who are already making strides to be members of the next generation of 
            fashion industry leaders.
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

    <Text style={styles.bottomtext}> Whether you're building a brand, growing a media presence, or creating content, this showcase is for you. </Text>
    <Text style={styles.bottomtext2}>Five finalists will present their work at the Michigan Fashion Media Summit before top industry leaders. One winner will receive an exclusive 
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
    marginLeft: 25,
    marginRight: 25,
    alignSelf: 'center',
    fontSize: 17,
    marginTop: 20
  },
  logoContainer:{
    marginTop: 40
  },
  logo :{
    width: 227,
    height: 124,
    alignSelf: 'center',
    marginTop: 20
  },
  button:{
    marginLeft: 45
  },
  textContainer:{
    marginTop: 40
  },
  buttonText:{
    color: colors.black,
    fontSize: 17,
  },
  aboutText:{
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 30,
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
    marginTop: 70,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  bottomtext2:{
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  }

});
