import { lazy } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router';
import App from './App';
import { PageNotFound } from './components/PageNotFound';
import { StructureContainer } from './components/Structures/StructureContainer';
import { Structures } from './components/Structures/Structures';

const BoringStructure = lazy(() => import('./components/Structures/BoringStructure'));
const CommandCenter = lazy(() => import('./components/Structures/CommandCenter'));
const FactoryStructure = lazy(() => import('./components/Structures/FactoryStructure'));
const Lab = lazy(() => import('./components/Structures/Lab'));
const Notices = lazy(() => import('./components/Notices'));

export const Routes = () => (
  <RouterRoutes>
    <Route element={<App />}>
      <Route index element={<Structures />} />
      <Route element={<StructureContainer />}>
        <Route path="structures/agridome/:id" element={<BoringStructure />} />
        <Route path="structures/command-center/:id" element={<CommandCenter />} />
        <Route path="structures/factory-structure/:id" element={<FactoryStructure />} />
        <Route path="structures/residence/:id" element={<BoringStructure />} />
        <Route path="structures/smelter-common/:id" element={<BoringStructure />} />
        <Route path="structures/smelter-rare/:id" element={<BoringStructure />} />
        <Route path="structures/tokamak/:id" element={<BoringStructure />} />
        <Route path="structures/lab-standard/:id" element={<Lab />} />
      </Route>
      <Route path="notices" element={<Notices />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </RouterRoutes>
);
