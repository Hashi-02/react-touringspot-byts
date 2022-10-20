import React from 'react';
import { BaseButton } from '../atoms/button/BaseButton';
export const Home = () => {
  return (
    <>
      <div>
        <BaseButton text="マップを見る" routing="maps" />
        <h1>Home</h1>
      </div>
    </>
  );
};
