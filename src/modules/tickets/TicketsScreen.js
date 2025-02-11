import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts, colors } from '../../styles';
import TicketsView from './TicketsView.js'

const TicketsScreen = () => {
    const [showTicketsView, setShowTicketsView] = useState(false); // State to track which page to show
  
    if (showTicketsView) {
      return <TicketsView onGoBack={() => setShowTicketsView(false)} />; // Show TicketsView when button is clicked
    }
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
  
        {/* About Tickets Section */}
        <Text style={styles.sectionTitle}>About Tickets</Text>
        <Text style={styles.description}>
          Attendees can purchase two types of tickets to the MFMS
        </Text>
  
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketType}>General Admissions</Text>
          <Text style={styles.ticketPrice}>$35</Text>
        </View>
        <Text style={styles.ticketDescription}>
          This is an all inclusive ticket to the summit from 8am-5pm
        </Text>
  
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketType}>VIP Ticket</Text>
          <Text style={styles.ticketPrice}>$45</Text>
        </View>
        <Text style={styles.ticketDescription}>
          This ticket includes the summit and the Thursday Night Launch Party
        </Text>
  
        <View style={styles.divider} />
  
        {/* Your Ticket Section */}
        <Text style={styles.sectionTitle}>Your MFMS Ticket</Text>
        <Text style={styles.description}>
          The MFMS handles all ticket transactions through Eventbrite. Click the
          button below to be redirected to an external site where you can purchase
          your ticket.
        </Text>
  
        {/* Purchase Tickets Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTicketsView(true)} // Change state to show TicketsView
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: fonts.primaryBold,
    textAlign: "center",
    marginTop: 30
  },
  description: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 15,
    marginTop: 15,
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
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
    marginTop: 50,
  },
  button: {
    backgroundColor: colors.white, // White background
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2, // Black border
    borderColor: colors.gray, // Black border color
    marginTop: 50
  },
  buttonText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketsScreen;
