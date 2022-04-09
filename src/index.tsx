import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
