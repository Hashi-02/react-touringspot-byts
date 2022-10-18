import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';

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
  const mapProps = initialMapProps;
  const navigate = useNavigate();
  const navigateDetail = (): void => {
    navigate('/maps/detailid');
  };
  const items = [
    {
      lat: 35.39,
      lng: 138.44,
    },
    {
      lat: 37.39,
      lng: 139.44,
    },
    {
      lat: 36.39,
      lng: 140.44,
    },
  ];
  const src =
    'https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg';
  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    const contentString =
      '<button id="infoWindow">' +
      '<img src=" ' +
      src +
      '" width="200"></img>' +
      '<h1 id="title">Uluru</h1>' +
      '<p id="description">aaa</p>' +
      '</button>';
    const infowindow = new maps.InfoWindow({
      content: contentString,
      maxWidth: 250,
    });
    items.forEach((item) => {
      const marker = new maps.Marker({
        position: {
          lat: item.lat,
          lng: item.lng,
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
