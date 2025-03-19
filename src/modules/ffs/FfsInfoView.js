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
import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


const images = [
  { id: '1', source: require('../../../assets/images/ffs/ffs1.png')},
  { id: '2', source: require('../../../assets/images/ffs/ffs2.png') },
  { id: '3', source: require('../../../assets/images/ffs/ffs3.png') },
  { id: '4', source: require('../../../assets/images/ffs/ffs4.png') },
  { id: '5', source: require('../../../assets/images/ffs/ffs5.png') },
  { id: '6', source: require('../../../assets/images/ffs/ffs6.png') },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const finalists = [
  { id: '1', name: 'Adelina Akhmetshina', source: require('../../../assets/images/ffs/Adelina.jpg')},
  { id: '2', name: 'Eden Meidl', source: require('../../../assets/images/ffs/Eden.jpg') },
  { id: '3', name: 'Madeline Incammicia', source: require('../../../assets/images/speakers/default.png')},
  { id: '4', name: 'Miles Watkins', source: require('../../../assets/images/ffs/Miles.jpg') },
  { id: '5', name: 'Preston Ross', source: require('../../../assets/images/ffs/Preston.jpg') },
  { id: '6', name: 'Rachel Goldstein', source: require('../../../assets/images/ffs/Rachel_Goldstein.png') },
]

export default function FFSScreen({ isExtended, setIsExtended }) {
  const [showAbout, setShowAbout] = useState(false);
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const REPEATING_TEXT_1 = Array(1000).fill('Leaders • Creators • Visionaries • Designers • Pioneers • ');
  const [currentFinalistIndex, setCurrentFinalistIndex] = useState(0);
  const finalistFadeAnim = useRef(new Animated.Value(1)).current;
  
  const navigateCarousel = (direction) => {
    const nextIndex = direction === 'next'
    ? (currentFinalistIndex === finalists.length - 1 ? 0 : currentFinalistIndex + 1)
    : (currentFinalistIndex === 0 ? finalists.length - 1 : currentFinalistIndex - 1);

    // Fade out current finalist
    Animated.timing(finalistFadeAnim, {
      toValue: 0,
      duration: 200, // Slightly faster fade-out
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic), // Add easing function
    }).start(() => {
      // Update the index after fade out is complete
      setCurrentFinalistIndex(nextIndex);
      
      // Small delay before fade-in to ensure state update is processed
      setTimeout(() => {
        // Fade in new finalist
        Animated.timing(finalistFadeAnim, {
          toValue: 1,
          duration: 250, // Slightly longer fade-in
          useNativeDriver: true,
          easing: Easing.in(Easing.cubic), // Add easing function
        }).start();
      }, 50); // Small delay
    });
  };

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
    
    <View style={styles.divider} />
    <Text style={styles.title}>2025 Finalists</Text>

    {/* New Carousel UI */}
    <View style={styles.carouselContainer}>
        {/* Left navigation button */}
        <TouchableOpacity 
          style={styles.carouselNavButton} 
          onPress={() => navigateCarousel('prev')}
        >
          <Icon name="chevron-left" size={24} color={colors.blue} />
        </TouchableOpacity>
        
        {/* Finalist display */}
        <Animated.View style={[
          styles.carouselItem,
          { opacity: finalistFadeAnim }
        ]}>
          <Image 
            source={finalists[currentFinalistIndex].source} 
            style={styles.carouselImage} 
          />
          <Text style={styles.carouselName}>
            {finalists[currentFinalistIndex].name}
          </Text>
        </Animated.View>
        
        {/* Right navigation button */}
        <TouchableOpacity 
          style={styles.carouselNavButton}
          onPress={() => navigateCarousel('next')}
        >
          <Icon name="chevron-right" size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>
      
      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {finalists.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              index === currentFinalistIndex && styles.activeDot
            ]} 
          />
        ))}
      </View>
      <Text style={{ marginBottom: 40 }}>{"\n"}</Text>
      
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
    fontSize: 25,
    marginTop: 20,
    fontFamily: "NeueHaasDisplayRoman",
  },
  divider: {
    width: '90%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
  },
  title2:{
    color: colors.black,
    fontStyle: 'italic', 
    marginHorizontal: SCREEN_WIDTH*.05,
    alignSelf: 'center',
    fontSize: 20,
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
    fontSize: 20,
  },
  aboutContainer:{
    marginVertical: 2,
    marginHorizontal: SCREEN_WIDTH * 0.01,
  },
  aboutText:{
    alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: SCREEN_WIDTH * 0.06,
    fontSize: 20,
    fontFamily: "NeueHaasDisplayRoman",
    color: colors.black,
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
    marginBottom: 30,
    color: colors.black,
    fontSize: 16.5
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
  carouselContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  carouselNavButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.white,
    // borderRadius: 20,
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 2,
  },
  carouselItem: {
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.6,
  },
  carouselImage: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: 12,
    marginBottom: 15,
  },
  carouselName: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 22,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.blue,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
