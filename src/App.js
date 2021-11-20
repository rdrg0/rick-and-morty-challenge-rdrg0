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


function App() {
  const [results, setResults] = useState(null)

  function runProgram() {
    const t0 = performance.now()
    Promise.all([getAllData(RESOURCES.characters), getAllData(RESOURCES.locations), getAllData(RESOURCES.episodes)])
      .then(([characters, locations, episodes]) => {

        const charCounterResults = countChars(characters, locations, episodes)
        const t1 = performance.now();
        const charCounterTime = t1 - t0
        const charCounterOutput = {
          exercise_name: "Char counter",
          time: charCounterTime,
          in_time: (time => time < 3000)(charCounterTime),
          results: charCounterResults
        }

        ///onst episodeLocationsResults = location
        setResults(JSON.stringify(charCounterOutput, null, 2))
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
