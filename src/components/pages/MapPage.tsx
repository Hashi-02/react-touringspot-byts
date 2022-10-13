import React from 'react';
import { LeftList } from '../molecules/LeftList';
import MapComponent from '../molecules/Map';
export const MapPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-full">
        <div className="flex-initial w-2/6 overflow-y-scroll">
          <LeftList />
        </div>
        <div className="flex-1">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};
