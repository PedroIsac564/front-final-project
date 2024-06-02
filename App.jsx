import React, { useEffect } from 'react';
import Routes from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import TrackPlayer from 'react-native-track-player';
import { playbackService, setupPlayer, addTrack } from './musicPlayerServices';

export default function App() {
  useEffect(() => {
    const initializePlayer = async () => {
      const isPlayerSetup = await setupPlayer();
      if (isPlayerSetup) {
        await addTrack();
      }
    };

    initializePlayer();
    TrackPlayer.registerPlaybackService(() => playbackService);
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
