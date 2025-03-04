import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
      <Text style={styles.speaker}>{session.speaker}</Text>
      <Text style={styles.location}>{session.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
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
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .2,
    shadowRadius: 4,
    elevation: 4,
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
  speaker: {
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
}); 