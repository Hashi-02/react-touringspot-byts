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
const SampleMap = () => {
  type User = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
    id: string;
  };
  type TImages = {
    srcUrl: string;
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
            id: doc.id,
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
  const navigateDetail = (id: string): void => {
    navigate('/maps/detail/' + id);
  };

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    let currentInfoWindow: { close: () => void } | null = null;

    users.forEach((element) => {
      const storage = getStorage();
      const ImagesList: TImages[] = [];
      if (element.id) {
        const listRef = ref(storage, `${element.id}`);
        listAll(listRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              const starsRef = ref(storage, `${itemRef.fullPath}`);
              getDownloadURL(starsRef)
                .then((url) => {
                  const image: TImages = {
                    srcUrl: url,
                  };
                  ImagesList.push(image);
                  if (ImagesList.length === res.items.length) {
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

  return (
    <>
      {!isEmpty(users) && (
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

export default SampleMap;
