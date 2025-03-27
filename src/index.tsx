import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import { PageNotFound } from './components/PageNotFound';
import { StructureContainer } from './components/Structures/StructureContainer';
import { Structures } from './components/Structures/Structures';
import './fonts/TechnoRaceItalic.otf';
import './index.css';
import { store } from './store';

const Agridome = lazy(() => import('./components/Structures/Agridome'));
const CommandCenter = lazy(() => import('./components/Structures/CommandCenter'));
const FactoryStructure = lazy(() => import('./components/Structures/FactoryStructure'));
const Lab = lazy(() => import('./components/Structures/Lab'));
const Notices = lazy(() => import('./components/Notices'));
const PowerGenerator = lazy(() => import('./components/Structures/PowerStructure'));
const Residence = lazy(() => import('./components/Structures/Residence'));
const Smelter = lazy(() => import('./components/Structures/Smelter'));

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL ?? '/'}>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Structures />} />
            <Route element={<StructureContainer />}>
              <Route path="structures/agridome/:id" element={<Agridome />} />
              <Route path="structures/command-center/:id" element={<CommandCenter />} />
              <Route path="structures/factory-structure/:id" element={<FactoryStructure />} />
              <Route path="structures/residence/:id" element={<Residence />} />
              <Route path="structures/smelter-common/:id" element={<Smelter />} />
              <Route path="structures/smelter-rare/:id" element={<Smelter />} />
              <Route path="structures/tokamak/:id" element={<PowerGenerator />} />
              <Route path="structures/lab-standard/:id" element={<Lab />} />
            </Route>
            <Route path="notices" element={<Notices />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
