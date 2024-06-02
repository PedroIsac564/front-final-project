import { PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { Track } from "react-native-track-player";
import styles from "./styles";

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

const SongInfo = ({track}: SongInfoProps) => {
  return (
  <View style={styles.container}>
    <View>
      <Text style={styles.name}>
          {track?.title}
      </Text>
      <Text style={styles.artist}>
          {track?.artist}  . {track?.album}
      </Text>
    </View>

  </View>
  );
};

export default SongInfo;
