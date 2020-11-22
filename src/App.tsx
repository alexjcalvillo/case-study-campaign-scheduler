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

const headingEl = {
  padding: '0.5rem',
  backgroundColor: '#D9D9D9',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
}

export default App;
