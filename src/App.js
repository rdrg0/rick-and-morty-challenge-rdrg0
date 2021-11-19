import { useState } from 'react';
import getAllData from 'services/getAllData';
import RESOURCES from 'services/resources';
import './App.css';



function countCharsInName(char, resources) {
  return resources.reduce((acc, resource) => (acc + resource.name.toLowerCase().split(char).length - 1), 0)
}


function App() {
  const [results, setResults] = useState()

  function runProgram() {

    const t0 = performance.now() //Starting timestamp

    Promise.all([getAllData(RESOURCES.characters), getAllData(RESOURCES.locations), getAllData(RESOURCES.episodes)])
      .then(([characters, locations, episodes]) => {
        console.log(characters, countCharsInName('c', characters))
        console.log(episodes, countCharsInName('e', episodes))
        console.log(locations, countCharsInName('l', locations))



        //setResults(JSON.stringify(values, null, 2))
        const t1 = performance.now()
        console.log(t1 - t0)
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
