import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Animated, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [slideAnim1] = useState(new Animated.Value(-300)); // Animation for "CURRENTLY"
  const now = new Date();

  const events = [
    {
      title: "Designing Success: Women Shaping the Future of Fashion",
      speakers: ["Jennifer Fisher", "Lisa Greenwald"],
      location: "Robertson Auditorium",
      startTime: new Date("2025-01-05T13:00:00"),
      endTime: new Date("2025-01-05T15:30:00"),
      description: "A panel discussing the pivotal role of women in shaping the future of fashion."
    },
    {
      title: "The Thing About Change",
      speakers: ["Jonathon Newhouse", "Marcus Collins", "Katie Couric", "Hannah Bronfman"],
      location: "Kresge Suites",
      startTime: new Date("2025-09-03T23:59:59"),
      endTime: new Date("2025-09-04T23:59:59"),
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
  }
;

  const REPEATING_TEXT_1 = Array(1000).fill('WELCOME TO MFMS 2025    -    ');

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
          <Text style={styles.title}>Michigan Fashion</Text>
          <Text style={styles.title}>Media Summit</Text>

          <View style={styles.divider} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleDate}>03/28/25</Text>
            <Text style={styles.titleLocation}>Ross School of Business</Text>
          </View>

          

          {currentEvent && (
            <>
              
              <Text size={2}> {'\n'} </Text>
              <Text size={20}> {'•••'} </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EventDetails', { event: currentEvent })
                }
                style = {styles.panelContainer}
              >
                <Text style={styles.panel}>{currentEvent.title}</Text>
              </TouchableOpacity>
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

          {/* "COMING UP" */}
          {currentEvent && upcomingEvent && (
            <>
              <Text> {'\n'} </Text>

              <View style={styles.divider} />

              <Text black size={20} style={styles.header2}>
                COMING UP
              </Text>

              <View style={styles.divider} />

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

          {currentEvent && !upcomingEvent && (
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


          {!currentEvent && upcomingEvent && (
            <>
            <View style={styles.divider} />
            <View style={styles.divider} />
            <Text size={5}> {'\n'} </Text>

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

          { (!currentEvent && !upcomingEvent &&
            (<>
              <View style={styles.divider} />

              <View style={styles.divider} />
              <Text> {'\n'} </Text>
              <Text size = {22} style={styles.panel}>Stay Tuned...</Text>
            </>
          ))
        }
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
  title: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600', //semi-bold
    textAlign: 'left',
    color: colors.blue,
    marginLeft: 20,
  },
  titleContainer: {
    flexDirection: "row", // Puts items in a row (horizontally)
    justifyContent: "space-between", // Adjusts spacing between texts
    alignItems: "center", // Aligns text vertically
  },
  titleDate: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 14,
    fontWeight: '400', //regular
    textAlign: 'left',
    color: colors.blue,
    marginLeft: 20,
  },
  titleLocation: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 14,
    fontWeight: '400', //regular
    textAlign: 'right',
    color: colors.blue,
    marginRight: 20,
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'left',
    color: colors.blue,
    marginBottom: 20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
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
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  header2: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  },
  divider: {
    width: '90%', 
    height: 1, 
    backgroundColor: colors.blue,  
    // alignSelf: 'center',
    marginTop: 8,  
    marginBottom: 8,
    marginHorizontal: 20,
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
    width: '95%'
  },
  panel: {
    width: '80%',
    fontFamily: "Times New Roman",
    textAlign: 'center',
    fontWeight: "bold",
    color: colors.blue,
    fontSize: 22
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
});