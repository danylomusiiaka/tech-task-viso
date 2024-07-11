import { useState } from 'react';
import MapComponent from './components/Map';
import ChosenMarkerInfo from './components/ChosenMarkerInfo';
import './App.css';

const App: React.FC = () => {
  const [chosenMarkerInfo, setChosenMarkerInfo] = useState<{ label: string; location: { lat: number; lng: number } } | null>(null);

  return (
    <div className="App">
      <MapComponent onMarkerClick={setChosenMarkerInfo} />
      <ChosenMarkerInfo chosenMarkerInfo={chosenMarkerInfo} />
    </div>
  );
}

export default App;
