import { ref, uploadBytesResumable } from 'firebase/storage';
import { Formik } from 'formik';
import { FC, useState, VFC } from 'react';
import * as yup from 'yup';
import { storage } from '../../firebase';
import { Thumb } from './Thumb';
import { useDropzone } from 'react-dropzone';

type Props = {
  id: string;
};

export const ImageUploader: VFC<Props> = (id) => {
  const metadata = {
    contentType: 'image/jpeg',
  };
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(100);
  return (
    <Formik
      initialValues={{ file: null }}
      onSubmit={(values: any) => {
        alert(
          JSON.stringify({
            fileName: values.file.name,
            type: values.file.type,
            size: `${values.file.size} bytes`,
          })
        );
        console.log('アップロード処理');
        // const storageRef = storage.ref('images/test/'); //どのフォルダの配下に入れるかを設定
        const storageRef = ref(storage, `${id.id}/` + values.file.name);
        // const imagesRef = storageRef.child(image.name); //ファイル名
        const uploadTask = uploadBytesResumable(
          storageRef,
          values.files,
          metadata
        );

        console.log('ファイルをアップする行為');
        // const upLoadTask = imagesRef.put(image);
        console.log('タスク実行前');

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            console.log('snapshot', snapshot);
            const percent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percent + '% done');
            setProgress(percent);
          },
          (error) => {
            console.log('err', error);
            setError('ファイルアップに失敗しました。' + error);
            setProgress(100); //実行中のバーを消す
          }
        );
      }}
      validationSchema={yup.object().shape({
        file: yup.mixed().required(),
      })}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <div className="container">
            <Formik
              initialValues={{ files: null }}
              onSubmit={(values: any) => {
                alert(
                  JSON.stringify({
                    fileName: values.files[0].name,
                    type: values.files[0].type,
                    size: `${values.files[0].size} bytes`,
                  })
                );
                console.log(values);
                console.log('アップロード処理');

                const storageRef = ref(
                  storage,
                  // @ts-ignore
                  `${id.id}/` + values.files[0].name
                );
                const uploadTask = uploadBytesResumable(
                  storageRef,
                  // @ts-ignore
                  values.files[0],
                  metadata
                );
                console.log(values.files);
                console.log('ファイルをアップする行為');
                console.log('タスク実行前');
                uploadTask.on(
                  'state_changed',
                  (snapshot) => {
                    console.log('snapshot', snapshot);
                    const percent =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(snapshot.bytesTransferred, snapshot.totalBytes);
                    console.log(percent + '% done');
                    setProgress(percent);
                  },
                  (error) => {
                    console.log('err', error);
                    setError('ファイルアップに失敗しました。' + error);
                    setProgress(100); //実行中のバーを消す
                  }
                );
              }}
              validationSchema={yup.object().shape({
                files: yup.mixed().required(),
              })}
            >
              {({ values, handleSubmit, setFieldValue }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                      <div className="w-5/6">
                        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                          <span className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <UploadComponent setFieldValue={setFieldValue} />
                            {/* @ts-ignore */}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-center place-items-center flex-col">
                      <div>
                        <button
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                      {error && <div>{error}</div>}
                      <div>
                        {progress !== 100 && (
                          <LinearProgressWithLabel value={progress} />
                        )}
                      </div>
                      {/* @ts-ignore */}
                      {values.files && <Thumb file={values.files[0]} />}
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        );
      }}
    </Formik>
  );
};

function LinearProgressWithLabel(props: any) {
  return (
    <>
      <div className="flex justify-center mb-1 ">
        <span className="text-base font-medium text-gray-700 "></span>
        <span className="text-sm font-medium text-gray-700 ">
          {`${Math.round(props.value)}%`}
        </span>
      </div>
      <div className="w-60 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-gray-600 h-auto w-60 rounded-full"></div>
      </div>
    </>
  );
}

const UploadComponent = (props: { setFieldValue: any }) => {
  const { setFieldValue } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue('files', acceptedFiles);
    },
  });
  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <span className="font-medium text-gray-600">
            Drop files to Attach, or
            <span className="text-blue-600 underline">browse</span>
          </span>
        )}
      </div>
    </div>
  );
};
