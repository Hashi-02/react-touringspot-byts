import React from 'react';
import { Card } from '../atoms/card/Card';
import { BaseButton } from '../atoms/button/BaseButton';

export const LeftList: React.FC = () => {
  const test_numbers = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="">
        <div className="text-center p-6">
          <BaseButton text="戻る" routing="/" />
        </div>
        <div className="p-3">
          {test_numbers.map(() => (
            <Card
              routing="/maps/detailid"
              imgSrc="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
              title="大京暮敷の里"
              description="空が紫色で綺麗な満月が見える異世界のような場所でおすすめです。"
            />
          ))}
        </div>
      </div>
    </>
  );
};
