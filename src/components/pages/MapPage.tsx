import React from 'react';
import { BaseButton } from '../atoms/button/BaseButton';
import { LeftList } from '../molecules/LeftList';
import MapComponent from '../molecules/Map';
export const MapPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-full">
        <div className="flex-initial w-2/6 overflow-y-scroll">
          <LeftList />
        </div>
        <div className="flex-1 relative">
          <MapComponent />
          <div className="absolute top-3 right-20">
            <BaseButton text="スポットを追加する" routing="/selectspot" />
          </div>
        </div>
      </div>
    </div>
  );
};
