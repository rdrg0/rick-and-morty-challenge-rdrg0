import React from 'react';
import { useState } from 'react';
import getAllData from 'services/getAllData';
import RESOURCES from 'services/resources';
import { charCounter, msFormatter, inTime, getCharactersLocationFromEpisodes } from 'utils/utils';


function App() {
  const [results, setResults] = useState(null)

  function runProgram() {
    const t0 = performance.now()
    Promise.all([getAllData(RESOURCES.characters), getAllData(RESOURCES.locations), getAllData(RESOURCES.episodes)])
      .then(([characters, locations, episodes]) => {
        const charCounterResults = charCounter(characters, locations, episodes)
        const t1 = performance.now();
        const charCounterOutput = {
          exercise_name: "Char counter",
          time: msFormatter(t1 - t0),
          in_time: inTime(t1 - t0),
          results: charCounterResults
        }

        const episodeLocationsResults = getCharactersLocationFromEpisodes(characters, episodes)
        const t2 = performance.now();
        const episodeLocationsOutput = {
          exercise_name: "Episode locations",
          time: msFormatter(t2 - t1),
          in_time: inTime(t2 - t1),
          results: episodeLocationsResults
        }
        setResults(JSON.stringify([charCounterOutput, episodeLocationsOutput], null, 4))
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
