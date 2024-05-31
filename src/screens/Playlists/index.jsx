import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Title from "../../components/Title";
import { fetchApiPlaylists, fetchApiPlaylistById, addMusicToPlaylist } from "../../data/Playlists/Playlist";
import { fetchApiMusics } from "../../data/Musics/Music";
import Search from "../../components/Search";
import PlaylistList from "../../components/Playlist";
import PlaylistDetails from "../../components/PlaylistDetails";
import PlaylistForm from "../../components/CreatePlaylist";

export default function PlaylistsScreen() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [allMusics, setAllMusics] = useState([]);
  const [completed, setCompleted] = useState(false); 
  const navigation = useNavigation();
  

   const fetchAllPlaylists = async () => {
     try {
       const allPlaylistsResponse = await fetchApiPlaylists();
       setAllPlaylists(allPlaylistsResponse.playlists || []);
     } catch (error) {
       console.error("Erro ao buscar todas as playlists: ", error);
       setAllPlaylists([]);
     }
   };

   const fetchAllMusics = async () => {
     try {
       const musicData = await fetchApiMusics();
       setAllMusics(musicData);
     } catch (error) {
       console.error("Erro ao buscar todas as músicas: ", error);
       setAllMusics([]);
     }
   };

   useEffect(() => {
     fetchAllPlaylists();
     fetchAllMusics();
   }, []);

   useEffect(() => {
     if (selectedPlaylistId) {
       const fetchPlaylistData = async () => {
         try {
           const playlistDataResponse = await fetchApiPlaylistById(selectedPlaylistId);
           setPlaylistData(playlistDataResponse);
         } catch (error) {
           console.error("Erro ao buscar dados da playlist: ", error);
         }
       };
       fetchPlaylistData();
     }
   }, [selectedPlaylistId]);

   const handlePlaylistSelect = (id) => {
     setSelectedPlaylistId(id);
   };

   const handleAddMusicToPlaylist = async (musicId) => {
     try {
       await addMusicToPlaylist(selectedPlaylistId, musicId);
       fetchAllPlaylists();
     } catch (error) {
       console.error("Erro ao adicionar música à playlist: ", error);
     }
   };

   const handlePlaylistCreated = () => {
     setSelectedPlaylistId(null);
     fetchAllPlaylists();
   };

  return (
    <ScrollView style={styles.scrollView}>
      <PlaylistForm onPlaylistCreated={handlePlaylistCreated} onComplete={setCompleted} />
      {completed ? (
        <View>
          <Search />
          {/* <PlaylistDetails /> */}
          <PlaylistList /> 
        </View>
      ) : (
        <Text>Erro ao criar playlist</Text>
      )}
    </ScrollView>
  );
}

{/* <View style={styles.container}>
  <Title title="Playlists" />
  <View style={styles.playlistListContainer}>
    <PlaylistList onPlaylistSelect={handlePlaylistSelect} />
  </View>
  <View style={styles.playlistDetailsContainer}>
    {selectedPlaylistId && playlistData ? (
      <PlaylistDetails playlistId={selectedPlaylistId} />
    ) : (
      <View>
        <Text style={styles.noPlaylistText}>Nenhuma playlist selecionada.</Text>
        <Text style={styles.createPlaylistText}>Crie uma nova playlist abaixo:</Text>
        <PlaylistForm onPlaylistCreated={handlePlaylistCreated} />
      </View>
    )}
  </View>
  <View style={styles.allMusicsContainer}>
    <Text style={styles.allMusicsTitle}>Todas as Músicas Disponíveis</Text>
    {allMusics.length > 0 ? (
      allMusics.map((music) => (
        <TouchableOpacity key={music.id} onPress={() => handleAddMusicToPlaylist(music.id)}>
          <Text style={styles.musicItem}>{music.name}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.noMusicText}>Nenhuma música disponível.</Text>
    )}
  </View>
</View> */}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  container: {
    flex: 1,
    padding: 20,
  },
  playlistListContainer: {
    marginBottom: 20,
  },
  playlistDetailsContainer: {
    marginBottom: 20,
  },
  allMusicsContainer: {
    marginTop: 20,
  },
  allMusicsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  musicItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  noPlaylistText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  createPlaylistText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  noMusicText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
