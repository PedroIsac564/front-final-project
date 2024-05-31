import axios from "axios";

const url_API = "http://localhost:3000/musics";

export const fetchApiMusics = async () => {
  try {
    const response = await axios.get(url_API);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error: ", error.response.data);
      console.log("Status: ", error.response.status);
    } else if (error.request) {
      console.log("No response: ", error.request);
    } else {
      console.log("Error: ", error.message);
    }
    throw error;
  }
};

export const fetchApiMusicsByName = async (name) => {
  try {
    const response = await axios.get(url_API, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error: ", error.response.data);
      console.log("Status: ", error.response.status);
    } else if (error.request) {
      console.log("No response: ", error.request);
    } else {
      console.log("Error: ", error.message);
    }
    throw error;
  }
};

export const addMusicToPlaylist = async ({ playlistId, musicId }) => {
  try {
    const response = await axios.post(`${url_API}/playlist/${playlistId}/musics`, { musicId });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const removeMusicFromPlaylist = async ({ playlistId, musicId }) => {
  try {
    const response = await axios.delete(`${url_API}/playlist/${playlistId}/musics/${musicId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


