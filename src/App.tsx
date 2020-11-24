import React from 'react';
import './App.css';
import { ScheduleCard } from './components/panels/ScheduleCard';

// antd styling for components
import 'antd/dist/antd.css';


function App() {
  return (
    <div style={{ paddingTop: '10rem' }}>
      <ScheduleCard />
    </div >
  );
}

export default App;
