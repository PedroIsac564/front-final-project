import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { setupPlayer, addTrack } from "../../musicPlayerServices";

import TabRoutes from "./tab.routes";
import MusicPlayer from "../screens/MusicPlayer/MusicPlayer";

export default function Routes() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer>
      <TabRoutes />
      <StatusBar style="auto" />\
      <MusicPlayer />
    </NavigationContainer>
  );
}
