import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import './fonts/TechnoRaceItalic.otf';
import './index.css';
import { Routes } from './Routes';
import { store } from './store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL ?? '/'}>
        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
