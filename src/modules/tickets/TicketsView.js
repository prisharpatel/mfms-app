import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { fonts, colors } from '../../styles';

const { width: screenWidth } = Dimensions.get('window');
const widgetWidth = Math.min(screenWidth - 40, 600); // Dynamically calculate widget width

export default function EventTicketsView() {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        {/* Header Section */}
        <View style={styles.section}>
          <Text> {'\n'} </Text>
          <View style={styles.outlinedTextContainer}>
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>tickets</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>tickets</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>tickets</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>tickets</Text>
            <Text style={styles.outlinedText}>tickets</Text>
          </View>
        </View>

        {/* Centered Eventbrite Widget */}
        <View style={styles.widgetContainer}>
          <WebView
            source={{ uri: 'https://www.eventbrite.com/e/jazz-at-webers-general-admission-ticket-wont-guarantee-a-seat-tickets-1131303241449?aff=ebdssbcitybrowsenightlife' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            style={{
              height: 450,
              width: widgetWidth, // Dynamically calculated width
            }}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: colors.white,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    fontFamily: fonts.primaryBoldItalic,
  },
  outlinedTextContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  outlinedTextShadow: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  widgetContainer: {
    height: 570,
    width: '100%',
    marginVertical: 20,
    alignItems: 'center', // Centers the WebView horizontally
    justifyContent: 'center', // Optional: centers vertically
  },
});
