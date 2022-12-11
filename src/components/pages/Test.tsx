import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
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
  zoom: 16,
};
type Spots = {
  name: string;
  formatted_address: string;
  Latitude: string;
  Longitude: string;
  placesId: string;
};

const API_KEY: string = process.env.REACT_APP_GOOGLEMAP_API_KEY;

export const Test = () => {
  const [text, setText] = useState<String>('');
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [spotResults, setSpotResults] = useState<Spots[]>([]);
  const mapProps = initialMapProps;
  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMap(map);
    setMaps(maps);
  };
  const search = () => {
    const request = {
      query: text,
      fields: ['name', 'geometry'],
      language: 'ja',
    };
    if (maps) {
      if (map) {
        // @ts-ignore
        const service = new maps.places.PlacesService(map);
        service.textSearch(request, (results: any, status: any) => {
          // @ts-ignore
          if (status === maps.places.PlacesServiceStatus.OK && results) {
            console.log(results);
            const resultList: Spots[] = [];
            let count: number = 0;
            results.map((element: any, index: any) => {
              if (count === index) {
                const placeInfo: Spots = {
                  name: element.name,
                  formatted_address: element.formatted_address,
                  Latitude: element.geometry.location.lat(),
                  Longitude: element.geometry.location.lng(),
                  placesId: element.place_id,
                };
                resultList.push(placeInfo);
                count += 1;
              }
            });
            setSpotResults(resultList);
          } else {
            console.log('あ');
          }
        });
      }
    }
  };

  return (
    <>
      {/* テキストボックス有りver */}
      <div>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button type="button" onClick={search}>
          Search
        </button>
      </div>

      <div id="map" style={{ height: '0px', width: '0px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={mapProps.center}
          zoom={mapProps.zoom}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      </div>

      {spotResults && (
        <div>
          {spotResults.map((spots, index) => (
            <div key={index}>
              <p>{spots.name}</p>
              <p>{spots.formatted_address}</p>
              <p>{spots.Latitude}</p>
              <p>{spots.Longitude}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
