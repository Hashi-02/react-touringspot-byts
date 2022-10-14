import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
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
 * マーカーの座標初期値
 */
const testMarkerLatLng = {
  lat: 35.39,
  lng: 139.44,
};

const goStation = (): void => {
  console.log('go station');
};

const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
  const contentString =
    '<Link to="/maps/detailid">' +
    '<button id="go-station">' +
    '<div id="content">' +
    '<img src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"></img>' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>' +
    '</button>' +
    '</Link>';
  const infowindow = new maps.InfoWindow({
    content: contentString,
  });

  const marker = new maps.Marker({
    position: testMarkerLatLng,
    map,
    title: 'Uluru (Ayers Rock)',
  });
  marker.addListener('click', () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  infowindow.addListener('domready', () => {
    document.getElementById('go-station')!.addEventListener('click', () => {
      goStation();
    });
  });
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
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        center={mapProps.center}
        zoom={mapProps.zoom}
        onGoogleApiLoaded={handleApiLoaded}
        //  onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
      ></GoogleMapReact>
    </>
  );
};

export default SampleMap;
