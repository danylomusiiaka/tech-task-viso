import React, { useState } from 'react';
import MapComponent from './Map';
import ChosenMarkerInfo from './ChosenMarkerInfo';
import './App.css';

function App() {
  const [chosenMarkerInfo, setChosenMarkerInfo] = useState(null);

  return (
    <div className="App">
      <MapComponent onMarkerClick={setChosenMarkerInfo} />
      <ChosenMarkerInfo chosenMarkerInfo={chosenMarkerInfo} />
    </div>
  );
}

export default App;
