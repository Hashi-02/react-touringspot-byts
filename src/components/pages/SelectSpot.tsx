import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseButton } from '../atoms/button/BaseButton';
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

export const SelectSpot = () => {
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
          }
        });
      }
    }
  };

  return (
    <>
      <BaseButton text="マップを見る" routing="/maps" />
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            地名
          </label>
        </div>
        <div className="md:w-1/3">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
        <div className="m-1">
          <button
            type="button"
            onClick={search}
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
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
      <div className="flex justify-center">
        {spotResults && (
          <div className="grid grid-cols-3 gap-3 my-5">
            {spotResults.map((spots, index) => (
              <div key={index}>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {spots.name}
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 ">
                    {spots.formatted_address}
                    {/* {spots.Longitude}
                  {spots.Latitude} */}
                  </p>

                  <div>
                    <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                      <Link
                        to="/add"
                        state={{
                          name: spots.name,
                          lat: spots.Latitude,
                          lng: spots.Longitude,
                        }}
                      >
                        追加する
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
