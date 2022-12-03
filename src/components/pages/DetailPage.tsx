import React from 'react';
import { BaseButton } from '../atoms/button/BaseButton';
import { ImageUploader } from '../molecules/ImageUploader';

export const DetailPage = () => {
  return (
    <>
      <BaseButton text="マップに戻る" routing="/maps" />
      <div className="container">
        <ImageUploader />
      </div>
    </>
  );
};
