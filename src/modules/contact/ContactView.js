import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';

import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ContactViewScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Stay In Touch</Text>

        <View style={styles.socialIconsContainer}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.michiganfashionmediasummit.com/')}>
            <Image 
              source={require('../../../assets/images/primarylogo.png')} 
              style={{ width: 60, height: 50 }} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/the_mfms/?hl=en')}>
            <Icon name="instagram" size={50} color={colors.black} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.tiktok.com/@the_mfms')}>
            <Image 
              source={require('../../../assets/images/tik-tok.png')} 
              style={{ width: 50, height: 50 }} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://open.spotify.com/show/665Wz5hi6qUmcqJxits75m?si=d7451dda455e43d9')}>
            <Icon name="spotify" size={50} color={colors.black} style={styles.socialIcon} />
          </TouchableOpacity>

          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center', // Keep it centered horizontally
  },
  title: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.blue,
    marginBottom: 30,
  },
  linkText: {
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.black,
    textDecorationLine: 'underline',
  },
  socialIconsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30
  },
  socialIcon: {
    marginHorizontal: 15,
    marginVertical: 50,
  },
});
