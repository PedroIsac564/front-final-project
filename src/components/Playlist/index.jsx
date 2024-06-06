import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { deletePlaylist } from '../../data/Playlists/Playlist';

const   PlaylistList = ({ onPlaylistSelect }) => {
  const [playlists, setPlaylists] = useState([]);
  console.log(playlists)


  const handleDelete = async (id) => {
    try {
      await deletePlaylist(id);
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };



  return (
    <View>
      <Text style={styles.title}>Playlists</Text>
      {playlists.map((playlists) => (
        <View key={playlists.id} style={styles.playlistItem}>
          <Text style={styles.text}>{playlists.name}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => onPlaylistSelect(playlists.id)}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(playlists.id)}>
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
  text:{
    fontSize: 16,
    marginBottom: 5,
    color: "#720032"
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
