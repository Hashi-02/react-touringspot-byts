import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { BaseButton } from '../atoms/button/BaseButton';
import { ImageLoader } from '../molecules/ImageLoader';
import { ImageUploader } from '../molecules/ImageUploader';

export const DetailPage = () => {
  let { uid } = useParams();
  type TypeDetailInfo = {
    placeName: string;
    file: string;
    description: string;
    Latitude: string;
    Longitude: string;
    id: string;
  };
  const [detailInfo, setDetailInfo] = useState<TypeDetailInfo>();
  useEffect(() => {
    const id = uid;
    if (id) {
      //usersの名前を変える
      const userDocumentRef = doc(db, 'spots', id);
      getDoc(userDocumentRef).then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const Info: TypeDetailInfo = {
            placeName: documentSnapshot.data().placeName,
            file: documentSnapshot.data().file,
            description: documentSnapshot.data().description,
            Latitude: documentSnapshot.data().Latitude,
            Longitude: documentSnapshot.data().Longitude,
            id: documentSnapshot.id,
          };
          setDetailInfo(Info);
        }
      });
    }
  }, []);
  return (
    <>
      <div className="mx-10 my-10 ">
        <BaseButton text="マップに戻る" routing="/maps" />
        <div className="flex flex-col items-center">
          <div className="h-3/4">
            {detailInfo && <ImageLoader id={detailInfo.id} />}
          </div>
          <p className="text-7xl font-bold">{detailInfo?.placeName}</p>
          <p>{detailInfo?.description}</p>
          {detailInfo && <ImageUploader id={detailInfo.id} />}
        </div>
      </div>
    </>
  );
};

// initialValues={{ files: null }}
// onSubmit={(values: any) => {
//   alert('aaaaa');
//   // alert(
//   //   JSON.stringify({
//   //     fileName: values.file.name,
//   //     type: values.file.type,
//   //     size: `${values.file.size} bytes`,
//   //   })
//   // );
//   console.log('アップロード処理');
//   // const storageRef = storage.ref('images/test/'); //どのフォルダの配下に入れるかを設定
//   const storageRef = ref(storage, `${id.id}/` + values.file.name);
//   // const imagesRef = storageRef.child(image.name); //ファイル名

//   const uploadTask = uploadBytesResumable(
//     storageRef,
//     values.file,
//     metadata
//   );

//   console.log('ファイルをアップする行為');
//   // const upLoadTask = imagesRef.put(image);
//   console.log('タスク実行前');

//   uploadTask.on(
//     'state_changed',
//     (snapshot) => {
//       console.log('snapshot', snapshot);
//       const percent =
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log(percent + '% done');
//       setProgress(percent);
//     },
//     (error) => {
//       console.log('err', error);
//       setError('ファイルアップに失敗しました。' + error);
//       setProgress(100); //実行中のバーを消す
//     }
//   );
// }}
// validationSchema={yup.object().shape({
//   file: yup.mixed().required(),
// })}
