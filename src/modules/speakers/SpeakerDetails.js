import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../styles';

const SpeakerDetails = ({ route }) => {
  const navigation = useNavigation();
  const { speaker } = route.params; // Get speaker data

  return (
    <ScrollView style={styles.container}>
      {/* Speaker Details */}
      <View style={styles.imageContainer}>
        <Image
          source={speaker.image}
          style={styles.image}
          resizeMode='contain' // Ensures the image is cropped from the bottom
        />
      </View>
      <Text style={styles.name}>{speaker.name}</Text>
      <Text style={styles.title}>{speaker.title}</Text>
      <Text style={styles.description}>{speaker.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: 250,
    height: 250,
    overflow: 'hidden', // Crop the bottom of the image
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center', // Horizontally center the image
    justifyContent: 'center', // Vertically center the image
    //marginLeft: 55,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: '100%', // Increase the height to crop from the bottom
    //position: 'relative', // Allow positioning adjustments
    //top: '15%', // Shift the image up so the bottom gets cropped
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 100,
    color: '#444',
  },
});

export default SpeakerDetails;
