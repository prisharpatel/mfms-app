import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

const FAQPage = ({ navigation }) => {
  const initialFaqData = [
    { id: '1', question: 'Question 1?', answer: 'Here is the answer to question 1.', expanded: false },
    { id: '2', question: 'Question 2?', answer: 'Here is the answer to question 2.', expanded: false },
    { id: '3', question: 'Question 3?', answer: 'Here is the answer to question 3.', expanded: false },
    { id: '4', question: 'Question 4?', answer: 'Here is the answer to question 4.', expanded: false },
    { id: '5', question: 'Question 5?', answer: 'Here is the answer to question 5.', expanded: false },
    { id: '6', question: 'Question 6?', answer: 'Here is the answer to question 6.', expanded: false },
    { id: '7', question: 'Question 7?', answer: 'Here is the answer to question 7.', expanded: false },
  ];

  const [faqData, setFaqData] = useState(initialFaqData);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle expanded state
  const toggleExpand = (id) => {
    setFaqData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  // Filtered FAQs based on search query
  const filteredFaqData = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back-arrow.png')} // Replace with your back arrow icon path
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/transparent_black.png')} // Replace with your logo path
          style={styles.logo}
        />
      </SafeAreaView>

      {/* FAQ Title */}
      <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      <Text style={styles.headerSubtitle}>
        Can't find your question? We are happy to help you at the check-in table.
      </Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search FAQs"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* FAQ List */}
      <FlatList
        data={filteredFaqData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(item.id)}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={styles.toggleIcon}>
                {item.expanded ? '−' : '+'}
              </Text>
            </TouchableOpacity>
            {item.expanded && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    //justifyContent: 'space-between', // Space out the back button and logo
    backgroundColor: '#1010110F', // Set the header background color
    paddingHorizontal: 0,
    width: 400, // Full width to cover the screen
    height: 120, // Adjust height to ensure full coverage
    borderBottomWidth: 1, // Optional: Add a bottom border
    borderBottomColor: '#DDD',
    alignSelf: 'center',
    marginTop: -15,
  },
  backButton: {
    padding: 10, // Ensure a tappable area for the back button
    
  },
  backArrow: {
    width: 40, // Adjust back arrow dimensions
    height: 40,
    resizeMode: 'contain',
  },
  logo: {
    alignSelf: 'center', // Center the logo horizontally
    width: 150, // Adjust logo width
    height: 60, // Adjust logo height
    resizeMode: 'contain',
    paddingLeft: 280,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    paddingTop: 50, 
    paddingBottom: 15,
    color: '#101011',
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 16,
    paddingBottom: 15,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 25,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#101011',
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101011',
  },
  answerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default FAQPage;
