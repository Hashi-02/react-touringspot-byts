import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState, VFC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';

// import required modules
import { Navigation } from 'swiper';

type Props = {
  id: string;
};

export const ImageLoader: VFC<Props> = (props) => {
  //TImagesの名前を変える
  type TImages = {
    srcUrl: string;
  };
  const [Images, setImages] = useState<TImages[]>([]);
  //使いまわせそう
  useEffect(() => {
    //storageからdocumentIDで写真を取得
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
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {Images.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={img.srcUrl} alt="images" className="rounded-lg h-96" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
