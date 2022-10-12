import React from 'react';
import { Card } from './Card';

export const LeftList = () => {
  return (
    <>
      <div className="">
        <div className="text-center p-6">
          <h1>検索結果をcardで表示するところ</h1>
        </div>
        <div className="p-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};
