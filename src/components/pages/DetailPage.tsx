import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { BaseButton } from '../atoms/button/BaseButton';
import { ImageUploader } from '../molecules/ImageUploader';

export const DetailPage = () => {
  type TdetailInfo = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
  };
  const [detailInfo, setDetailInfo] = useState<TdetailInfo>();
  useEffect(() => {
    const userDocumentRef = doc(db, 'users', '0Vdlc5IiaAsvXgK3mCZm');
    getDoc(userDocumentRef).then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const Info: TdetailInfo = {
          placeName: documentSnapshot.data().placeName,
          file: documentSnapshot.data().file,
          description: documentSnapshot.data().description,
          Latitude: documentSnapshot.data().Latitude,
          Longitude: documentSnapshot.data().Longitude,
        };
        setDetailInfo(Info);
      }
    });
  }, []);
  return (
    <>
      <BaseButton text="マップに戻る" routing="/maps" />
      <div className="container">
        <p>{detailInfo?.placeName}</p>
        <ImageUploader />
      </div>
    </>
  );
};
