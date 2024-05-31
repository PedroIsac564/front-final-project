import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAllPlaylists, deletePlaylist } from '../../data/Playlists/Playlist';

const PlaylistList = ({ onPlaylistSelect }) => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const response = await getAllPlaylists();
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Playlists</Text>
      {playlists.map((playlist) => (
        <View key={playlist.id} style={styles.playlistItem}>
          <Text>{playlist.name}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => onPlaylistSelect(playlist.id)}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(playlist.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    marginHorizontal: 10,
    color: 'blue',
  },
});

export default PlaylistList;
