import axios from "axios";

const url_API = "http://localhost:3000/playlist";

const fetchApiPlaylists = async () => {
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

const fetchApiPlaylistById = async (id) => {
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

export default fetchApiPlaylistById;

export { fetchApiPlaylists, fetchApiPlaylistById };
