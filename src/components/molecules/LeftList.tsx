import React, { useEffect, useState } from 'react';
import { Card } from '../atoms/card/Card';
import { BaseButton } from '../atoms/button/BaseButton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const LeftList: React.FC = () => {
  const test_numbers = [1, 2, 3, 4, 5];

  type User = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
  };
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((querySnapshot) => {
      const userList: User[] = [];
      let count: number = 0;
      querySnapshot.docs.map((doc, index) => {
        if (count === index) {
          const user: User = {
            placeName: doc.data().placeName,
            file: doc.data().file,
            description: doc.data().description,
            Latitude: doc.data().Latitude,
            Longitude: doc.data().Longitude,
          };
          userList.push(user);
          count += 1;
        }
      });
      setUsers(userList);
    });
  }, []);
  return (
    <>
      <div className="">
        <div className="text-center p-6">
          <BaseButton text="戻る" routing="/" />
        </div>
        <div className="p-3">
          {users.map((user, index) => (
            <div key={index.toString()}>
              <Card
                routing="/maps/detailid"
                imgSrc="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
                title={user.placeName}
                description={user.description}
              />
            </div>
          ))}
        </div>
        {/* <div className="p-3">
          {test_numbers.map(() => (
            <Card
              routing="/maps/detailid"
              imgSrc="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
              title="大京暮敷の里"
              description="空が紫色で綺麗な満月が見える異世界のような場所でおすすめです。"
            />
          ))}
        </div> */}
      </div>
    </>
  );
};
