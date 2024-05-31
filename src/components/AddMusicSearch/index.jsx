import React, { useState } from 'react';
import fetchApiMusicsByName from '../../data/Musics/Music'

const AddMusicForm = ({ onAddMusic }) => {
  const [musicName, setMusicName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMusicId, setSelectedMusicId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await fetchApiMusicsByName(musicName);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for music:', error);
    }
  };

  const handleAddMusic = (e) => {
    e.preventDefault();
    if (selectedMusicId) {
      onAddMusic(selectedMusicId);
      setMusicName('');
      setSearchResults([]);
      setSelectedMusicId(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={musicName}
          onChange={(e) => setMusicName(e.target.value)}
          placeholder="Music Name"
          required
        />
        <button type="submit">Search Music</button>
      </form>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((music) => (
            <li key={music.id} onClick={() => setSelectedMusicId(music.id)}>
              {music.name} by {music.artist}
            </li>
          ))}
        </ul>
      )}

      {selectedMusicId && (
        <form onSubmit={handleAddMusic}>
          <button type="submit">Add Selected Music</button>
        </form>
      )}
    </div>
  );
};

export default AddMusicForm;
