import axios from "axios";

const url_API = "http://localhost:3000/playlist";
const url_API2 = "http:/localhost:3000";

export const fetchApiPlaylists = async () => {
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

export const fetchApiPlaylistByUserIndividually = async (user_id) => {
  console.log("user_id", user_id);
  try {
    const response = await fetch(`${url_API}/${user_id}`);
    const data = await response.json();
    console.log("response", data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export const fetchApiPlaylistById = async (id) => {
  const url = `${url_API}/${id}/details`;
  try {
    const response = await axios.get(url);
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

export const getAllPlaylists = async () => {
  try {
    const response = await axios.get(url_API);
    return response.data;
  } catch (error) {
    throw error;
  }

}

export const deletePlaylist = async (id) => {
  try {
    const response = await axios.delete(`${url_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }

}

export const getPlaylistDetails = async (id) => {
  try {
    const response = await fetch(`${url_API}/${id}/details`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const addMusicToPlaylist = async ({ playlistId, musicId }) => {
  try {
    const response = await axios.post(`${url_API2}/${playlistId}/music/${musicId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createPlaylist = async ({ name, description, duration, user_id }) => {
  try {
    console.log(name, description, duration, user_id);
    const response = await axios.post(`http://localhost:3000/playlist`, 
    { 
      name:name,
      description: description,
      duration: duration, 
      user_id: user_id });

    console.log("data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


