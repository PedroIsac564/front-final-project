import { Dimensions, View, Image, FlatList } from "react-native";
import styles from "./styles";
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { playlistData } from "../../data/constants";
import { useState } from "react";
import SongSlider from "../../components/SongSlider/SongSlider";
import SongInfo from "../../components/SongInfo/SongInfo";
import ControlCenter from "../../components/ControlCenter/ControlCenter";

const { width } = Dimensions.get("window");

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;

      default:
        break;
    }
  });

  const renderArtwork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              source={{ uri: track?.artwork.toString() }}
              style={styles.albumArtImg}
            />
          )}
        </View>
      </View>
    );
  };

  return (
  <View style={styles.container}>
    <FlatList
    horizontal
    data={playlistData}
    renderItem={renderArtwork}
    keyExtractor={song => song.id.toString()}
    />

    <SongInfo track={track} />
    <SongSlider />
    <ControlCenter />
  </View>
  );
};

export default MusicPlayer;
