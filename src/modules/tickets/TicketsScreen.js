import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts, colors } from '../../styles';

const TicketsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>About Tickets</Text>
      {/* <Text size="2"></Text>
      <Text style={styles.description}>
        Attendees can purchase two types of tickets to the MFMS
      </Text> */}

      <View style={styles.ticketContainer}>
        <Text style={styles.ticketType}>General Admission</Text>
        <Text style={styles.ticketPrice}>$35</Text>
      </View>

      <Text size="2"></Text>

      <Text style={styles.ticketDescription}>
        This is an all-inclusive ticket to the summit from 8am-5pm
      </Text>

      <View style={styles.ticketContainer}>
        <Text style={styles.ticketType}>VIP Ticket</Text>
        <Text style={styles.ticketPrice}>$45</Text>
      </View>

      <Text size="2"></Text>

      <Text style={styles.ticketDescription}>
        This ticket includes the summit and the Thursday Night Launch Party
      </Text>

      <View style={styles.ticketContainer}>
        <Text style={styles.ticketType}>Virtual Ticket</Text>
        <Text style={styles.ticketPrice}>$15</Text>
      </View>

      <Text size="2"></Text>

      <Text style={styles.ticketDescription}>
        This ticket allows you to watch the summit virtually.
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Your MFMS Ticket</Text>
      <Text style={styles.description}>
        The MFMS handles all ticket transactions through Eventbrite. Click the button below to purchase your ticket.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TicketsView')} // Use navigation instead of state
      >
        <Text style={styles.buttonText}>Purchase Tickets</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: colors.white
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontFamily: "Arial",
    fontSize: 28,
    fontWeight: '600', //semi-bold
    textAlign: 'center',
    fontStyle: "italic",
    color: colors.black,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center'
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  ticketType: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fonts.primaryRegular
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5
  },
  ticketDescription: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 20,
    marginRight: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginTop: 30,
  },
  button: {
    backgroundColor: colors.white, // White background
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: '20%',
    borderWidth: 2, // Black border
    borderColor: colors.gray, // Black border color
    marginTop: 50
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketsScreen;
