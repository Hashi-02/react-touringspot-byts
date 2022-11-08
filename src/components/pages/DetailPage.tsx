import React from 'react';
import { BaseButton } from '../atoms/button/BaseButton';

export const DetailPage = () => {
  return (
    <>
      <BaseButton text="マップに戻る" routing="/maps" />
      <h1>DetailPage</h1>
    </>
  );
};
