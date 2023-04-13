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
  type TypeDistanceMatrix = {
    distance: string;
    duration: string;
  };
  const [detailInfo, setDetailInfo] = useState<TypeDetailInfo>();
  const [currentPosition, setCurrentPosition] = useState<TypePosition>();
  const [distanceMatrix, setDistanceMatrix] = useState<TypeDistanceMatrix>();
  const success = (data: {
    coords: { latitude: number; longitude: number };
  }) => {
    const currentPosition = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    console.log(currentPosition);
    setCurrentPosition(currentPosition);
    getDetailInfo(currentPosition);
  };
  const error = () => {
    console.log('error');
  };
  const getDistanceMatrix = (props: {
    Info?: {
      placeName: string;
      file: string;
      description: string;
      Latitude: string;
      Longitude: string;
      id: string;
    };
    originLatLng?: { lat: number; lng: number };
    props?: any;
    lng?: any;
  }) => {
    const service = new google.maps.DistanceMatrixService();
    const origin1 = {
      lat: props.originLatLng?.lat,
      lng: props.originLatLng?.lng,
    };
    // const origin2 = 'Greenwich, England';
    const destinationA = props.Info?.placeName;
    const destinationB = {
      lat: props.Info?.Latitude,
      lng: props.Info?.Longitude,
    };
    const request = {
      origins: [origin1],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    // @ts-ignore
    service.getDistanceMatrix(request).then((response) => {
      console.log(response.rows[0].elements[0]);
      const distanceMatrixInfo: TypeDistanceMatrix = {
        distance: response.rows[0].elements[0].distance.text,
        duration: response.rows[0].elements[0].duration.text,
      };
      setDistanceMatrix(distanceMatrixInfo);
    });
  };
  const getDetailInfo = (props: { lat: number; lng: number }) => {
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
          console.log(Info);
          const originLatLng = props;
          const distanceInfo = {
            Info,
            originLatLng,
          };
          if (distanceInfo) {
            getDistanceMatrix(distanceInfo);
          }

          console.log('ブー');
          console.log(currentPosition);
        }
      });
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
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
            現在地からここまで
            {distanceMatrix?.duration}
            かかるよ ({distanceMatrix?.distance})
          </p>
          {detailInfo && <ImageUploader id={detailInfo.id} />}
        </div>
      </div>
    </>
  );
};
