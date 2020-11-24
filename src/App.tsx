import React from 'react';
import './App.css';
import { ScheduleCard } from './components/panels/ScheduleCard';

// antd styling for components
import 'antd/dist/antd.css';


function App() {
  return (
    <div>
      <p>Hello from React</p>
      <ScheduleCard />
    </div >
  );
}

export default App;
