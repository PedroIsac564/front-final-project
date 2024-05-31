import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createPlaylist } from '../../data/Playlists/Playlist';
import { useAuth } from '../../context/AuthContext';

const PlaylistForm = ({ onPlaylistCreated, onComplete }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(null);

  console.log(user.id, name, description, duration)
  const handleSubmit = async () => {
    try {
      console.log("enviou");
      await createPlaylist({ name: name, description: description, duration: duration, user_id: user.id });
      console.log(createPlaylist)
      onPlaylistCreated();
      setName('');
      setDescription('');
      setDuration('');
      onComplete(true); 
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Erro ao criar playlist');
      onComplete(false); 
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
      {error && <Text style={styles.error}>{error}</Text>}
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
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default PlaylistForm;
