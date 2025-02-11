import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, fonts} from '../../styles'

const SpeakerDetails = ({ route }) => {
  const navigation = useNavigation();
  const { speaker } = route.params; // Get speaker data

  return (
    <View style={styles.container}>

      {/* Speaker Details */}
      <Image source={speaker.image} style={styles.image} />
      <Text style={styles.name}>{speaker.name}</Text>
      <Text style={styles.description}>{speaker.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#444',
  },
});

export default SpeakerDetails;