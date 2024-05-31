import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import { fetchApiMusics, addMusicToPlaylist } from "../../data/Musics/Music";
import MusicCardSearch from "../Musics/MusicCardSearch"
import styles from "./styles";

export default function Search({ musicId }) {
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchMade, setSearchMade] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      setApiData([]);
      setSearchMade(false);
      return;
    }
   
    const fetchData = async () => {
      setLoading(true);
      setSearchMade(true);
      try {
        const queryParams = `?search=${search.toLowerCase()}`;
        const dados = await fetchApiMusics(queryParams);
        console.log("Dados da API:", dados);
        setApiData(dados.musics || []);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        setApiData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  const handleAddMusicToPlaylist = async (musicId) => {
    try {
      await addMusicToPlaylist(selectedPlaylistId, musicId);
      fetchAllPlaylists();
    } catch (error) {
      console.error("Erro ao adicionar música à playlist: ", error);
    }
  };
  const updateSearch = (search) => {
    setSearch(search);
  };

  const filteredData = apiData.filter(
    (item) =>
      item.artist.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.album.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          inputContainerStyle={{
            backgroundColor: "#000000",
            borderRadius: 10,
            margin: 10,
            borderWidth: 2,
            borderColor: "#FF0000",
            borderBottomColor: "#FF0000",
            borderBottomWidth: 2,
          }}
          containerStyle={{
            backgroundColor: "#000000",
            borderRadius: 10,
            margin: 10,
          }}
          inputStyle={{
            color: "#fff",
          }}
          placeholderTextColor="#fff"
        />
      </View>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Pesquise por artistas, músicas ou álbuns
      </Text>
      <ScrollView>
        <View style={styles.render}>
          {loading ? (
            <Text style={styles.message}>Carregando...</Text>
          ) : searchMade && filteredData.length === 0 ? (
            <View>
              <Text style={styles.message}>
                O Artista, Album ou Música pesquisada ainda não existe em nosso
                aplicativo, sinto muito.
              </Text>
              <Image
                source={require("./../../../assets/triste.png")}
                style={styles.sad}
              />
            </View>
          ) : (
            filteredData.map((item) => (
              <View key={item.id} style={styles.renderCardView}>
                <MusicCardSearch
                  songname={item.name}
                  image={item.image}
                  artist={item.artist}
                />
                <TouchableOpacity onPress={() => handleAddMusicToPlaylist(musicId)}>
    <Text style={styles.addButton}>Adicionar à Playlist</Text>
  </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
