import { isEmpty } from '@firebase/util';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState, VFC } from 'react';
type Props = {
  id: string;
};

export const ImageLoader: VFC<Props> = (props) => {
  type TImages = {
    srcUrl: string;
  };
  const [Images, setImages] = useState<TImages[]>([]);
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
                if (ImagesList.length == res.items.length) {
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

          // const ImagesList: TImages[] = [];
          // res.items.map((doc, index) => {
          //   const starsRef = ref(storage, `${doc.fullPath}`);
          //   getDownloadURL(starsRef).then((url) => {
          //     console.log(url);
          //     const image: TImages = {
          //       srcUrl: url,
          //     };
          //     ImagesList.push(image);
          //   });
          // });
          // setImages(ImagesList);
          // console.log(ImagesList);
          // console.log(Images);
          // console.log(isEmpty(Images));
          // // console.log(ImagesList[0].srcUrl);
          // console.log(Images[0].srcUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('error-0');
    }
  }, []);
  console.log(Images);
  return (
    <>
      {isEmpty(Images) && <p>Imagesは空っぽです</p>}
      {!isEmpty(Images) && <p>Imagesに何かある</p>}
      {/* {Images && <p>{Images[0].srcUrl}</p>} */}
      {Images.map((img, index) => {
        console.log(img);
        return (
          <div key={index}>
            {/* <p>{img.srcUrl}</p> */}
            <img src={img.srcUrl} />
          </div>
        );
      })}
    </>
  );
};
