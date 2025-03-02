import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Animated, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const now = new Date("2025-03-28T10:30:00"); // TODO: CHANGE TO CURRENT TIME WHEN DEPLOYED new Date();
  const summitStart = new Date("2025-03-28T08:00:00"); 
  const summitEnd = new Date("2025-03-28T17:00:00"); 

  const events = [
    {
      title: "Designing Success: Women Shaping the Future of Fashion",
      speakers: ["Jennifer Fisher", "Lisa Greenwald"],
      location: "Robertson Auditorium",
      startTime: new Date("2025-03-28T08:00:00"),
      endTime: new Date("2025-03-28T09:30:00"),
      description: "A panel discussing the pivotal role of women in shaping the future of fashion."
    },
    {
      title: "The Thing About Change",
      speakers: ["Jonathon Newhouse", "Marcus Collins", "Katie Couric", "Hannah Bronfman"],
      location: "Kresge Suites",
      startTime: new Date("2025-03-28T10:00:00"),
      endTime: new Date("2025-03-28T11:00:00"),
      description: "A discussion on the dynamics of change in fashion and media."
    },
    {
      title: "Panel 3 Making This Long To See What It Will Look Like",
      speakers: ["Jonathon Newhouse", "Marcus Collins", "Katie Couric", "Hannah Bronfman"],
      location: "Kresge Suites",
      startTime: new Date("2025-03-28T11:00:00"),
      endTime: new Date("2025-03-28T12:00:00"),
      description: "A discussion on the dynamics of change in fashion and media."
    },
    {
      title: "Panel 4 Making This Super Long Again To See What It Will Look Like",
      speakers: ["Jonathon Newhouse", "Marcus Collins", "Katie Couric", "Hannah Bronfman"],
      location: "Kresge Suites",
      startTime: new Date("2025-03-28T12:00:00"),
      endTime: new Date("2025-03-28T14:00:00"),
      description: "A discussion on the dynamics of change in fashion and media."
    }
  ];
  let currentEvent = null;
  let upcomingEvent = null;
  if (events.length != 0) {
    currentEvent = events.find(event => now >= event.startTime && now <= event.endTime);
    upcomingEvent = events
      .filter(event => event.startTime > now)
      .sort((a, b) => a.startTime - b.startTime)
      .slice(0, 2);
  }
;

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



  const [countdown, setCountdown] = useState([]);

  useEffect(() => {
    const targetDate = summitStart;
  
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;
  
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  
        setCountdown([
          days,
          hours,
           minutes,
        ]);
      } else {
        setCountdown([
          0,
          0,
          0,
        ]);
      }
    };
  

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  
  const calculateProgress = (start, end) => {
    const totalDuration = end - start;
    const elapsed = now - start;
    return Math.min((elapsed / totalDuration) * 100, 100);
  };


  return (
    <ScrollView style={styles.container}>
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
          {/* <View style={styles.titleContainer}>
            <Text style={styles.titleDate}>03/28/25</Text>
            <Text style={styles.titleLocation}>Ross School of Business</Text>
          </View> */}

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
          { (now < summitStart &&
            (<>
              <View style={styles.countdownContainer}>
                  <Text style={styles.countdown}>COUNTDOWN</Text>
              </View>
              
              <Text style={styles.countdownTime}>
                {countdown[0]} days
              </Text>

              <Text style={styles.countdownTime}>
                {countdown[1]} hours
              </Text>

              <Text style={styles.countdownTime}>
                {countdown[2]} minutes
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
                
                <View style={styles.locationContainer}>
                  <Text style={styles.location}>
                    @ {currentEvent.location} | {currentEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {currentEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* if there is an upcoming event */}
          {upcomingEvent.length > 0 && now > summitStart && (

            <>
              <Text size={28}> {'\n'} </Text>
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
            </>
          )}
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
  currentEventContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
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
    fontWeight: '800', //semi-bold
    textAlign: 'left',
    color: colors.black,
  },
  countdownTime: {
    fontFamily: "NeueHaasDisplayRoman",
    textAlign: "center",
    fontWeight: "800",
    marginTop: 30,
    fontSize: 25,
    color: colors.black,
  },
  subtitle: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 28,
    fontWeight: '600', //semi-bold
    textAlign: 'left',
    marginHorizontal: 20,
    color: colors.black,
  },
  panelContainer:{
    marginTop: 8,
    alignItems: 'flex-start',
    width: '100%'
  },
  panel: {
    maxWidth: '90%',
    alignSelf: 'center',
    flexShrink: 1,
    marginHorizontal: 20,
    fontFamily: "Arial", 
    fontStyle: "italic",
    color: colors.black,
    fontSize: 18,
  },
  progressBar: {
    height: 5,
    width: '90%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center', // Add this to center the progress bar
    marginHorizontal: 20 // Add this to match other elements' margins
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    width: '95%',
  },
  location:{
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    fontWeight: '400', 
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
  },
  comingUpPanelName: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 15,
    fontWeight: '400', 
    flexShrink: 1,
    maxWidth: '100%',
    color: colors.black,
    alignSelf: 'flex-end', // Align to right
    textAlign: 'right', 
  },
  comingUpLocation:{
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 15,
    fontWeight: '400', 
    flexShrink: 1,
    maxWidth: '100%',
    color: colors.black,
    alignSelf: 'flex-end', // Align to right
    textAlign: 'right', 
  },
  time: {
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    fontSize: 18,
  },
});