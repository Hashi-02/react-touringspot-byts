import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Mapに使用するプロパティ
 */
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}
/**
 * MapのPropsの初期値
 */
const initialMapProps: MapProps = {
  center: {
    lat: 35.39,
    lng: 139.44,
  },
  zoom: 8,
};
/**
 * APIキー
 */
const API_KEY: string = process.env.REACT_APP_GOOGLEMAP_API_KEY; // TODO: 自分のキーをここに入力

/**
 * サンプルとして地図を表示するコンポーネント
 */
const SampleMap = () => {
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
  const mapProps = initialMapProps;
  const navigate = useNavigate();
  const navigateDetail = (): void => {
    navigate('/maps/detailid');
  };
  const src =
    'https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg';
  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    const contentString =
      '<button id="infoWindow">' +
      '<h1 id="title">' +
      users[0].placeName +
      '</h1>' +
      '<p id="description">aaa</p>' +
      '</button>';

    users.forEach((element) => {
      const contentString =
        '<button id="infoWindow">' +
        '<img src=" ' +
        src +
        '" width="200"></img>' +
        '<h1 id="title">' +
        element.placeName +
        '</h1>' +
        '<p id="description">' +
        element.description +
        '</p>' +
        '</button>';
      const infowindow = new maps.InfoWindow({
        content: contentString,
        maxWidth: 250,
      });

      const marker = new maps.Marker({
        position: {
          lat: parseFloat(element.Latitude),
          lng: parseFloat(element.Longitude),
        },
        map,
      });
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
      infowindow.addListener('domready', () => {
        document.getElementById('infoWindow')!.addEventListener('click', () => {
          navigateDetail();
        });
      });
    });
  };

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={mapProps.center}
        zoom={mapProps.zoom}
        onGoogleApiLoaded={handleApiLoaded}
      />
    </>
  );
};

export default SampleMap;
