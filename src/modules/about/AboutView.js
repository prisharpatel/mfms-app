import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Animated,
} from 'react-native';
import Video from 'react-native-video'; // Add back the Video import

import { colors, fonts } from '../../styles';

const AboutScreen = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const videoRef = useRef(null);

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header Section */}
        <View style={styles.section}>
          <Text> {'\n'} </Text>
          <View style={styles.outlinedTextContainer}>
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>about us</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>about us</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>about us</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>about us</Text>
            <Text style={styles.outlinedText}>about us</Text>
          </View>
        </View>

        <Animated.View style={[styles.container, { opacity: contentFade }]}>
          {/* About Us Content */}
          <Text style={styles.heading}>Our Story</Text>
          <Text style={styles.description}>
            We are a student-led organization established in 2018 to provide opportunities 
            for students aspiring to careers in fashion and media. The MFMS was founded to 
            connect the "leaders and best" to a multitude of career options in these fields. 
            Our objective remains to help shape the future fabric of fashion through greater 
            exposure to the experiences and opportunities available.
          </Text>

          <Text style={styles.heading}>Our Summit</Text>
          <Text style={styles.description}>
            The Michigan Fashion Media Summit is an annual day-long event in the Ross 
            School of Business that connects students with industry leaders. Our conference 
            comprises keynote conversations, collaborative panel discussions, exclusive 
            networking events, and skill-building workshops. The event concludes with the 
            Fashion Forward Showcase, our initiative to highlight emerging, nationwide 
            student designers.
          </Text>

          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.description}>
            To inspire and educate the next generation of industry leaders, while forging 
            valuable connections between the University of Michigan's top talent and 
            premier fashion and media companies.
          </Text>

          {/* Video Section - Rectangular shape */}
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={{
                uri: 'https://media-hosting.imagekit.io//3da6c0a7ed1a463d/MOV_2646.mov'
              }}
              style={styles.video}
              resizeMode="cover"
              repeat={true}
              paused={false}
              muted={true}
              playInBackground={false}
              playWhenInactive={true}
              onError={(error) => console.log('Video Error:', error)}
              posterResizeMode="cover"
              onLoad={() => console.log('Video loaded successfully')}
              onReadyForDisplay={() => console.log('Video ready for display')}
            />
          </View>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white || '#FFFFFF',
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  // Header styles
  section: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    fontFamily: fonts.primaryBoldItalic,
  },
  outlinedTextContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  outlinedTextShadow: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Arial Black",
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black || '#000',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.primaryRegular,
    lineHeight: 22,
    color: colors.gray || '#555',
    marginBottom: 20,
  },
  // Rectangular video styles
  videoContainer: {
    width: '115%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 0,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 200, // More rectangular aspect ratio
    backgroundColor: '#000',
  },
});

export default AboutScreen;