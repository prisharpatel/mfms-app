import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TicketsScreen(){
  return (
    <ScrollView style={styles.container}>
          <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.section}>
              <Text size={25} black > </Text>
              <View style={styles.outlinedTextContainer}>
                <Text style={[styles.outlinedTextShadow, { top: -1, left: -1 }]}>speakers</Text>
                <Text style={[styles.outlinedTextShadow, { top: -1, right: -1 }]}>speakers</Text>
                <Text style={[styles.outlinedTextShadow, { bottom: -1, left: -1 }]}>speakers</Text>
                <Text style={[styles.outlinedTextShadow, { bottom: -1, right: -1 }]}>speakers</Text>
                <Text style={styles.outlinedText}>speakers</Text>
              </View>
              <Text> {'\n'} </Text>
    
            </View>
          </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
  },
});