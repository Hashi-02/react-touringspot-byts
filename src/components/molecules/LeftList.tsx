import React, { useEffect, useState } from 'react';
import { Card } from './card/Card';
import { BaseButton } from '../atoms/button/BaseButton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const LeftList: React.FC = () => {
  type User = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
    id: string;
  };
  const [spots, setSpots] = useState<User[]>([]);
  useEffect(() => {
    const spotsCollectionRef = collection(db, 'spots');
    getDocs(spotsCollectionRef).then((querySnapshot) => {
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
            id: doc.id,
          };
          userList.push(user);
          count += 1;
        }
      });
      setSpots(userList);
    });
  }, []);
  return (
    <>
      <div className="text-center p-6">
        <BaseButton text="戻る" routing="/" />
      </div>
      {spots.map((user, index) => (
        <div key={index.toString()}>
          <Card
            routing={'/maps/detail/' + user.id}
            imgSrc="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
            title={user.placeName}
            description={user.description}
            id={user.id}
          />
        </div>
      ))}
    </>
  );
};
