import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Animated, TouchableOpacity, Linking, Dimensions, Easing } from 'react-native';
import { fonts, colors } from '../../styles';
import { Image } from 'react-native';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const [currentTime, setCurrentTime] = useState(new Date()); // Use consistent naming
  const summitStart = new Date("2025-03-28T08:45:00"); 
  const summitEnd = new Date("2025-03-28T17:00:00");
  const intervalRef = useRef(null);
  const TEST_MODE = false;
  const TEST_DATE = new Date('2025-03-28T10:00:00');
  

  const events = [
    {
      id: 1,
      startTime: new Date('2025-03-28T08:45:00'),
      endTime: new Date('2025-03-28T09:30:00'),
      speakers: '',
      title: 'Check-In',
      location: 'Ross Winter Garden',
    },
    {
      id: 1,
      startTime: new Date('2025-03-28T09:30:00'),
      endTime: new Date('2025-03-28T09:40:00'),
      speakers: '',
      title: 'Opening Remarks',
      location: 'Robertson Auditorium',
    },
    {
      id: 2,
      startTime: new Date('2025-03-28T09:40:00'),
      endTime: new Date('2025-03-28T10:15:00'),
      speakers: '',
      title: 'From Followers to Founders: Creators Building Thriving Businesses',
      location: 'Robertson Auditorium',
    },
    {
      id: 3,
      startTime: new Date('2025-03-28T10:20:00'),
      endTime: new Date('2025-03-28T10:55:00'),
      speakers: '',
      title: 'Beyond the Bottle: Translating Fashion to Fragrance',
      location: 'Robertson Auditorium',
    },
    {
      id: 4,
      startTime: new Date('2025-03-28T10:55:00'),
      endTime: new Date('2025-03-28T11:00:00'),
      speakers: '',
      title: 'Fashion Forward Showcase Video',
      location: 'Robertson Auditorium',
    },
    {
      id: 5,
      startTime: new Date('2025-03-28T11:00:00'),
      endTime: new Date('2025-03-28T11:30:00'),
      speakers: '',
      title: 'Lights, Camera, Style: How Entertainment is Shaping the Beauty and Fashion Industry',
      location: 'Robertson Auditorium',
    },
    {
      id: 6,
      startTime: new Date('2025-03-28T11:35:00'),
      endTime: new Date('2025-03-28T12:10:00'),
      speakers: '',
      title: 'The New Rules of Luxury Fashion',
      location: 'Robertson Auditorium',
    },
    {
      id: 7,
      startTime: new Date('2025-03-28T12:10:00'),
      endTime: new Date('2025-03-28T13:15:00'),
      speakers: 'Wolverine Worldwide',
      title: 'Lunch & Learn',
      location: 'To Be Announced',
    },
    {
      id: 8,
      startTime: new Date('2025-03-28T13:15:00'),
      endTime: new Date('2025-03-28T13:45:00'),
      speakers: '',
      title: 'The Power of Influence: Fitness, Wellness & Fashion in Media',
      location: 'Robertson Auditorium',
    },
    {
      id: 9,
      startTime: new Date('2025-03-28T13:50:00'),
      endTime: new Date('2025-03-28T14:20:00'),
      speakers: '',
      title: 'Redefining the Game: The Intersection of Sports and Fashion',
      location: 'Robertson Auditorium',
    },
    {
      id: 10,
      startTime: new Date('2025-03-28T14:20:00'),
      endTime: new Date('2025-03-28T15:25:00'),
      speakers: '',
      title: 'Networking & Corporate Coffee Chats',
      location: 'Kresge Suites',
    },
    {
      id: 11,
      startTime: new Date('2025-03-28T15:25:00'),
      endTime: new Date('2025-03-28T16:00:00'),
      speakers: '',
      title: 'Steering a Fashion Legacy',
      location: 'Robertson Auditorium',
    },
    {
      id: 12,
      startTime: new Date('2025-03-28T16:05:00'),
      endTime: new Date('2025-03-28T16:40:00'),
      speakers: '',
      title: 'The Business of Being You: Scaling Influence and Lifestyle into a Lasting Brand',
      location: 'Robertson Auditorium',
    },
    {
      id: 13,
      startTime: new Date('2025-03-28T16:40:00'),
      endTime: new Date('2025-03-28T16:50:00'),
      speakers: '',
      title: 'Fashion Forward Showcase Award Ceremony',
      location: 'Robertson Auditorium',
    },
    {
      id: 14,
      startTime: new Date('2025-03-28T16:50:00'),
      endTime: new Date('2025-03-28T17:00:00'),
      speakers: '',
      title: 'Closing Remarks',
      location: 'Robertson Auditorium',
    },
  ];

  
  const [currentEvent, setCurrentEvent] = useState(null);
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [countdown, setCountdown] = useState([]);

  useEffect(() => {

    
    const updateEverything = () => {
      // 1. Update current time
      // const currentTime = new Date();
      const currentTime = TEST_MODE ? TEST_DATE : new Date();
      setCurrentTime(currentTime);
      
      // 2. Find current event
      const current = events.find(
        event => currentTime >= event.startTime && currentTime < event.endTime
      );
      setCurrentEvent(current);
      
      // 3. Find upcoming events
      const upcoming = events
        .filter(event => event.startTime > currentTime)
        .sort((a, b) => a.startTime - b.startTime)
        .slice(0, 2);
      setUpcomingEvent(upcoming);
      
      // 4. Update countdown
      const timeDifference = summitStart - currentTime;
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        setCountdown([days, hours, minutes]);
      } else {
        setCountdown([0, 0, 0]);
      }

      return currentTime;
    };
    
    // Initial update
    const initialTime = updateEverything();
    
    // Calculate time until next minute change
    const msUntilNextMinute = (60 - initialTime.getSeconds()) * 1000 - initialTime.getMilliseconds();
    
    // First set a timeout to align updates with minute changes
    const timeout = setTimeout(() => {
      updateEverything();
      
      // Then set interval for regular minute-aligned updates
      const interval = setInterval(updateEverything, 60000);
      
      // Store interval ID for cleanup
      intervalRef.current = interval;
    }, msUntilNextMinute);
    
    // Clean up both timeout and interval on unmount
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const REPEATING_TEXT_1 = Array(1000).fill('Welcome To The MFMS 2025        ');

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


  const calculateProgress = (start, end) => {
    const totalDuration = end - start;
    const elapsed = currentTime - start;
    return Math.min((elapsed / totalDuration) * 100, 100);
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <Text size={10}> {'\n'} </Text>
        <View style={styles.section}>

          {/* <Text size={2}> {'\n'} </Text> */}
          <Text style={styles.title}>Michigan Fashion</Text>
          <Text style={styles.title}>Media Summit</Text>

          <View style={styles.divider} />
          {(currentTime < summitStart || !currentEvent) && 
          <View style={styles.titleContainer}>
            <Text style={styles.titleDate}>03/28/25</Text>
            <Text style={styles.titleLocation}>Ross School of Business</Text>
          </View>}

          <Text size={18}> {'\n'} </Text>

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

          <Text size={18}> {'\n'} </Text>


          {/* before the day of the summit - countdown */}
          { (currentTime < summitStart &&
            (<>
              <View style={styles.countdownContainer}>
                  <Text style={styles.countdown}>COUNTDOWN</Text>
              </View>
              
              <Text style={styles.countdownTime}>
                {countdown[0]} {countdown[0] === 1 ? 'day' : 'days'}
              </Text>

              <Text style={styles.countdownTime}>
                {countdown[1]} {countdown[1] === 1 ? 'hour' : 'hours'}
              </Text>

              <Text style={styles.countdownTime}>
                {countdown[2]} {countdown[2] === 1 ? 'minute' : 'minutes'}
              </Text>
            </>
            ))
          }

          
          {/* if there is an event in progress */}
          {currentEvent && (
            <>
              <Text style={styles.subtitle}>In Progress:</Text>
              <View style={styles.currentEventContainer}>
                <View style={styles.panelContainer}>
                  <Text style={styles.panel}>{currentEvent.title}</Text>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressIndicator,
                      { width: `${calculateProgress(currentEvent.startTime, currentEvent.endTime)}%` }
                    ]}
                  />
                </View>
                
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    @ {currentEvent.location} 
                  </Text>
                  <Text size={5}> </Text>
                  <Text style={styles.description}>
                    {currentEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {currentEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                   
                </View>
              </View>
            </>
          )}

          {/* if there is an upcoming event */}
          {upcomingEvent.length > 0 && currentTime > summitStart && (

            <>
              {currentEvent && <Text size={11}> {'\n'} </Text>}
              <Text style={styles.subtitleRight}>Coming Up:</Text>

              {upcomingEvent.map((event, index) => (
                <View key={index}>
                  {/* <Text style={styles.comingUpPanelName}>{event.title}</Text> */}
                  <View style={styles.upcomingEventContainer}>
                    <Text style={styles.comingUpPanelName}>
                    {event.title} @ {event.location}
                    </Text>

                    <Text style={styles.comingUpLocation}>
                    {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>

                  </View>
                  {index < 1 && <View style={styles.dividerBlack} />}
                </View>
              ))}
              {currentEvent && <Text size={20}> {'\n'} </Text>}
            </>
          )}
        </View>

        {currentTime >= summitEnd && (
          <View style={styles.section}>
            <Text style={styles.endTitle}>Thank you for attending,</Text>
            <Text style={styles.endTitle}>see you next year!</Text>
            <Text size={18}> {'\n'} </Text>
            <Text style={styles.touch}>Let's stay in touch.</Text>
            <Text size={5}> {'\n'} </Text>

            <TouchableOpacity style={styles.website}
              onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com')}
              activeOpacity={0.7}
            >
              <Text style={[styles.endDescription, styles.linkText]}>
                michiganfashionmediasummit.com
              </Text>
            </TouchableOpacity>
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com/the-loop')}>
                <Icon name="newspaper-o" size={30} color={colors.black} marginRight={3} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/the_mfms/?hl=en')}>
                <Icon name="instagram" size={30} color={colors.black} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.tiktok.com/@the_mfms')}>
                <Image 
                  source={require('../../../assets/images/tik-tok.png')} 
                  style={{ width: 30, height: 30 }} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://open.spotify.com/show/665Wz5hi6qUmcqJxits75m?si=d7451dda455e43d9')}>
                <Icon name="spotify" size={30} color={colors.black} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  currentEventContainer: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: "5%",
    marginTop: 10,
    backgroundColor: colors.white,  // Optional: adds slight transparency
  },
  title: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600', //semi-bold
    textAlign: 'left',
    color: colors.blue,
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row", // Puts items in a row (horizontally)
    justifyContent: "space-between", // Adjusts spacing between texts
    alignItems: "center", // Aligns text vertically
  },
  titleDate: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    fontWeight: '400', //regular
    textAlign: 'left',
    color: colors.blue,
    marginHorizontal: 20,
  },
  titleLocation: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    fontWeight: '400', //regular
    textAlign: 'right',
    color: colors.blue,
    marginRight: 20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    fontFamily: "NeueHaasDisplayRoman",
  },
  divider: {
    width: '90%', 
    height: 1, 
    backgroundColor: colors.blue,  
    marginVertical: 8,
    marginHorizontal: 20,
  },
  dividerBlack: {
    width: '90%', 
    height: 1, 
    backgroundColor: colors.black,  
    marginVertical: 8,  
    marginHorizontal: 20,
  },
  slidingContainer: {
    width: SCREEN_WIDTH*2,
    overflow: 'hidden',
    height: 27,
  },
  slidingStream: {
    flexDirection: 'row',
    position: 'absolute',
    width: SCREEN_WIDTH * 100,
  },
  slidingText: {
    fontSize: 25,
    fontFamily: "Times New Roman",
    fontWeight: "400",
    color: colors.blue,
    fontStyle: "italic",
  },
  countdownContainer: {
    alignItems: 'center',
  },
  countdown: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '700', //semi-bold
    textAlign: 'left',
    color: colors.black,
  },
  countdownTime: {
    fontFamily: "NeueHaasDisplayRoman",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 30,
    fontSize: 25,
    color: colors.black,
  },
  subtitle: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 28,
    fontWeight: '600', //semi-bold
    textAlign: 'left',
    marginHorizontal: "5%",
    color: colors.black,
  },
  panelContainer:{
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%'
  },
  panel: {
    maxWidth: '100%',
    alignSelf: 'center',
    textAlign: 'center', 
    flexShrink: 1,
    fontWeight: '600', 
    marginHorizontal: 10,
    fontFamily: "NeueHaasDisplayRoman", 
    color: colors.blue,
    fontSize: 22,
    textTransform: 'uppercase',
  },
  progressBar: {
    height: 5,
    width: '90%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center', 
    marginHorizontal: 20 
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
  descriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  description:{
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    fontWeight: '500', 
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: '100%',
    color: colors.black
  },
  subtitleRight: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 28,
    fontWeight: '600', //semi-bold
    textAlign: 'right',
    marginHorizontal: 20,
    color: colors.black,
  },
  upcomingEventContainer: {
    marginTop: 8,
    alignItems: 'flex-start',
    marginHorizontal: 20, 
    marginBottom: 10,
  },
  comingUpPanelName: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    fontWeight: '400', 
    flexShrink: 1,
    maxWidth: '100%',
    color: colors.black,
    alignSelf: 'flex-end', // Align to right
    textAlign: 'right', 
  },
  comingUpLocation:{
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: '400', 
    flexShrink: 1,
    maxWidth: '100%',
    color: colors.black,
    alignSelf: 'flex-end', // Align to right
    textAlign: 'right', 
    fontStyle: 'italic',
  },
  time: {
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    fontSize: 18,
    color: colors.black
  },
  endTitle: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 32,
    fontWeight: '500', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: "5%",
  },
  touch:{
    fontFamily: "NeueHaasDisplayRoman",
    // fontStyle: "italic",
    fontSize: 25,
    fontWeight: '400', //semi-bold
    textAlign: 'center',
    color: colors.blue,
  },
  endDescription: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 19,
    fontWeight: '400', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: 20,
    textTransform: 'lowercase',
    textDecorationLine: 'underline', // Change this from fontStyle: 'underline'
  },
  linkText: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 19,
    fontWeight: '400', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: 20,
    textDecorationLine: 'underline', // Change this from fontStyle: 'underline'
  },
  website:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  socialIcon: {
    marginHorizontal: 15, // Space between icons
  },
});