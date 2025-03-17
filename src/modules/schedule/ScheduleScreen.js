import React,  { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors, fonts } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScheduleScreen({ schedule, selectedSessions, loadSchedule }) {
  const [isPressed, setIsPressed] = useState(false);
  const [expandedSession, setExpandedSession] = useState(null);

  React.useEffect(() => {
    loadSchedule();
  }, []);
  const toggleDropdown = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const formatSpeakers = (speakersText) => {
    if (!speakersText) return [];
    
    // Split the text by commas to get individual speakers
    const speakerParts = speakersText.split(',').map(speaker => speaker.trim());
    
    // Process each speaker to separate name and title
    return speakerParts.map(speaker => {
      if (speaker.includes('|')) {
        // If there's a pipe, split into name and title
        const [name, title] = speaker.split('|').map(part => part.trim());
        return { name, title };
      } else {
        // If no pipe, just use the whole text as name
        return { name: speaker, title: null };
      }
    });
  };

  const renderFormattedSpeakers = (speakersArray) => (
    <View style={styles.speakersContainer}>
      {speakersArray.map((speaker, index) => (
        <View key={index} style={styles.speakerItem}>
          {/* Right-aligned text container */}
          <View style={styles.speakerTextContainer}>
            <Text style={styles.speakerName}>{speaker.name}</Text>
            {speaker.title && (
              <Text style={styles.speakerTitle}>{speaker.title}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderSession = (session) => (
    <View
      key={session.id}
      style={[styles.sessionCard, selectedSessions.includes(session.id) && styles.selectedCard]}
    >
      {/* Header layout with time, title, location */}
      <View style={styles.sessionHeader}>
        <View style={styles.sessionTextContainer}>
          <Text style={styles.time}>{session.startTime} - {session.endTime}</Text>
          <Text style={styles.title}>{session.title}</Text>
          <Text style={styles.location}>@ {session.location}</Text>
        </View>
        
        {/* Icon on the right */}
        <TouchableOpacity 
          onPress={() => toggleDropdown(session.id)}
          style={styles.iconContainer}
        >
          <Icon 
            name={expandedSession === session.id ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      
      {/* Speakers section with italics for titles */}
      {expandedSession === session.id && session.speakers && (
        renderFormattedSpeakers(formatSpeakers(session.speakers))
      )}
    </View>
  );

  return (
    <View style={styles.container}>  
      <ScrollView>
        <Text style={styles.header}>Schedule</Text>
        <View style={styles.divider} />        
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
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: 20,
  },
  divider: {
    width: '50%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginBottom: 20, 
    marginHorizontal: 20,
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
    color: colors.black
  },
  speakers: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16.5,
    color: colors.black,
  },
  speakersContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray + '30',
    alignItems: 'flex-end', // Align all content to the right
  },
  speakerTextContainer: {
    alignItems: 'flex-end', // Align text to the right
  },
  speakerItem: {
    marginBottom: 8,
    width: '100%', // Take full width to allow alignment
    alignItems: 'flex-end', // Align to the right
  },
  speakerName: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'right', // Right-align the text
  },
  speakerTitle: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    fontStyle: 'italic',
    color: colors.gray,
    marginTop: 2,
    textAlign: 'right', // Right-align the text
  },
  location: {
    marginTop: 7,
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    color: colors.darkGray,
    
  },
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
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This pushes the icon to the right
    alignItems: 'flex-start', // Align items to the top
  },
  sessionTextContainer: {
    flex: 1, // Take up available space
    paddingRight: 16, // Add some space between text and icon
  },
  iconContainer: {
    paddingTop: 2, // Align icon vertically with the time text
    paddingLeft: 8,
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

}); 