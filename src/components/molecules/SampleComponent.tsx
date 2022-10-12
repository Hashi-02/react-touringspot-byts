import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
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
  zoom: 18,
};

/**
 * APIキー
 */
const API_KEY: string = process.env.REACT_APP_GOOGLEMAP_API_KEY; // TODO: 自分のキーをここに入力

/**
 * サンプルとして地図を表示するコンポーネント
 */
const SampleMap = () => {
  const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: API_KEY }}
      center={mapProps.center}
      zoom={mapProps.zoom}
    />
  );
};

export default SampleMap;
