import React from 'react';
import { LeftList } from '../molecules/LeftList';
import MapComponent from '../molecules/SampleComponent';
export const MapPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* <div className="h-full"> */}
      {/* <div className="sticky top-0 z-50 bg-white shadow-xl h-1/6">
      <Navbar />
    </div> */}
      <div className="flex h-full">
        <div className="flex-initial w-2/6 overflow-y-scroll">
          <LeftList />
        </div>
        <div className="flex-1">
          <MapComponent />
        </div>
      </div>
    </div>
    // </div>)
  );
};
