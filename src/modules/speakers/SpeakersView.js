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
  {
    id: '7',
    name: 'Rebecca Goodman',
    image: require('../../../assets/images/speakers/Rebecca_Goodman.jpg'),
    title: 'Vice President, Marketing and Communications, The Americas at Manola Blahnik',
    description: "Rebecca Goodman Krantz is the Vice President of Marketing and Communications for Manolo Blahnik where she oversees all brand and retail marketing initiatives, VIP and influencer relations, events, media, and press for the Americas. Rebecca has been with the company for 5 years and has played an instrumental role in scaling the Manolo Blahnik business and elevating brand positioning. She is a passionate brand storyteller with over two decades of experience in luxury fashion.\n Prior to Manolo Blahnik, Rebecca held senior positions at Oscar de la Renta, Kering Group and EQUINOX, and held roles at Salvatore Ferragamo and Hermes. She is a proud graduate of the University of Michigan where she majored in Communications."
  },
  {
    id: '8',
    name: 'Ella Rose McFadin',
    title: 'Creator & Founder of Skin by Ella',
    image: require('../../../assets/images/speakers/ella_rose.jpeg'),
    description: "Ella Rose McFadin is a 27-year-old fashion and lifestyle digital creator based in New York City, as well as the founder of the clean beauty brand Skin by Ella. With a passion for embracing natural beauty, Ella discovered a newfound confidence in enhancing rather than masking her features. \nDriven by the desire to share this empowering approach, she launched Skin by Ella—a collection of clean, everyday makeup essentials and accessories, including liquid blushes, lip oil, and brow gel. The brand reflects Ella’s belief in the power of simplicity, catering to a community that values the philosophy of 'less is more.' \nA highly influential voice across fashion, beauty, and wellness, Ella has become a top source of inspiration for her dedicated audience. Her ability to authentically connect with her followers has made her a key tastemaker in the industry."
  },
  {
    id: '9',
    name: 'Lori Singer',
    title: 'President at Parlux Fragrances', 
    image: require('../../../assets/images/speakers/Lori_Singer.jpg'),
    description: "A proud University of Michigan alum, Lori Singer has been a transformative force at Parlux Ltd. since assuming the role of President in 2019. A visionary leader with a unique ability to merge cultural influence with prestige fragrance, she has redefined how brands engage with modern consumers while preserving their luxury heritage. Under Lori's leadership, Parlux delivered one of beauty's biggest success stories - the launch of Billie Eilish's debut fragrance and her subsequent collection as one of the fastest-growing artist fragrance lines in history. She also revitalized legacy fragrance house Vince Camuto, is launching Paris Hilton's 30th fragrance and introduced The Shop Men's Grooming Line in collaboration with LeBron James and Maverick Carter.\nBefore joining Parlux, Lori built an impressive career at Coty as Group Vice President of Global Marketing, driving growth for some of the most iconic names in luxury fragrance, including Marc Jacobs, Balenciaga, Calvin Klein, and Vera Wang. Her expertise in crafting compelling brand narratives and consumer-first strategies laid the foundation for her success at Parlux.\nLori’s impact on the beauty industry has been widely celebrated, with honors including the 2024 WWD x Beauty Inc. Top 50 Women in Power and the prestigious Cosmetic Executive Women (CEW) Achiever Award. She also plays a key role in shaping the industry’s future as a board member of both CEW and The Fragrance Foundation, further solidifying her leadership and influence.\nThrough strategic partnerships, cultural foresight, and digital innovation, Lori Singer is not just shaping the future of fragrance—she is redefining the future of beauty."
  },
  {
    id: '10',
    name: 'Bonnie Abraham',
    title: 'Senior Vice President of Retail at Balenciaga Americas',
    image: require('../../../assets/images/speakers/Bonnie_Abraham.jpg'),
    description: "Bonnie Abraham is the Senior Vice President of Retail at Balenciaga Americas, overseeing Balenciaga’s 60 stores across the United States, Canada, Brazil, and Mexico. With a strategic focus on business growth and luxury, she plays a pivotal role in developing and executing strategies that enhance retail performance, elevate the client experience, and strengthen Balenciaga’s regional impact. \nAfter graduating from the University of North Texas with a bachelor’s degree in Fashion and Business, Bonnie began her career in the Neiman Marcus Executive Development Program. Before joining Balenciaga, she held executive roles in Merchandising and Retail at leading luxury fashion houses, including Gucci, Burberry, Valentino, and Chanel."
  }

];
// sort speakers by name
speakers.sort((a, b) => {
  const firstNameA = a.name.split(' ')[0];
  const firstNameB = b.name.split(' ')[0];
  return firstNameA.localeCompare(firstNameB);
});

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
            <View style={{ width: 150, height: 200, overflow: 'hidden' }}>
        <Image 
          source={item.image} 
          style={{ 
            width: '100%', 
            height: 200,  // Make it taller to crop the bottom
            alignSelf: 'center',  // Centers image horizontally
            position: 'relative', // Ensure the image is positioned normally
            resizeMode: 'cover',
            alignSelf: 'center',
            // //top: '20%' // Moves the image upwards, cropping the bottom
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