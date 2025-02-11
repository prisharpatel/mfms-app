import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { fonts, colors } from '../../styles';

const { width: screenWidth } = Dimensions.get('window');
const widgetWidth = Math.min(screenWidth - 40, 600); // Dynamically calculate widget width

export default function EventTicketsView({ onGoBack }) {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
         {/* Header Section with Back Button */}
         <View style={styles.headerContainer}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          {/* "Tickets" Text */}
          <View style={styles.section}>
          <View style={styles.outlinedTextContainer}>
            <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>tickets</Text>
            <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>tickets</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>tickets</Text>
            <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>tickets</Text>
            <Text style={styles.outlinedText}>tickets</Text>
          </View>
        </View>
        </View>

        {/* Centered Eventbrite Widget */}
        <View style={styles.widgetContainer}>
          <WebView
            source={{ uri: 'https://www.eventbrite.com/e/michigan-fashion-media-summit-2024-tickets-837805878937' }}
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
  headerContainer: {
    flexDirection: 'row', // Align back button & text in a row
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 40, // Align to the left
    backgroundColor: colors.white, // Blue button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: colors.blue, // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlinedTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Ensures text is centered
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
