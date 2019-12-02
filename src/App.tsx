import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import Map from './components/Map/Map';
import { loadDots, loadLines, loadBuildings } from './store/map/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDots());
    dispatch(loadLines());
    dispatch(loadBuildings());
  });

  return (
    <div className="app">
      <Map />
    </div>
  );
};

export default App;
