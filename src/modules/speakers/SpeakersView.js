import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../../styles';

// Speaker Data Array
const speakers = [
  {
    id: '1',
    name: 'Emily Blair',
    image: require('../../../assets/images/speakers/Emily_Blair.jpg'),
    title: 'CEO & Founder of Emily Blair Media',
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
    title: 'Founder & Chief Creative, Jon Michael Design',
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
    title: 'Founder & CEO of Parke',
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
    image: require('../../../assets/images/speakers/Ella_Rose.jpg'),
    description: "Ella Rose McFadin is a 27-year-old fashion and lifestyle digital creator based in New York City, as well as the founder of the clean beauty brand Skin by Ella. With a passion for embracing natural beauty, Ella discovered a newfound confidence in enhancing rather than masking her features. \nDriven by the desire to share this empowering approach, she launched Skin by Ella—a collection of clean, everyday makeup essentials and accessories, including liquid blushes, lip oil, and brow gel. The brand reflects Ella’s belief in the power of simplicity, catering to a community that values the philosophy of 'less is more.' \nA highly influential voice across fashion, beauty, and wellness, Ella has become a top source of inspiration for her dedicated audience. Her ability to authentically connect with her followers has made her a key tastemaker in the industry."
  },
  {
    id: '9',
    name: 'Lori Singer',
    title: 'President of Parlux Fragrances', 
    image: require('../../../assets/images/speakers/Lori_Singer.jpg'),
    description: "A proud University of Michigan alum, Lori Singer has been a transformative force at Parlux Ltd. since assuming the role of President in 2019. A visionary leader with a unique ability to merge cultural influence with prestige fragrance, she has redefined how brands engage with modern consumers while preserving their luxury heritage. Under Lori's leadership, Parlux delivered one of beauty's biggest success stories - the launch of Billie Eilish's debut fragrance and her subsequent collection as one of the fastest-growing artist fragrance lines in history. She also revitalized legacy fragrance house Vince Camuto, is launching Paris Hilton's 30th fragrance and introduced The Shop Men's Grooming Line in collaboration with LeBron James and Maverick Carter.\nBefore joining Parlux, Lori built an impressive career at Coty as Group Vice President of Global Marketing, driving growth for some of the most iconic names in luxury fragrance, including Marc Jacobs, Balenciaga, Calvin Klein, and Vera Wang. Her expertise in crafting compelling brand narratives and consumer-first strategies laid the foundation for her success at Parlux.\nLori’s impact on the beauty industry has been widely celebrated, with honors including the 2024 WWD x Beauty Inc. Top 50 Women in Power and the prestigious Cosmetic Executive Women (CEW) Achiever Award. She also plays a key role in shaping the industry’s future as a board member of both CEW and The Fragrance Foundation, further solidifying her leadership and influence.\nThrough strategic partnerships, cultural foresight, and digital innovation, Lori Singer is not just shaping the future of fragrance—she is redefining the future of beauty."
  },
  {
    id: '10',
    name: 'Bonnie Abraham',
    title: 'Senior Vice President of Retail at Balenciaga Americas',
    image: require('../../../assets/images/speakers/Bonnie_Abraham.jpeg'),
    description: "Bonnie Abraham is the Senior Vice President of Retail at Balenciaga Americas, overseeing Balenciaga’s 60 stores across the United States, Canada, Brazil, and Mexico. With a strategic focus on business growth and luxury, she plays a pivotal role in developing and executing strategies that enhance retail performance, elevate the client experience, and strengthen Balenciaga’s regional impact. \nAfter graduating from the University of North Texas with a bachelor’s degree in Fashion and Business, Bonnie began her career in the Neiman Marcus Executive Development Program. Before joining Balenciaga, she held executive roles in Merchandising and Retail at leading luxury fashion houses, including Gucci, Burberry, Valentino, and Chanel."
  },
  {
    id: '11',
    name: 'Jessica Williams',
    title: 'Head of Brand & Partnerships at Shopify',
    image: require('../../../assets/images/speakers/Jessica_Williams.jpg'),
    description: 'Jessica is the Head of Brand and Partnerships at Shopify, where she leads a team dedicated to inspiring the next generation of entrepreneurs to build with and love Shopify. They bring this mission to life through campaigns that celebrate the spirit of entrepreneurship and strategic collaborations with renowned and emerging creators and celebrities, including MrBeast, Emma Chamberlain, Charli and Dixie D’Amelio, Cassey Ho, Ashley Alexander, Kai Cenat, Nicki Minaj, and Drake. These partners share their personal business journeys, motivating their audiences to pursue their own entrepreneurial ambitions. \nBefore joining Shopify, Jessica led consumer partnerships at Coinbase, exploring the intersections of crypto with sports, music, and fashion. Prior to that, she held various roles in product marketing, brand marketing, and partnerships at Visa.'
  },
  {
    id: '12',
    name: 'Mike Sainristil',
    title: 'NFL Cornerback for the Washington Commanders and Captain of Michigan’s National Championship Team 144 ', 
    image: require('../../../assets/images/speakers/Mike_Sainristil.jpg'),
    description: 'Mike Sainristil is a Haitian-American Cornerback for the Washington Commanders. After fleeing Haiti, his family settled in Everett, Massachusetts where Mike solidified himself as one of the best players in the state. As a senior he was the Massachusetts 2018 Gatorade Player of the Year. After playing both sides of the ball in high school, he committed to Michigan as a Wide Receiver. \nIn 2022, as Captain of the Michigan football team, Sainristil moved to cornerback. He became first team All American and helped lead his team to the 2023 big ten championship game where he was named MVP. He then went on to record the game clinching interception in the 2024 college football playoff national championship intercepting Michael Penix Jr. and returning it 81 yards.' 
  },
  {
    id: '13',
    name: 'Paige Lorenze',
    title: 'Founder, Entrepreneuer, and Digital Creator', 
    image: require('../../../assets/images/speakers/Paige_Lorenze.jpg'),
    description: "As a content creator and entrepreneur, Paige Lorenze built her extremely loyal community through style tips and showing her trendsetting lifestyle. Paige’s unique content and love of life’s simple pleasures inspired her move to a cozy Connecticut cottage in 2022 where the Dairy Boy lifestyle began to take shape. What started as a simple catchphrase between Paige and her followers has evolved into worldwide phenomenon and propelled her community of over a million to build a space for conversations, connections, and a different kind of brand that makes her Americana lifestyle to be accessible to anyone. \nThrough her relationship with American tennis pro Tommy Paul, Paige has taken the tennis world by storm. Bringing her followers along for the ride on all the ATP tour stops, Paige’s love of tennis has garnered the attention of international media through her appearance on Netflix’s Break Point while her fashion-focused community eagerly awaits her behind-the-scenes content from each tournament. Paige continues to grow her Dairy Boy brand, opening a headquarters in Los Angeles in January. Most recently, Paige was named the Miami Open's 'Chief Lifestyle Officer' where she documented her favorite destinations on the grounds for the @miamiopen account and co-hosted promotional content alongside the tournament's host Andrew Kransy."
  },
  {
    id: '14',
    name: 'Dan Solomon',
    title: 'Celebrity Stylist and CEO of Closet Tours', 
    image: require('../../../assets/images/speakers/Don_Solomon.jpg'),
    description: 'Dan discovered the opportunity to merge his two passions, fashion, and sports while selling rare garments and sneakers to the basketball team at Indiana University. As he began to grow his network further, he was able to immerse himself in the world of personal shopping and styling. This all led to Dan starting his own consulting company out of college, helping hundreds of professional athletes with everything from styling and personal shopping to merch lines and brand deals. He also tours the country creating pop up shops for specific NBA and NFL teams, as well as top college programs so they never have to leave the building to get what they need. This created a whole new way for athletes to shop the hottest brands in a private, convenient way that others now emulate. \nDan has since launched Closet Tours which is a company that allows consumers to shop directly from the closets of their favorite athletes and other talents in music and entertainment. Additionally, Closet Tours has a Youtube channel that takes you behind the scenes of celebrities closets such as Druski and Michael Rainey Jr.'
  },
  {
    id: '15',
    name: 'James Bee',
    title: 'Fashion Photographer and Director', 
    image: require('../../../assets/images/speakers/James_Bee.jpg'),
    description: 'James Bee is a Brooklyn-based fashion photographer known for his sensual, intimate, and provocative style. Drawing from his background as a competitive ballroom dancer, he directs subjects to express emotion through movement, capturing it in striking, evocative imagery. \nHis clients include Calvin Klein, Rhode Beauty, Skims, Cult Gaia, MAC, Vogue, V Magazine, and PAPER Magazine. He has also collaborated with artists such as Rosalía, Muni Long, Camila Cabello, and Nicola Formichetti.'
  },
  {
    id: '16',
    name: 'Sami Clarke Barnett',
    title: 'Co-Founder of FORM', 
    image: require('../../../assets/images/speakers/Sami_Barnett.jpg'),
    description: 'Sami Clarke is a formidable fitness force beloved by exercise fans everywhere. Born into a family of athletes and bodybuilders, Sami Clarke’s passion for fitness and wellness was in her blood. She decided to take her passion for wellness more intentionally during the COVID quarantine; with everyone staying home and desperate for both physical and mental stimulation, Sami knew she had the expertise a lot of people were needing. After building both her Instagram and YouTube community to over a million followers, Sami launched FORM with best friend Sami Spalter in August 2021. Sami is not only the face of FORM, but truly the heart and soul. FORM’s mission is to make Sami’s wellness tools accessible to anyone and everyone, where ever they may be on their wellness journey.'
  },
  {
    id: '17',
    name: 'Emilie Rubenfeld',
    title: 'Global President of Carolina Herrera', 
    image: require('../../../assets/images/speakers/Emilie_Headshot.png'),
    description: "Emilie Rubinfeld has been a leader in luxury fashion for over a decade. Throughout her career, she has built brand & business strategies for iconic US and European based fashion houses.  Today, Emilie Rubinfeld is the Global President of Carolina Herrera – the New York-based fashion brand internationally recognized for iconic style and bold elegance, owned by Puig, the Barcelona, Spain based beauty and fashion company. \nFounded by the namesake designer in 1981, Carolina Herrera creates women’s luxury ready-to-wear and accessory collections distributed globally at over 200 points of sale.  As President, Emilie is leading the organization to be at the forefront of women's luxury fashion while building a thriving and enduring global brand for the future. Prior to the role of President, Emilie held the position of Chief Marketing Officer at the company.  During her career in fashion, Emilie has had senior marketing and communications roles at the US-subsidiary of Italian fashion brand, Giorgio Armani, as well as the Swiss-based women’s luxury brand, Akris. \nEmilie sits on the Board of Directors for the University of Michigan’s Alumni Association as well as the Fashion Scholarship Foundation (FSF).  She was a founding member of the Social Justice Center Advisory Committee at New York's Fashion Institute of Technology (FIT) and has been a supporter of Dress for Success, supporting fundraising efforts through participation in the New York City Marathon. \nThroughout her career, she has been a mentor and advisor to independent designers and emerging talent in the fashion industry – and has supported the Council of Fashion Designers of America’s (CFDA) Vogue Fashion Fund as a business mentor.  She is a graduate of the University of Michigan with a Liberal Arts degree, majoring in both, Art History and Political Science." 
  },
  {
    id: '18',
    name: 'Shelby Silva',
    title: 'VP of Operations at FORM', 
    image: require('../../../assets/images/speakers/Shelby_Silva.jpg'),
    description: 'Shelby is the VP of Operations at FORM and a producer of TRANSFORM, playing a pivotal role in building the brand from the ground up as FORM’s first-ever hire. Since before launch, Shelby has been instrumental in scaling operations, shaping the brand’s vision, and bringing FORM’s innovative fitness and activewear experiences to life. Based in Los Angeles, she has always been passionate about fitness and wellness, sharing her journey and lifestyle on social media.'
  },
  {
    id: '19',
    name: "Sophia Rzankowski",
    title: "Chief of Staff at Superconnector Studio",
    image: require('../../../assets/images/speakers/Sophia_Rzankowski.jpg'),
    description: "Sophia Rzankowski is Chief of Staff at Superconnector Studios, one of Fast Company’s “World’s Most Innovative Companies” for the past two years, working at the intersection of brands and entertainment. Sophia helps lead LVMH’s brand entertainment studio, 22 Montaigne Entertainment, a platform dedicated to co-developing and co-producing original film and TV projects across its portfolio of 75+ luxury brands, including Tiffany & Co., Dior, and Louis Vuitton. \nWith a deep passion for shaping the future of how brands participate in storytelling, Sophia is dedicated to bridging the worlds of luxury & entertainment to bring culturally compelling narratives to life. \nPrior to Superconnector Studios, she worked in film development, consulting, and marketing. A Michigan native, Sophia studied Business and the Entertainment Industry at the University of Southern California and is now based in NYC."
  },
  {
    id: '20',
    name: 'Seth Ader',
    title: 'Vice President of Sports Marketing at ESPN',
    image: require('../../../assets/images/speakers/Seth_Ader.png'),
    description: "Seth Ader is vice president of brand marketing. A 24-year veteran of the company, Ader oversees marketing efforts related to the overarching ESPN brand, including new and historic brand campaigns like There’s No Place Like Sports and This is SportsCenter, ESPN’s original content including ESPN films such as The Last Dance and the 30 for 30 franchise, and marketing related to studio shows, digital products, sports betting and fantasy games, ESPN’s consumer products licensing business, and ESPN Audio. \nPreviously, Ader oversaw consumer marketing and sponsorship development of the following ESPN rights: the NFL, NBA, MLB, NHL, MLS, UEFA, the TCS New York City Marathon, Special Olympics World Games and the Little League World Series. Prior to that, he served as senior director, leading the marketing efforts for a wide array of sports properties, including the 2006, 2010, and 2014 FIFA World Cups. Additionally, Ader was responsible for the award-winning This is SportsCenter franchise for a number of years, maintaining the unique and consistent personality of that signature campaign. \nA graduate of the University of Michigan, Ader joined ESPN in 2001 as a marketing manager, driving the marketing efforts of original entertainment programming, ESPN The Magazine and the launch of ESPN Deportes and ESPN HD networks. After two years, Seth was promoted to director of marketing responsible for the NFL and NBA. \nAder received two Sports Emmy awards for his collaboration with ESPN’s production team on elements for the 2010 FIFA World Cup and for the marketing campaign supporting the 2014 FIFA World Cup. Additionally, the work produced under Ader’s leadership has received numerous awards, including three Bronze Lions for This is SportsCenter, an Effie for Fantasy Football’s “It’s Good to Be Commissioner” campaign and several Sports Media Marketing Awards. \nPrior to ESPN, Ader’s previous roles included vice president of marketing of Book4Golf.com, director of marketing and public relations for Tear Drop/Tommy Armour Golf Co., sales manager for Conde Nast Publications and corporate marketing manager for the former New Jersey (now Brooklyn) Nets."
  },
  {
    id: '21',
    name: 'JT Barnett',
    title: 'Founder of CreatorX',
    image: require('../../../assets/images/speakers/JT.jpg'),
    description: "JT Barnett is a dynamic professional whose career integrates brand strategy, entrepreneurship, and thought leadership in content creation. As the Founder and CEO of CreatorX, and a former professional athlete, he offers strategic advice to global organizations on content innovation and personal growth. His collaborations with renowned brands such as Tonal, Therabody, and Poppi highlight his influence and expertise. JT’s insights have been featured in leading publications like Business Insider, Fast Company, and Inc. Magazine, cementing his reputation as a thought leader."
  },
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
      <Text style={styles.title}>Speakers</Text>
      <View style={styles.divider} />        
      
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
            activeOpacity={1.0} // This prevents the opacity change when pressed

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
  title:{
    fontFamily: "NeueHaasDisplayRoman",
    fontSize: 36,
    fontWeight: '600', //semi-bold
    textAlign: 'center',
    color: colors.black,
    marginHorizontal: 20,
  },
  divider: {
    width: '50%', 
    alignSelf: 'center',
    height: 1, 
    backgroundColor: colors.black,  
    marginTop: 8,
    marginBottom: 20, 
    marginHorizontal: 20,
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