import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import Button from './components/Button/Button';
import { loadDots } from './store/map/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDots());
  });

  return (
    <div className="app">
      <Button disabled>Click</Button>
    </div>
  );
};

export default App;
