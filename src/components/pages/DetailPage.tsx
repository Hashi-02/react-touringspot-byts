import React from 'react';
import { Link } from 'react-router-dom';
import { BaseButton } from '../atoms/button/BaseButton';

export const DetailPage = () => {
  return (
    <>
      <BaseButton text="マップに戻る" routing="/maps" />
      <h1>DetailPage</h1>
    </>
  );
};
