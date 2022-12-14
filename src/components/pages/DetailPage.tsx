import { doc, getDoc } from 'firebase/firestore';
import { getStorage, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { BaseButton } from '../atoms/button/BaseButton';
import { ImageLoader } from '../molecules/ImageLoader';
import { ImageUploader } from '../molecules/ImageUploader';

export const DetailPage = () => {
  let { uid } = useParams();
  type TdetailInfo = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
    id: string;
  };
  const [detailInfo, setDetailInfo] = useState<TdetailInfo>();
  useEffect(() => {
    const id = uid;
    if (id) {
      const userDocumentRef = doc(db, 'users', id);
      getDoc(userDocumentRef).then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const Info: TdetailInfo = {
            placeName: documentSnapshot.data().placeName,
            file: documentSnapshot.data().file,
            description: documentSnapshot.data().description,
            Latitude: documentSnapshot.data().Latitude,
            Longitude: documentSnapshot.data().Longitude,
            id: documentSnapshot.id,
          };
          setDetailInfo(Info);
        }
      });
    }
  }, []);
  return (
    <>
      <BaseButton text="マップに戻る" routing="/maps" />
      <div className="container">
        <p>{detailInfo?.placeName}</p>
        {detailInfo && <ImageUploader id={detailInfo.id} />}
        {detailInfo && <ImageLoader id={detailInfo.id} />}
      </div>
    </>
  );
};
