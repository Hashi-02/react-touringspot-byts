import React from 'react';
import { MapPage } from './components/pages/MapPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/HomePage';
import { DetailPage } from './components/pages/DetailPage';
import { AddFormPage } from './components/pages/AddFormPage';
import { SelectSpot } from './components/pages/SelectSpot';
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="maps" element={<MapPage />} />
      <Route path={'maps/detail/:uid'} element={<DetailPage />} />
      <Route path="add" element={<AddFormPage />} />
      <Route path="selectspot" element={<SelectSpot />} />
    </Routes>
  </BrowserRouter>
);
export default App;
