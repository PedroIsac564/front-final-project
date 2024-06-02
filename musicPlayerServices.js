import TrackPlayer, { RepeatMode, Event } from 'react-native-track-player';
import { playlistData } from './src/data/constants';

export async function setupPlayer() {
    let isSetup = false;
    try {
        // Check if player is already set up
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    } catch (error) {
        // Player is not set up, so set it up now
        try {
            await TrackPlayer.setupPlayer();
            isSetup = true;
            console.log('Player setup complete');
        } catch (setupError) {
            console.error('Error setting up player:', setupError);
        }
    } finally {
        return isSetup;
    }
}

export async function addTrack() {
    try {
        await TrackPlayer.add(playlistData);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        console.log('Tracks added and repeat mode set');
    } catch (error) {
        console.error('Error adding tracks:', error);
    }
}

export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });
}
