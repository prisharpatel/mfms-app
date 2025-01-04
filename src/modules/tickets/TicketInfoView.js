import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TicketInfoView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Buy Your Ticket</Text>
      <Text style={styles.content}>
        Here you can provide detailed information about how to buy your ticket.
      </Text>
    </View>
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