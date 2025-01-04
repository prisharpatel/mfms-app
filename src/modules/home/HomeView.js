import React from 'react';
import { StyleSheet,View, ImageBackground, ScrollView} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Svg, {Text as SvgText } from 'react-native-svg';

export default function HomeScreen({ isExtended, setIsExtended }) {
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

  const events = [ 
    {
      title: "Designing Success: Women Shaping the Future of Fashion",
      speakers: ["Jennifer Fisher", "Lisa Greenwald"],
      location: "Robertson Auditorium",
      startTime: now, // starts now
      endTime: new Date("2025-03-03T23:59:59") // ends on March 3, 2025
    },

    {
      title: "The Thing About Change",
      speakers: ["Jonathon Newhouse", "Marcus Collins", "Katie Couric", "hannah Bronfman"],
      location: "Robertson Auditorium",
      startTime: new Date("2025-09-03T23:59:59"), 
      endTime: new Date("2025-03-03T23:59:59") 
    }
  ];

  const currentEvent = events.find(event =>
    now >= event.startTime && now <= event.endTime
  );

  const upcomingEvent = events
  .filter(event => event.startTime > now)
  .sort((a, b) => a.startTime - b.startTime)[0]; // The soonest upcoming event


  return (
    
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          {/* <Text size={40} black style={styles.header}></Text>
          <Text black style={styles.outlinedText}>
            michigan fashion media summit
          </Text> */}
          <Text> {'\n'} </Text>
          <View style={styles.outlinedTextContainer}>
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>Michigan Fashion Media Summit</Text>
            <Text style={styles.outlinedText}>Michigan Fashion Media Summit</Text>
          </View>
          <Text> {'\n'} </Text>

          <Text black size={20} style={styles.header2}>
            CURRENTLY
          </Text>
          <View style={styles.divider} />
          {currentEvent ? (
            <>
            
            <Text black style={styles.time}>
              {currentEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {currentEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Text black size={10}>  </Text>

            <Text style = {styles.panel}>
              {currentEvent.title}
            </Text>

            <Text black size={10}>  </Text>

            {currentEvent.speakers.map((speaker, index) => (
              <Text key={index} style={styles.speaker}>
                {speaker}
              </Text>
            ))}

            <Text black size={10}>  </Text>

            <Text black size = {18} style={styles.font}>{currentEvent.location}</Text>
          
            </>
          ) : (
            <Text style={styles.panel}>{'\n'} Stay Tuned...</Text>
          )}

          <Text> {'\n'} </Text>
          <Text black size={20} style={styles.header2}>
            COMING UP
          </Text>
          <View style={styles.divider} />
          {upcomingEvent ? (
            <>
            
            <Text black style={styles.time}>
              {upcomingEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {upcomingEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Text black size={10}>  </Text>

            <Text style = {styles.panel}>
              {upcomingEvent.title}
            </Text>

            <Text black size={10}>  </Text>

            {upcomingEvent.speakers.map((speaker, index) => (
              <><Text key={index} style={styles.speaker}>
                {speaker}
              </Text><Text black size={2}>  </Text></>
            ))}

            <Text black size={10}>  </Text>

            <Text black size = {18} style={styles.font}>{upcomingEvent.location}</Text>
          
            </>
          ) : (
            <Text style={styles.panel}>{'\n'} Stay Tuned...</Text>
          )}

        </View>
        <View style={[styles.section, styles.sectionLarge]}>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  sectionLarge: {
    height: 100
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
    fontStyle: "italic",
    color: colors.blue,
    textAlign: 'center'
  },
  header2: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  }, 
  time: {
    fontFamily: "Times New Roman",
    fontStyle: "italic",
    fontSize: 18, 
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
