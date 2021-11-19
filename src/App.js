import { useState } from 'react';
import getAllData from 'services/getAllData';
import RESOURCES from 'services/resources';
import './App.css';







function App() {
  const [results, setResults] = useState(null)

  function runProgram() {

    const t0 = performance.now() //Starting timestamp
    // getAllData(RESOURCES.characters)
    //   .then(res => {
    //     console.log(res)
    //     const t1 = performance.now()
    //     console.log(t1 - t0)
    //     setResults(JSON.stringify(res, null, 2))

    //   })
    Promise.all([getAllData(RESOURCES.characters), getAllData(RESOURCES.locations), getAllData(RESOURCES.episodes)])
      .then(([characters, locations, episodes]) => {
        console.log(characters)
        console.log(episodes)
        console.log(locations)
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
