import { Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { Thumb } from './Thumb';

export const ImageUploader: FC = () => {
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
      }}
      validationSchema={yup.object().shape({
        file: yup.mixed().required(),
      })}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="max-w-xl">
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
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or
                      <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                  <input
                    type="file"
                    name="file_upload"
                    className="hidden"
                    onChange={(event) => {
                      setFieldValue(
                        'file',
                        event.currentTarget.files !== null
                          ? event.currentTarget.files[0]
                          : null
                      );
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
            <Thumb file={values.file} />
          </form>
        );
      }}
    </Formik>
  );
};
