import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts, colors } from '../../styles';

const TicketsScreen = () => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={styles.bgImage}
              resizeMode="cover"
      >
        <Text style={styles.sectionTitle}>About Tickets</Text>

        <View style={styles.ticketContainer}>
          <Text style={styles.ticketType}>General Admission</Text>
          <Text style={styles.ticketPrice}>$35</Text>
        </View>

        <Text size="2"></Text>

        <Text style={styles.ticketDescription}>
          This is an all-inclusive ticket to the summit from 8am-5pm.
        </Text>

        <View style={styles.ticketContainer}>
          <Text style={styles.ticketType}>VIP Ticket</Text>
          <Text style={styles.ticketPrice}>$45</Text>
        </View>

        <Text size="2"></Text>

        <Text style={styles.ticketDescription}>
          This ticket includes the summit and the Thursday Night Launch Party.
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
                  activeOpacity={1} // Prevents automatic opacity change
                  style={[isPressed ? styles.buttonPressed : styles.button]}          
                  onPress={() => navigation.navigate('TicketsView')}
                  onPressIn={() => setIsPressed(true)}
                  onPressOut={() => setIsPressed(false)}
                >
                  <Text style={styles.buttonText}>Purchase Tickets</Text>
                </TouchableOpacity>
        </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  bgImage: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 25,
    fontFamily: "Arial",
    fontSize: 28,
    fontWeight: '600', //semi-bold
    textAlign: 'center',
    fontStyle: "italic",
    color: colors.black,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    fontFamily: "NeueHaasDisplayRoman",
    width: "100%"
  },
  ticketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  ticketType: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.primaryRegular
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5
  },
  ticketDescription: {
    fontSize: 16,
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
    borderColor: colors.gray, // Black border color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: '20%',
    borderWidth: 2, // Black border
    marginTop: 50
  },
  buttonPressed: {
    backgroundColor: colors.black, 
    borderColor: colors.white, 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: '20%',
    borderWidth: 2, // Black border
    marginTop: 50
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketsScreen;
