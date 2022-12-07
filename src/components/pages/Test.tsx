import GoogleMapReact from 'google-map-react';
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const initialMapProps: MapProps = {
  center: {
    lat: 35.39,
    lng: 139.44,
  },
  zoom: 8,
};
const API_KEY: string = process.env.REACT_APP_GOOGLEMAP_API_KEY;
export const Test = () => {
  const mapProps = initialMapProps;

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    const sydney = new maps.LatLng(-33.867, 151.195);
    const infowindow = new maps.InfoWindow();
    map = new maps.Map(document.getElementById('map') as HTMLElement, {
      center: sydney,
      zoom: 15,
    });
    const request = {
      query: '大阪　展望台',
      fields: ['name', 'geometry'],
      language: 'ja',
    };
    const service = new maps.places.PlacesService(map);

    service.textSearch(request, (results: any, status: any) => {
      if (status === maps.places.PlacesServiceStatus.OK && results) {
        console.log(results);
        map.setCenter(results[0].geometry!.location!);
      } else {
        console.log('あ');
      }
    });
  };

  return (
    <>
      <p>aa</p>
      <div id="map" style={{ height: '800px', width: '800px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={mapProps.center}
          zoom={mapProps.zoom}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      </div>
    </>
  );
};
