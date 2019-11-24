import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import Map from './components/Map/Map';
import { loadDots, loadLines } from './store/map/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDots());
    dispatch(loadLines());
  });

  return (
    <div className="app">
      <Map />
    </div>
  );
};

export default App;
