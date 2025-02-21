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

        </View>

        {/* Centered Eventbrite Widget */}
        <View style={styles.widgetContainer}>
          <WebView
            source={{ uri: 'https://www.eventbrite.com/e/michigan-fashion-media-summit-2025-tickets-1245544139049?aff=oddtdtcreator' }}
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
  widgetContainer: {
    height: 700,
    width: '100%',
    marginVertical: 0,
    alignItems: 'center', // Centers the WebView horizontally
    justifyContent: 'center', // Optional: centers vertically
  },
});
