import React from 'react';
import './App.css';
import { ScheduleCard } from './components/panels/ScheduleCard';

function App() {
  return (
    <div className="App">
      <p>Hello from React</p>
      <ScheduleCard>
        <div style={{ width: '100%', backgroundColor: 'whitesmoke' }}>
          <h1>Heading element</h1>
        </div>
        <div style={{ display: 'flex', padding: 'none', alignItems: 'center' }}>
          <div style={{ width: '60%', height: '100%', backgroundColor: 'black' }}>
            <p>Secton 1</p>
          </div>
          <div style={{ width: '40%', height: '100%', backgroundColor: 'green' }}>
            <p>Section 2</p>
          </div>
        </div>
        {/* <label htmlFor="input">Test</label>
        <input type="text" id="input" /> */}
      </ScheduleCard>
    </div>
  );
}

export default App;
