import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors, fonts } from '../../styles';

export default function ScheduleScreen({ schedule, selectedSessions, loadSchedule }) {
  React.useEffect(() => {
    loadSchedule();
  }, []);

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
      <Text style={styles.speakers}>{session.speakers}</Text>
      <Text style={styles.location}>{session.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>  
      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com/mfms-2025-schedule') } 
        >
          <Text style={styles.buttonText}>See Latest Schedule</Text>
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
  },
  sessionCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: colors.darkGraygray,
    shadowOffset: { 
      width: 0,   // Centered horizontally
      height: 0   // Centered vertically
    },
    shadowOpacity: 0.2,  // Slightly increased opacity
    shadowRadius: 4,     // Increased blur radius
    elevation: 4,        // Increased elevation for Android
    // Add these properties to ensure shadow on all sides
    shadowSpread: 1,     // Spread the shadow slightly
    borderWidth: 0.5,    // Extremely thin border can help define edges
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
  speakers: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    color: colors.gray,
  },
  location: {
    marginTop: 7,
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 15,
    color: colors.black,
  },
button: {
  backgroundColor: colors.white,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  shadowColor: colors.darkGray,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  alignSelf: 'center',
  marginVertical: 20,
},
buttonText: {
  color: colors.blue,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 16,
},
}); 