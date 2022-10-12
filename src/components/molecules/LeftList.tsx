import React from 'react';
import { Card } from '../atoms/Card';
import { Link } from 'react-router-dom';

export const LeftList = () => {
  return (
    <>
      <div className="">
        <div className="text-center p-6">
          <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <Link to="/">戻る</Link>
          </button>
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
