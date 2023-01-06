import { isEmpty } from '@firebase/util';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState, VFC } from 'react';
type Props = {
  id: string;
};

export const ImageLoaderCard: VFC<Props> = (props) => {
  //TImagesの名前を変える
  type TImages = {
    srcUrl: string;
  };
  const [Images, setImages] = useState<TImages[]>([]);
  //使いまわせそう
  useEffect(() => {
    const storage = getStorage();
    if (props.id) {
      const listRef = ref(storage, `${props.id}`);
      listAll(listRef)
        .then((res) => {
          const ImagesList: TImages[] = [];
          res.items.forEach((itemRef) => {
            const starsRef = ref(storage, `${itemRef.fullPath}`);
            getDownloadURL(starsRef)
              .then((url) => {
                const image: TImages = {
                  srcUrl: url,
                };
                ImagesList.push(image);
                if (ImagesList.length === res.items.length) {
                  setImages(ImagesList);
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
  }, []);
  return (
    <>
      {!isEmpty(Images) ? (
        <img
          className="object-cover w-full lg:w-40 lg:h-40 rounded-lg mr-3"
          /* @ts-ignore */
          src={Images[0].srcUrl}
          alt=""
        />
      ) : (
        <img
          className="object-cover w-full lg:w-40 lg:h-40 rounded-lg mr-3"
          src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
          alt=""
        />
      )}
    </>
  );
};
