import React from 'react';
import { MapPage } from './components/pages/MapPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/HomePage';
import { DetailPage } from './components/pages/DetailPage';
import { AddFormPage } from './components/pages/AddFormPage';
import { Test } from './components/pages/Test';
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="maps" element={<MapPage />} />
      <Route path={'maps/detail/:id'} element={<DetailPage />} />
      <Route path="add" element={<AddFormPage />} />
      <Route path="test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
export default App;
