import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import Map from './components/Map/Map';
import firebase from './firebase';
import { loadDots, loadLines, loadBuildings, loadDotsSuccess, loadLinesSuccess, loadBuildingsSuccess } from './store/map/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.getDots((dots) => dispatch(loadDotsSuccess({ dots })));
    firebase.getLines((lines) => dispatch(loadLinesSuccess({ lines })));
    firebase.getBuildings((buildings) => dispatch(loadBuildingsSuccess({ buildings })));
  });

  return (
    <div className="app">
      <Map />
    </div>
  );
};

export default App;
