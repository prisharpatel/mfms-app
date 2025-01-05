import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors, fonts } from '../../styles';

export default function ScheduleScreen({ schedule, selectedSessions, loadSchedule }) {
  React.useEffect(() => {
    loadSchedule();
  }, []);

  const renderSession = (session) => (
    <TouchableOpacity
      key={session.id}
      style={[
        styles.sessionCard,
        selectedSessions.includes(session.id) && styles.selectedCard
      ]}
    >
      <Text style={styles.time}>{session.startTime} - {session.endTime}</Text>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.speaker}>{session.speaker}</Text>
      <Text style={styles.room}>{session.room}</Text>
    </TouchableOpacity>
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
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  time: {
    fontFamily: fonts.primary,
    color: colors.primary,
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  speaker: {
    fontFamily: fonts.primary,
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  room: {
    fontFamily: fonts.primary,
    fontSize: 12,
    color: colors.primary,
  },
}); 