import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Animated, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const [slideAnim2] = useState(new Animated.Value(-300)); // Animation for "COMING UP"
  const now = new Date("2025-03-28T09:00:00"); // TODO: CHANGE TO CURRENT TIME WHEN DEPLOYED new Date();
  const summitStart = new Date("2025-03-28T08:00:00"); 
  const summitEnd = new Date("2025-03-28T17:00:00"); 

  // events
  const events = [
    {
      title: "Designing Success: Women Shaping the Future of Fashion",
      speakers: ["Jennifer Fisher", "Lisa Greenwald"],
      location: "Robertson Auditorium",
      startTime: new Date("2025-03-28T09:00:00"),
      endTime: new Date("2025-03-28T010:00:00"),
      description: "A panel discussing the pivotal role of women in shaping the future of fashion."
    },
    {
      title: "The Thing About Change",
      speakers: ["Jonathon Newhouse", "Marcus Collins", "Katie Couric", "Hannah Bronfman"],
      location: "Kresge Suites",
      startTime: new Date("2025-03-28T11:00:00"),
      endTime: new Date("2025-03-28T12:00:00"),
      description: "A discussion on the dynamics of change in fashion and media."
    }
  ];
  let currentEvent = null;
  let upcomingEvent = null;
  if (events.length != 0) {
    currentEvent = events.find(event => now >= event.startTime && now <= event.endTime);
    upcomingEvent = events
      .filter(event => event.startTime > now)
      .sort((a, b) => a.startTime - b.startTime)[0]
  };

  // moving text
  const REPEATING_TEXT_1 = Array(1000).fill('CURRENTLY    -    ');
  const REPEATING_TEXT_2 = Array(1000).fill('COMING UP    -    ');

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
    animateStream(slideAnim2);
  }, [slideAnim1, slideAnim2]);

  const calculateProgress = (start, end) => {
    const totalDuration = end - start;
    const elapsed = now - start;
    return Math.min((elapsed / totalDuration) * 100, 100);
  };

  // countdown 
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
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          {/* Outlined Text */}
          <Text size={20}> {'\n'} </Text>
          <View style={styles.outlinedTextContainer}>
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={styles.outlinedText}>Michigan Fashion Media Summit</Text>
          </View>

          <Text size={10}> {'\n'} </Text>

          {/* COUNTDOWN BEFORE SUMMIT DAY */}
          { (now <= summitStart &&
            (<>
              <Text size={25}> {'\n'} </Text>
              <View style={styles.outlinedTextContainer}>
                  <Text style={styles.countdown}>countdown</Text>
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

          
          {currentEvent && now > summitStart && (
            <>
              <Text size={10}> {'\n'} </Text>
              <View style={styles.slidingContainer}>
                <Animated.View 
                  style={[
                    styles.slidingStream, 
                    { transform: [{ translateX: slideAnim2 }] }
                  ]}
                >
                  <Text style={styles.slidingText}>{REPEATING_TEXT_1}</Text>
                  <Text style={styles.slidingText}>{REPEATING_TEXT_1}</Text>
                </Animated.View>
              </View>
              <Text size={2}> {'\n'} </Text>
              <Text size={20}> {'•••'} </Text>

              <View
                style = {styles.panelContainer}
              >
                <Text style={styles.panel}>{currentEvent.title}</Text>
              </View>
              <Text size={5}> {'\n'} </Text>
              <Text black style={styles.time}>
                {currentEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {currentEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressIndicator,
                    { width: `${calculateProgress(currentEvent.startTime, currentEvent.endTime)}%` }
                  ]}
                />
              </View>
              {/* {currentEvent.speakers.map((speaker, index) => (
                <Text key={index} style={styles.speaker}>
                  {speaker}
                </Text>
              ))} */}
              <Text size={5}> {'\n'} </Text>
              <Text black size={18} style={styles.font}>@ {currentEvent.location}</Text>
            </>
          )}

          {currentEvent && upcomingEvent && now > summitStart &&(
            <>

              <Text> {'\n'} </Text>

              {/* <View style={styles.divider} />

              <Text black size={20} style={styles.header2}>
                COMING UP
              </Text>

              <View style={styles.divider} /> */}

              
              <View style={styles.slidingContainer}>
                <Animated.View 
                  style={[
                    styles.slidingStream, 
                    { transform: [{ translateX: slideAnim2 }] }
                  ]}
                >
                  <Text style={styles.slidingText}>{REPEATING_TEXT_2}</Text>
                  <Text style={styles.slidingText}>{REPEATING_TEXT_2}</Text>
                </Animated.View>
              </View>

              

              <Text size={10}> {'\n'} </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EventDetails', { event: upcomingEvent })
                }
              >
                <Text style={styles.panel}>{upcomingEvent.title}</Text>
              </TouchableOpacity>
              <Text size={5}> {'\n'} </Text>
              <Text black style={styles.time}>
                {upcomingEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {upcomingEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text size={5}> {'\n'} </Text>

              <Text black size={18} style={styles.font}>@ {upcomingEvent.location}</Text>
            </>
          )}

          {currentEvent && !upcomingEvent && now > summitStart && (
            <>
              <Text> {'\n'} </Text>

              <View style={styles.divider} />

              <Text black size={20} style={styles.header2}>
                COMING UP
              </Text>

              <View style={styles.divider} />

              
              <Text size={5}> {'\n'} </Text>
              
              <Text> {'\n'} </Text>
              <Text size = {22} style={styles.panel}>Stay Tuned...</Text>

            </>
          )}


          {!currentEvent && upcomingEvent && now > summitStart && (
            <>

            <Text size={25}> {'\n'} </Text>

            <View style={styles.divider} />
            <View style={styles.slidingContainer}>
              <Animated.View 
                style={[
                  styles.slidingStream, 
                  { transform: [{ translateX: slideAnim2 }] }
                ]}
              >
                <Text style={styles.slidingText}>{REPEATING_TEXT_2}</Text>
                <Text style={styles.slidingText}>{REPEATING_TEXT_2}</Text>
              </Animated.View>
            </View>
            <View style={styles.divider} />
            <Text size={10}> {'\n'} </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EventDetails', { event: upcomingEvent })
              }
            >
              <Text style={styles.panel}>{upcomingEvent.title}</Text>
            </TouchableOpacity>

            <Text size={5}> {'\n'} </Text>

            <Text black style={styles.time}>
              {upcomingEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {upcomingEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Text size={5}> {'\n'} </Text>
            {/* {upcomingEvent.speakers.map((speaker, index) => (
              <Text key={index} style={styles.speaker}>
                {speaker}
              </Text>
            ))} */}
            <Text black size={18} style={styles.font}>@ {upcomingEvent.location}</Text>
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
  section: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    fontFamily: fonts.primaryBoldItalic,
  },
  slidingContainer: {
    width: SCREEN_WIDTH*2,
    overflow: 'hidden',
    height: 19,
  },
  slidingStream: {
    flexDirection: 'row',
    position: 'absolute',
    width: SCREEN_WIDTH * 100,
  },
  slidingText: {
    fontSize: 20,
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    color: colors.black,
  },
  header:{
    fontFamily: "Arial",
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  header2: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
    alignSelf: 'center'
  },
  outlinedTextContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedText: {
    fontSize: 37,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    fontFamily: "Arial",
    textTransform: 'lowercase',
    fontStyle: 'italic',
  },
  outlinedTextShadow: {
    position: 'absolute',
    fontSize: 37,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    fontFamily: "Arial",
    textTransform: 'lowercase',
    fontStyle: 'italic',
  },
  progressBar: {
    height: 5,
    width: '80%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginVertical: 8
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: colors.blue,
    borderRadius: 5
  },
  panelContainer:{
    alignItems: 'center',
    width: '100%',
    border: '1px solid black',
  },
  panel: {
    width: '90%',
    fontFamily: "Times New Roman",
    textAlign: 'center',
    fontWeight: "bold",
    color: colors.blue,
    fontSize: 24
  },
  speaker: {
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    fontSize: 20,
  },
  font: {
    fontFamily: "Times New Roman",
  },
  time: {
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    fontSize: 18,
  },
  countdownTime: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 25,
    color: colors.blue,
  },
  countdown: {
    fontSize: 35,
    fontWeight: 'bold',
    fontStyle: "italic",
    color: colors.blue,
    textAlign: 'center',
    fontFamily: "Arial",
  },
});