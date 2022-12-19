import { doc, getDoc } from 'firebase/firestore';
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
      <div className="mx-10 my-10 ">
        <BaseButton text="マップに戻る" routing="/maps" />
        <div className="flex flex-col items-center">
          <div className="h-3/4">
            {detailInfo && <ImageLoader id={detailInfo.id} />}
          </div>
          <p className="text-7xl font-bold">{detailInfo?.placeName}</p>
          <p>{detailInfo?.description}</p>
          {detailInfo && <ImageUploader id={detailInfo.id} />}
        </div>
      </div>
    </>
  );
};
