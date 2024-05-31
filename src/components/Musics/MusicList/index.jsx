import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MusicList = ({ musics, onRemoveMusic }) => {
  return (
    <View>
      {musics.length > 0 ? (
        musics.map((music) => (
          <View key={music.id} style={styles.musicItem}>
            <Text>{music.name} by {music.artist}</Text>
            <Button title="Remove" onPress={() => onRemoveMusic(music.id)} />
          </View>
        ))
      ) : (
        <Text>No music found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  musicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default MusicList;
