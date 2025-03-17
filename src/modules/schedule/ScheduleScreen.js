import React,  { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors, fonts } from '../../styles';

export default function ScheduleScreen({ schedule, selectedSessions, loadSchedule }) {
  const [isPressed, setIsPressed] = useState(false);

  React.useEffect(() => {
    loadSchedule();
  }, []);

  const formatSpeakers = (speakersText) => {
    if (!speakersText) return '';
    
    // Split the text by commas to separate speakers
    const speakersArray = speakersText.split(',').map(speaker => speaker.trim());
    
    // Process each speaker to format with name and title
    return speakersArray.map(speaker => {
      // Check if speaker has a pipe separator for name/title
      if (speaker.includes('|')) {
        const [name, title] = speaker.split('|').map(part => part.trim());
        
        // Return the formatted speaker with name and italicized title
        return `${name} {italic}${title}{/italic}`;
      }
      // If no pipe, just return the speaker text
      return speaker;
    }).join('\n'); // Add extra line break between speakers
  };

  const renderFormattedSpeakers = (formattedText) => {
    if (!formattedText) return null;
    
    // Split the text by our formatting markers
    const parts = formattedText.split(/(\{italic\}|\{\/italic\})/);
    
    return (
      <Text style={styles.speakers}>
        {parts.map((part, index) => {
          if (part === '{italic}') {
            // This is just a marker, don't render anything
            return null;
          } else if (part === '{/italic}') {
            // This is just a marker, don't render anything
            return null;
          } else if (index > 0 && parts[index - 1] === '{italic}') {
            // This part should be italicized - make sure to set fontStyle explicitly
            return <Text key={index} style={[styles.speakerTitle, {fontStyle: 'italic', fontWeight: '400'}]}>{part}</Text>;
          } else {
            // Regular text - make it slightly bolder for contrast
            return <Text key={index} style={{fontWeight: '600'}}>{part}</Text>;
          }
        })}
      </Text>
    );
  };

  const renderSession = (session) => (
    <View
      key={session.id}
      style={[
        styles.sessionCard,
        selectedSessions.includes(session.id) && styles.selectedCard
      ]}
    >
      <Text style={styles.time}>{session.startTime} - {session.endTime}</Text>
      <Text style={styles.title}>{session.title}</Text>
      {session.speakers && renderFormattedSpeakers(formatSpeakers(session.speakers))}
      <Text style={styles.location}>{session.location}</Text>
    </View>

  );

  return (
    <View style={styles.container}>  
      <ScrollView>
        <Text style={styles.header}>Schedule</Text>
        <TouchableOpacity
          activeOpacity={1} // Prevents automatic opacity change
          style={[isPressed ? styles.buttonPressed : styles.button]}          onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com/mfms-2025-schedule')}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text style={styles.buttonText}>Updated Schedule</Text>
        </TouchableOpacity>
        {schedule.map(renderSession)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 25,
  },
  header:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
    fontFamily: "Arial"
  },
  sessionCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: colors.darkGray,
    shadowOffset: { 
      width: 0,   // Centered horizontally
      height: 0   // Centered vertically
    },
    shadowOpacity: 0.3,  // Slightly increased opacity
    shadowRadius: 4,     // Increased blur radius
    elevation: 6,        
    // Add these properties to ensure shadow on all sides
    shadowSpread: 10,     // Spread the shadow slightly
    borderWidth: 0.1,    // Extremely thin border can help define edges
    borderColor: colors.darkGray + '20', 
  },
  selectedCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  time: {
    fontFamily: "NeueHaasDisplayRoman",
    color: colors.blue,
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 19.5,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.blue
  },
  speakerTitle: {
    fontFamily: "Arial",
    fontSize: 15, // Slightly smaller than the name
    fontStyle: 'italic',
    color: colors.darkGray, // Different color to distinguish from name
    lineHeight: 20,
  },
  speakers: {
    fontFamily: "Arial",
    fontSize: 16.5,
    color: colors.black,
    lineHeight: 25, // Increase line height for better readability
  },
  location: {
    marginTop: 7,
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  // button: {
  //   backgroundColor: "#F4F4F2",
  //   paddingVertical: 12,
  //   paddingHorizontal: 16,
  //   borderRadius: 10,
  //   shadowColor: colors.gray,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 4,
  //   alignSelf: 'center',
  //   marginVertical: 20,
  //   marginHorizontal: 20,
  // },
  // buttonText: {
  //   color: colors.black,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   fontSize: 16,
  //   fontFamily: "NeueHaasDisplayRoman",
  // },

  button: {
    backgroundColor: colors.white,  
    borderColor: colors.gray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: '20%',
    borderWidth: 1.5,
  },
  buttonPressed: {
    backgroundColor: colors.black, 
    borderColor: colors.white, 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: '20%',
    borderWidth: 1.5,
  },
  buttonText: {
    color: colors.black, 
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: "NeueHaasDisplayRoman",
  },
}); 