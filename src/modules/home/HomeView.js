import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

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
      speakers: ["Jonathon Newhouse", "Marcus Collins"],
      location: "Robertson Auditorium",
      startTime: new Date("2025-01-03T23:59:59"), 
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
    
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text size={40} black style={styles.header}></Text>
          <Text size={50} black style={styles.header}>
            WELCOME TO
          </Text>
          <Text size={50} black style={styles.header}>
            MFMS 2025
          </Text>
          <Text> {'\n'} </Text>
          <Text black size={20} style={styles.header2}>
            Currently
          </Text>
          <View style={styles.divider} />
          {currentEvent ? (
            <>
            
            <Text black size={17} style={styles.time}>
              {currentEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {currentEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Text black size={10}>  </Text>

            <Text black size={20} style = {styles.panel}>
              {currentEvent.title}
            </Text>

            <Text black size={10}>  </Text>

            {currentEvent.speakers.map((speaker, index) => (
              <><Text size={18} key={index} style={styles.speaker}>
                {speaker}
              </Text><Text black size={2}>  </Text></>
            ))}

            <Text black size={10}>  </Text>

            <Text black size = {18} style={styles.font}>{currentEvent.location}</Text>
          
            </>
          ) : (
            <Text black size={18} style={styles.font}>{'\n'} Stay Tuned...</Text>
          )}

          <Text> {'\n'} </Text>
          <Text black size={20} style={styles.header2}>
            Coming Up
          </Text>
          <View style={styles.divider} />
          {upcomingEvent ? (
            <>
            
            <Text black size={17} style={styles.time}>
              {upcomingEvent.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {upcomingEvent.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            <Text black size={10}>  </Text>

            <Text black size={20} style = {styles.panel}>
              {upcomingEvent.title}
            </Text>

            <Text black size={10}>  </Text>

            {upcomingEvent.speakers.map((speaker, index) => (
              <><Text size={18} key={index} style={styles.speaker}>
                {speaker}
              </Text><Text black size={2}>  </Text></>
            ))}

            <Text black size={10}>  </Text>

            <Text black size = {18} style={styles.font}>{upcomingEvent.location}</Text>
          
            </>
          ) : (
            <Text black size={18} style={styles.font}>{'\n'} Stay Tuned...</Text>
          )}

        </View>
        <View style={[styles.section, styles.sectionLarge]}>
        </View>


      </ImageBackground>
    </View>
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
    flex: 2,
    justifyContent: 'space-around',
  },
  divider: {
    width: '50%',       // Use less than '100%' to prevent it from reaching the edges
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
    alignSelf: 'center' // Centers the divider within its parent container
  },
  header: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontStyle: "italic"
  },
  header2: {
    fontFamily: "Times New Roman",
    fontWeight: "bold",
  }, 
  time: {
    fontFamily: "Times New Roman",
  },
  panel: {
    width: '50%',    
    fontFamily: "Times New Roman",
    textAlign: 'center',
    fontWeight: "bold",
    // marginHorizontal: 20,
    color: colors.blue
  }, 
  speaker: {
    fontFamily: "Times New Roman",
    fontStyle: "italic"
  }, 
  font: {
    fontFamily: "Times New Roman",
  }

});
