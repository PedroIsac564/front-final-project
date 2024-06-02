import Slider from "@react-native-community/slider";
import { View, Text } from "react-native";
import { useProgress } from "react-native-track-player";
import styles from "./styles";

const SongSlider = () => {
  const { position, duration } = useProgress();

  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#fff"
        maximumTrackTintColor="#fff"
        style={styles.sliderContainer}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          {new Date((duration - position) * 1000).toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

export default SongSlider;
