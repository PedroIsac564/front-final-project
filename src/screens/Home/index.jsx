import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import styles from "./styles";
import{ fetchApiMusics } from "../../data/Musics/Music";
import { fetchApiPlaylistByUserIndividually, fetchApiPlaylists } from "../../data/Playlists/Playlist";
import MusicCard from "../../components/Musics/MusicCard";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicData = await fetchApiMusics();
        let playlistResponse; 
        if (user.id !== undefined) {
          playlistResponse = await fetchApiPlaylistByUserIndividually(user.id);
          console.log(playlistResponse); 
        }
        
        console.log(musicData);
        console.log("playlists "+ playlistResponse.playlists);
        setApiData(musicData.musics);
        setPlaylistData(playlistResponse.playlists);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        setPlaylistData([]); 
      }
    };
    fetchData();
  }, []);
  
  

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Playlists", { playlistId: item.id })}
    >
      <Text style={styles.artistTitle}>{item.name}</Text>
      <Text style={styles.playlistDescription}>{item.description}</Text>
      <Text style={styles.playlistDuration}>Duração: {item.duration}</Text>
    </TouchableOpacity>
  );

  const renderMusicItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <MusicCard
        key={item.id}
        songname={item.name}
        image={item.image}
        artist={item.artist}
      />
    </View>
  );

  const { width } = Dimensions.get("window");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/Beatflowlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Playlists</Text>
        { user.id === undefined ? (
      <Text style={styles.loadingText}>Let the beat flow</Text>
    ) : (playlistData === undefined ? (
      <Carousel
        data={playlistData}
        renderItem={renderPlaylistItem}
        sliderWidth={width}
        itemWidth={220}
        activeSlideAlignment="center"
        contentContainerCustomStyle={styles.carouselContent}
      />
    ) : (
      <Text style={styles.loadingText}>Carregando playlists...</Text>
    ))}


        <Text style={styles.artistTitle}>Músicas de Kanye West</Text>
        {apiData.length > 0 ? (
          <Carousel
            data={apiData.filter((item) =>
              item.artist.toLowerCase().includes("kanye west")
            )}
            renderItem={renderMusicItem}
            sliderWidth={width}
            itemWidth={220}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <Text style={styles.loadingText}>
            Carregando músicas de Kanye West...
          </Text>
        )}

        <Text style={styles.artistTitle}>Músicas de Matuê</Text>
        {apiData.length > 0 ? (
          <Carousel
            data={apiData.filter((item) =>
              item.artist.toLowerCase().includes("matuê")
            )}
            renderItem={renderMusicItem}
            sliderWidth={width}
            itemWidth={220}
            activeSlideAlignment="center"
            contentContainerCustomStyle={styles.carouselContent}
          />
        ) : (
          <Text style={styles.loadingText}>Carregando músicas de Matuê...</Text>
        )}
      </View>
    </ScrollView>
  );
}
