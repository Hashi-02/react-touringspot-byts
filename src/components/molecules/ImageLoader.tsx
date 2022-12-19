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
      {/* {Images && <p>{Images[0].srcUrl}</p>} */}
      {Images.map((img, index) => {
        return (
          <div key={index}>
            {/* <p>{img.srcUrl}</p> */}
            <img src={img.srcUrl} alt="images" className="rounded-lg h-96" />
          </div>
        );
      })}
    </>
  );
};
