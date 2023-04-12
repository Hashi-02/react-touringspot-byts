import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { BaseButton } from '../atoms/button/BaseButton';
import { ImageLoader } from '../molecules/ImageLoader';
import { ImageUploader } from '../molecules/ImageUploader';

export const DetailPage = () => {
  let { uid } = useParams();
  type TypeDetailInfo = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
    id: string;
  };
  type TypePosition = {
    lat: number;
    lng: number;
  };
  const [detailInfo, setDetailInfo] = useState<TypeDetailInfo>();
  const [currentPosition, setCurrentPosition] = useState<TypePosition>();
  const success = (data: {
    coords: { latitude: number; longitude: number };
  }) => {
    const currentPosition = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    console.log(currentPosition);
    setCurrentPosition(currentPosition);
  };
  const error = () => {
    console.log('error');
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    const service = new google.maps.DistanceMatrixService();
    const origin1 = { lat: 55.93, lng: -3.118 };
    // const origin2 = 'Greenwich, England';
    const destinationA = 'Stockholm, Sweden';
    const destinationB = { lat: 50.087, lng: 14.421 };
    const request = {
      origins: [origin1],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    service.getDistanceMatrix(request).then((response) => {
      console.log(response.rows);
    });

    const id = uid;
    if (id) {
      //usersの名前を変える
      const userDocumentRef = doc(db, 'spots', id);
      getDoc(userDocumentRef).then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const Info: TypeDetailInfo = {
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
          <p>
            this Place is lat={detailInfo?.Latitude}
            lng={detailInfo?.Longitude}
          </p>
          <p>
            now lat={currentPosition?.lat}
            lng={currentPosition?.lng}
          </p>
          {detailInfo && <ImageUploader id={detailInfo.id} />}
        </div>
      </div>
    </>
  );
};
