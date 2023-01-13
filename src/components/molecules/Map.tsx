import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { isEmpty } from '@firebase/util';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

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
const API_KEY: string = process.env.REACT_APP_GOOGLEMAP_API_KEY;

/**
 * サンプルとして地図を表示するコンポーネント
 */
const MainMap = () => {
  type User = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
    id: string;
  };
  type TypeImages = {
    srcUrl: string;
  };
  const [spots, setSpots] = useState<User[]>([]);
  const [Images, setImages] = useState<TypeImages[]>([]);
  useEffect(() => {
    const spotsCollectionRef = collection(db, 'spots');
    getDocs(spotsCollectionRef).then((querySnapshot) => {
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
            id: doc.id,
          };
          userList.push(user);
          count += 1;
        }
      });
      setSpots(userList);
    });
  }, []);
  const mapProps = initialMapProps;
  const navigate = useNavigate();
  const navigateDetail = (id: string): void => {
    navigate('/maps/detail/' + id);
  };

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    let currentInfoWindow: { close: () => void } | null = null;

    spots.forEach((element) => {
      const storage = getStorage();
      const ImagesList: TypeImages[] = [];
      if (element.id) {
        const listRef = ref(storage, `${element.id}`);
        console.log(spots.length);
        console.log(listRef);
        listAll(listRef)
          .then((res) => {
            console.log(res.items.length);
            console.log(res);
            if (res.items.length === 0) {
              const image: TypeImages = {
                srcUrl:
                  'https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg',
              };
              ImagesList.push(image);
              setImages(ImagesList);
              const contentString =
                '<button id="infoWindow">' +
                '<img src=" ' +
                ImagesList[0].srcUrl +
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
                if (currentInfoWindow) {
                  currentInfoWindow.close();
                }
                currentInfoWindow = infowindow;
              });
              infowindow.addListener('domready', () => {
                document
                  .getElementById('infoWindow')!
                  .addEventListener('click', () => {
                    navigateDetail(element.id);
                  });
              });
            }
            res.items.forEach((itemRef) => {
              console.log('baba');
              const starsRef = ref(storage, `${itemRef.fullPath}`);
              getDownloadURL(starsRef)
                .then((url) => {
                  const image: TypeImages = {
                    srcUrl: url,
                  };
                  ImagesList.push(image);
                  console.log('dd');
                  console.log(url);
                  console.log(ImagesList.length);
                  console.log(res.items.length);
                  console.log('aaaaaaaaa');
                  // if (ImagesList.length === res.items.length) {
                  setImages(ImagesList);
                  // }
                  const contentString =
                    '<button id="infoWindow">' +
                    '<img src=" ' +
                    ImagesList[0].srcUrl +
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
                    if (currentInfoWindow) {
                      currentInfoWindow.close();
                    }
                    currentInfoWindow = infowindow;
                  });
                  infowindow.addListener('domready', () => {
                    document
                      .getElementById('infoWindow')!
                      .addEventListener('click', () => {
                        navigateDetail(element.id);
                      });
                  });
                  // }
                })
                .catch((error) => {
                  switch (error.code) {
                    case 'storage/object-not-found':
                      console.log("File doesn't exist");
                      break;
                    case 'storage/unauthorized':
                      console.log(
                        "User doesn't have permission to access the object"
                      );
                      break;
                    case 'storage/canceled':
                      console.log('User canceled the upload');
                      break;
                    case 'storage/unknown':
                      console.log(
                        ' Unknown error occurred, inspect the server response'
                      );
                      break;
                  }
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('error-0');
      }
    });
  };
  console.log(Images);
  return (
    <>
      {!isEmpty(spots) && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          center={mapProps.center}
          zoom={mapProps.zoom}
          onGoogleApiLoaded={handleApiLoaded}
          yesIWantToUseGoogleMapApiInternals={true}
        />
      )}
    </>
  );
};

export default MainMap;
