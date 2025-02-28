import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../styles';

// Speaker Data Array
const speakers = [
  {
    id: '1',
    name: 'Chris Appleton',
    image: require('../../../assets/images/speakers/default.png'),
    description: 'Celebrity hairstylist known for his work with Kim Kardashian and JLo.',
  },
  {
    id: '2',
    name: 'Lauryn Bosstick',
    image: require('../../../assets/images/speakers/default.png'),
    description: 'Entrepreneur, podcast host, and creator of The Skinny Confidential.',
  },
  {
    id: '3',
    name: 'Michael Bosstick',
    image: require('../../../assets/images/speakers/default.png'),
    description: 'Co-founder of Dear Media and host of The Skinny Confidential Podcast.',
  },
  {
    id: '4',
    name: 'Marcus Collins',
    image: require('../../../assets/images/speakers/default.png'),
    description: 'Marketing professor and former head of digital strategy at Beyoncé’s company.',
  },
  {
    id: '5',
    name: 'Speaker 5',
    image: require('../../../assets/images/speakers/default.png'),
    description: 'Music producer and creative director for major fashion brands.',
  },
  {
    id: '6',
    name: 'Speaker 6',
    image: require('../../../assets/images/speakers/default.png'),
    description: 'Fashion designer known for innovative runway shows.',
  },
];

const SpeakersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MFMS 2025 Speakers</Text>
      <Text style={styles.subtitle}>Click on our speakers to learn more.</Text>

      {/* Speaker Grid */}
      <FlatList
        data={speakers}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.speakerContainer}
            onPress={() => navigation.navigate('SpeakerDetails', { speaker: item })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.primaryBold
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  speakerContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray
  },
});

export default SpeakersScreen;