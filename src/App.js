import { useState } from 'react';
import getAllData from 'services/getAllData';
import RESOURCES from 'services/resources';
import './App.css';



function countCharsInName(char, resources) {
  return resources.reduce((acc, resource) => (acc + resource.name.toLowerCase().split(char).length - 1), 0)
}

function countChars(characters, locations, episodes) {
  return [
    {
      "char": "l",
      "count": countCharsInName('l', locations),
      "resource": "location"
    },
    {
      "char": "e",
      "count": countCharsInName('e', episodes),
      "resource": "episode"
    },
    {
      "char": "c",
      "count": countCharsInName('c', characters),
      "resource": "character"
    }
  ]

}
function getCharactersLocationFromEpisodes(characters, locations, episodes) {
  return episodes.map(episode => {
    return {
      name: episode.name,
      episode: episode.episode,
      locations: episode.characters
    }
  })
}


function App() {
  const [results, setResults] = useState(null)

  function runProgram() {
    const t0 = performance.now()
    Promise.all([getAllData(RESOURCES.characters), getAllData(RESOURCES.locations), getAllData(RESOURCES.episodes)])
      .then(([characters, locations, episodes]) => {

        const charCounterResults = countChars(characters, locations, episodes)
        const t1 = performance.now();
        const charCounterOutput = {
          exercise_name: "Char counter",
          time: t1 - t0,
          in_time: (time => time < 3000)(t1 - t0),
          results: charCounterResults
        }

        const episodeLocationsResults = getCharactersLocationFromEpisodes(characters, locations, episodes)
        setResults(JSON.stringify([charCounterOutput, episodeLocationsResults], null, 2))
      })
  }
  return (
    <div>
      <h1>Rick and Morty Challenge</h1>
      <button onClick={runProgram}>Run</button>
      {results && <pre>{results}</pre>}
    </div>
  );
}

export default App;
