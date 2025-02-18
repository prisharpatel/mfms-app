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
          <Text style={styles.title}>Michigan Fashion</Text>
          <Text style={styles.title}>Media Summit</Text>

          <View style={styles.divider} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleDate}>03/28/25</Text>
            <Text style={styles.titleLocation}>Ross School of Business</Text>
          </View>

          <Text size={30}> {'\n'} </Text>

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

          <Text size={30}> {'\n'} </Text>

          {/* before the day of the summit - countdown */}
          
          {/* if there is an event in progress */}
          {currentEvent && (
            <View style={styles.panelContainer}>
              <Text style={styles.panel}>Currently</Text>
              <Text style={styles.panel}>{currentEvent.title}</Text>
              <Text style={styles.panel}>{currentEvent.location}</Text>
              <Text style={styles.panel}>{currentEvent.startTime.toLocaleTimeString()} - {currentEvent.endTime.toLocaleTimeString()}</Text>
              <Text style={styles.panel}>{currentEvent.description}</Text>
              <Text size={30}> {'\n'} </Text>
            </View>
          )}
          <Text style={styles.currently}>Event In Progress:</Text>

          

          

          
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
  currently: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 20,
    fontWeight: '600', //semi-bold
    textAlign: 'left',
    marginLeft: 20,
    color: colors.black,
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
    fontWeight: "400",
    color: colors.blue,
    fontStyle: "italic",
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