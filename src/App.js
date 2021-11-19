import { useState } from 'react';
import './App.css';

function App() {
  const [results, setResults] = useState(null)

  function runProgram() {
    setResults(JSON.stringify([{ a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }], null, 2))
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
