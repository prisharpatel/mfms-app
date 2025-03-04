import React,  { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { colors, fonts } from '../../styles';

export default function ScheduleScreen({ schedule, selectedSessions, loadSchedule }) {
  const [isPressed, setIsPressed] = useState(false);

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
    color: colors.black
  },
  speakers: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 17,
    color: colors.black,
  },
  location: {
    marginTop: 7,
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 16,
    color: colors.darkGray,
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