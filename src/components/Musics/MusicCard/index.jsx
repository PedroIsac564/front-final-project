import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const MusicCard = ({ id, songname, image, artist }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Player", { musicId: id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>{songname}</Text>
          <Text style={styles.artistText}>{artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MusicCard;
