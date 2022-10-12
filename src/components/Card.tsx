import React from 'react';

export const Card = () => {
  return (
    <button className="m-3">
      <div className="w-full p-2 rounded-lg shadow-xl lg:flex lg:max-w-lg">
        <img
          className="object-cover w-full lg:w-40 lg:h-40 rounded-lg"
          src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
          alt=""
        />
        <div className="pl-2">
          <h4 className="text-xl font-semibold tracking-tight text-blue-600">
            大京暮敷の里
          </h4>
          <p className="mb-2 leading-normal">
            空が紫色で綺麗な満月が見える異世界のような場所でおすすめです 。
          </p>
        </div>
      </div>
    </button>
  );
};
