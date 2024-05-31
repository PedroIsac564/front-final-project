import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createPlaylist } from '../../data/Playlists/Playlist'
import { useAuth } from '../../context/AuthContext';

const PlaylistForm = ({ onPlaylistCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      await createPlaylist({ name, description, duration, user_id: user.id });
      onPlaylistCreated();
      setName('');
      setDescription('');
      setDuration('');

    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        required
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        required
      />
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Duration"
        keyboardType="numeric"
        required
      />
      <Text>User: {user.name}</Text>
      <Button title="Create Playlist" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default PlaylistForm;
