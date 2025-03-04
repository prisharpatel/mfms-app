import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../styles';
import { set } from 'react-native-reanimated';

// Speaker Data Array
const speakers = [
  {
    id: '1',
    name: 'Emily Blair',
    image: require('../../../assets/images/speakers/Emily_Blair.jpg'),
    title: 'CEO and Founder of Emily Blair Media',
    description: "Emily has been navigating the cutthroat entertainment industry since she was in high school following a chance encounter with a reporter at Us Weekly magazine. By the time she was a senior at Chapman University majoring in Strategic and Corporate Communication, Emily simultaneously worked as a full-time journalist at Us Weekly, balancing a schedule of final exams and Oscars red carpets. \nFollowing graduation, on the brink of the pandemic, Emily noticed a huge shift in the world of celebrity, and understood that a new wave of digitally-native talent was rapidly emerging - and unfortunately, so many of her colleagues were uninterested in covering them, and publicists she’d come to work with didn’t understand how to represent them. With her veteran understanding of the evolving editorial landscape, matched with her growing enthusiasm in the creator economy, Emily reverse-engineered the journalist-publicist relationship, and launched Emily Blair Media. \nEBM's roster includes global top-charting podcasters, reality television stars, athletes, musicians, fashion bloggers, below-the-line artists, and D2C brands across beauty, lifestyle, wellness, fashion and tech. Within the past six years, Emily has won multiple accolades and awards, expanded internationally, became one of the youngest editorial producers for Vogue, and employs a team of 25 women. As a PR professional with extensive experience in crisis management, media relations, and brand development, Emily has been pivotal in guiding her clients through crises — from digital backlash to public relations pitfalls. \nHer tenure as a journalist uniquely enables her to forecast media response, and to halt and strategically mitigate a crisis in its tracks. Her insights into navigating high-stakes situations and successfully acting amidst unexpected challenges has made her an invaluable asset to her clients’ communication teams, and has saved many of them who boast several million online followers from “cancel culture,” negative press, and severed partnerships. Her savvy approach to thinking critically and creatively, and her ability to handle each client’s publicity with a unique and authentic outlook, has positioned her as an industry leader, across many competitors and colleagues with decades of experience under their belts.",
  },
  {
    id: '2',
    name: 'Dianna Cohen',
    image: require('../../../assets/images/speakers/Dianna_Cohen.jpg'),
    title: 'Founder of Crown Affair',
    description: 'Dianna Cohen is the Founder of Crown Affair, a haircare line that creates clean and effective formulas and handcrafted tools to transform the health of your hair and your relationship to it. Prior to Crown Affair, Dianna founded Levitate, a brand marketing agency, where she led initiatives for brands including Harry’s, Flamingo, Outdoor Voices, The Wing, Buck Mason. and more. Dianna is part of Forbes’ 30 Under 30’. She resides between Miami and New York with her husband Alexander.',
  },
  {
    id: '3',
    name: 'Donni Davy',
    image: require('../../../assets/images/speakers/Donni_Davy.png'),
    title: 'Euphoria Head Makeup Artist',
    description: 'Donni (Doniella) Davy is an 2 x Emmy winning makeup artist, makeup department head on HBO’s Euphoria, and founder of Half Magic, making her a trailblazer in the beauty, film, and entertainment industry. \nDonni is a household name in the beauty industry - and now, she’s returning to the set for Euphoria Season 3. She is not only celebrated for her groundbreaking work on the show, but she’s also gained recognition for her artistry with the biggest stars of the moment like Reneé Rapp, Mindy Kaling, and Chappell Roan, whose cultural impact has been monumental this year. \nHer innovative approach has redefined beauty standards in entertainment, igniting a global movement centered on self-expression and creativity. Ultimately, Donni’s impact is undeniable, with her digital presence skyrocketing 120% in Instagram impressions alone, plus a 31% increase in TikTok views between March and September 2024. \nAs a department head of makeup on Euphoria, Donni oversees everything from the initial character designs to final application, making sure each look supports both the character’s emotional journey and the overall story. This includes not only the makeup but also special effects, prosthetics, and intricate details that define the show’s aesthetic. Every choice, from color palettes to bold eyeliner, is made with the camera in mind—ensuring each look is both visually striking and narratively meaningful. \nDonni has mastered the art of using makeup as a powerful storytelling tool, transforming it into a key element that helps define the show’s characters and amplify the emotional impact of the series.',
  },
  {
    id: '4',
    name: 'Jon Dinapoli',
    image: require('../../../assets/images/speakers/Jon_Dinapoli.jpg'),
    title: 'Founder + Chief Creative, Jon Michael Design',
    description: 'Jon Dinapoli, Founder and Chief Creative of Jon Michael Design, is a designer and leader with 25 years of experience in the luxury beauty and fashion industry. His vast experience spans a variety of designer, lifestyle, and celebrity brands, with a focus on multiple mediums and creative solutions. With formal training in graphic design and photography, he embodies the perfect blend of creativity, design, and strong business acumen. \nJon Michael Design is a full-service creative agency specializing in branding, packaging, 2D and 3D design, strategy, digital, advertising, merchandising, and more. JMD collaborates with many brands in the fashion and celebrity space, with a primary focus on the beauty category.',
  },
  {
    id: '5',
    name: 'Daniel Jadczak',
    image: require('../../../assets/images/speakers/Daniel_Jadczak.jpeg'),
    title: 'Chief Information Officer at LVMH Inc. North America',
    description: 'Daniel Jadczak, is a Chief Information Officer at LVMH Inc. North America region, and with an unlimited passion oversees all aspects of business-technology including OmniRetail, Data & AI, Infrastructure, CyberSecurity and Business Applications. \nDaniel has over 25 years of experience within the luxury tech field, with the last 16 at LVMH, showcasing a truly international experience, having worked in Asia, Europe and the US which has enriched his point of view on consumer behaviors and technology opportunities. \nAmong many accomplishments, one stands out where Daniel spearheaded a business-tech program for Louis Vuitton brand, which aimed at implementing an OmniRetail POS system in 63 countries. \nDaniel’s professional brand can be seen as ‘adoptable leader’ or in other words ‘always ready to partner-up, if the stakes are clear and prioritized‘. \nWhen not preoccupied with some sort of transformational initiative, he can be found on a ski slope or at a helm of a sailboat.',
  },
  {
    id: '6',
    name: 'Chelsea Parke Kramer',
    image: require('../../../assets/images/speakers/Chelsea_Kramer.png'),
    title: 'Founder & CEO, Parke',
    description: "Chelsea Parke, born in 1997 in New Jersey, is the visionary founder of Parke, a brand established out of her love for fashion and the quest for beautiful, classic pieces to elevate wardrobes. From a young age, Chelsea exhibited an ambitious drive, always knowing she would run her own business. Her journey in fashion began with her admiration for the perfect pair of jeans and a favorite white tee, leading her to create her namesake brand, Parke, in 2022. \nChelsea's mission is to help individuals build their closets with high-quality, comfortable, stylish, and versatile items designed to live with them for years. Parke’s first collection introduced the now signature Crossover Shorts, which exceeded expectations and led Chelsea to focus on creating elevated basics to replace the fast fashion items that were not meeting her standards. In 2023, Parke expanded from denim to everyday basics, offering pieces designed to be worn daily, paired with both high-end and casual items. \nChelsea's commitment to quality and style continued to drive the brand’s success. By 2024, Parke took denim manufacturing in-house, launching The Baggy Straight and other styles, showcasing the brand's dedication to excellence and innovation in denim design. Chelsea’s vision is to create clothing that transitions seamlessly from workouts to coffee dates and from the beach to nights out, ensuring that customers live in their Parke pieces. \nChelsea's passion for fashion was evident from a young age, with memories of her shopping sprees at Short Hills Mall and her mother’s obsession with True Religion jeans. Her love for denim is deeply rooted in her childhood experiences and continued through her college years at Dickinson College in Pennsylvania, where she studied Art History, the closest subject to fashion. In addition to her fashion endeavors, Chelsea was a college athlete, playing field hockey and lacrosse, and serving as the captain of both teams. Her leadership skills and determination on the field translate into her business acumen and dedication to her brand.",
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
            <View style={{ width: 150, height: 150, overflow: 'hidden' }}>
        <Image 
          source={item.image} 
          style={{ 
            width: '100%', 
            height: 200,  // Make it taller to crop the bottom
            alignSelf: 'center',  // Centers image horizontally
            position: 'relative', // Ensure the image is positioned normally
            //top: '20%' // Moves the image upwards, cropping the bottom
          }} 
          resizeMode="cover" // Crops from the bottom
        />
      </View>
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
    paddingTop: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
    fontFamily: "Arial"
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: "NeueHaasDisplayRoman"
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
    color: colors.gray,
    marginTop: 10,
    fontFamily: "NeueHaasDisplayRoman",
  },
});

export default SpeakersScreen;