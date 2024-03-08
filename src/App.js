import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState('desktop');
  const [throttle, setThrottle] = useState(0);
  const [location, setLocation] = useState('');
  const [score, setScore] = useState(null);

  const runPageSpeed = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run-pagespeed', {
        url,
        strategy,
        throttle,
        location,
      });

      setScore(response.data.score);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>PageSpeed App</h1>
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <label>
        Strategy:
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
        </select>
      </label>
      <label>
        Throttle Speed:
        <input type="number" value={throttle} onChange={(e) => setThrottle(e.target.value)} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <button onClick={runPageSpeed}>Run Test</button>
      {score !== null && <p>PageSpeed Score: {score}</p>}
    </div>
  );
}

export default App;
