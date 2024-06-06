import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PlaylistCard = ({ name, description, duration, user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.duration}>Duration: {duration} mins</Text>
      <Text style={styles.user}>Created by: {user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  duration: {
    fontSize: 14,
    marginBottom: 10,
  },
  user: {
    fontSize: 12,
    color: '#888',
  },
});

export default PlaylistCard;
