import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getPlaylistDetails } from '../../data/Playlists/Playlist'
import { addMusicToPlaylist, removeMusicFromPlaylist } from '../../data/Musics/Music' 
import AddMusicForm from '../../components/AddMusicSearch'
import MusicList from '../../components/Musics/MusicList'

const PlaylistDetails = ({ playlistId }) => {
  const [playlist, setPlaylist] = useState(null);
  const [musics, setMusics] = useState([]);

  const fetchPlaylistDetails = async () => {
    try {
      const response = await getPlaylistDetails(playlistId);
      setPlaylist(response.data.playlist);
      setMusics(response.data.musics);
    } catch (error) {
      console.error('Error fetching playlist details:', error);
    }
  };

  const handleAddMusic = async (musicId) => {
    try {
      await addMusicToPlaylist({ playlistId, musicId });
      fetchPlaylistDetails();
    } catch (error) {
      console.error('Error adding music to playlist:', error);
    }
  };

  const handleRemoveMusic = async (id) => {
    try {
      await removeMusicFromPlaylist(playlistId, id);
      fetchPlaylistDetails();
    } catch (error) {
      console.error('Error removing music from playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylistDetails();
  }, [playlistId]);

  if (!playlist) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{playlist.name}</Text>
      <Text>{playlist.description}</Text>
      <AddMusicForm onAddMusic={handleAddMusic} />
      <MusicList musics={musics} onRemoveMusic={handleRemoveMusic} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PlaylistDetails;
