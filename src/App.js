import { useState } from 'react';
import getAllData from 'services/getAllData';
import RESOURCES from 'services/resources';
import './App.css';



function countCharsInName(char, resources) {
  return resources.reduce((acc, resource) => (acc + resource.name.toLowerCase().split(char).length - 1), 0)
}

function charCounter(characters, locations, episodes) {
  return [
    {
      char: "l",
      count: countCharsInName('l', locations),
      resource: "location"
    },
    {
      char: "e",
      count: countCharsInName('e', episodes),
      resource: "episode"
    },
    {
      char: "c",
      count: countCharsInName('c', characters),
      resource: "character"
    }
  ]

}
function getLocations(episodeCharacters, characters) {
  const charactersLocations = episodeCharacters.map(episodeCharacter => {
    const character = characters.find(character => character.url === episodeCharacter)
    console.log(character)
    return character.origin.name
  })
  // @ts-ignore
  return [...new Set(charactersLocations)]
}
function getCharactersLocationFromEpisodes(characters, episodes) {
  return episodes.map(episode => {
    const locations = getLocations(episode.characters, characters)
    return {
      name: episode.name,
      episode: episode.episode,
      count: locations.length,
      locations: locations
    }
  })
}
function msFormatter(time) {
  const ms = time % 1000;
  const secs = (time - ms) / 1000;
  return (`${secs}s${ms}ms`)
}
function inTime(time) {
  return time < 3000
}


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
