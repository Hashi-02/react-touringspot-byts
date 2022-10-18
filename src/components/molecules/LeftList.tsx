import React from 'react';
import { Card } from '../atoms/Card';
import { Link } from 'react-router-dom';
import { BaseButton } from '../atoms/button/BaseButton';

export const LeftList: React.FC = () => {
  return (
    <>
      <div className="">
        <div className="text-center p-6">
          {/* <Link to="/">戻る</Link> */}
          <BaseButton text="戻る" routing="/" />
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
