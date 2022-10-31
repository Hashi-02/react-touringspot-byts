import { BaseButton } from '../atoms/button/BaseButton';
import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

// Shape of form values
interface FormValues {
  placeName: string;
  file: string;
  description: string;
  Latitude: string;
  Longitude: string;
}

interface OtherProps {
  message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form className="w-full max-w-sm">
      <h1>{message}</h1>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            地名
          </label>
        </div>
        <div className="md:w-2/3">
          <Field
            type="text"
            name="placeName"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            緯度
          </label>
        </div>
        <div className="md:w-2/3">
          <Field
            type="text"
            name="Latitude"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            経度
          </label>
        </div>
        <div className="md:w-2/3">
          <Field
            type="text"
            name="Longitude"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            ファイル
          </label>
        </div>
        <div className="md:w-2/3">
          <Field
            type="text"
            name="file"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            説明
          </label>
        </div>
        <div className="md:w-2/3">
          <Field
            type="text"
            name="description"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      placeName: '',
      file: '',
      description: '',
      Latitude: '',
      Longitude: '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.placeName) {
      errors.placeName = 'Required';
    } else if (!values.placeName) {
      errors.placeName = 'Invalid placeName address';
    }
    return errors;
  },

  handleSubmit: async (values) => {
    const time = serverTimestamp();
    console.log(values.placeName);
    const usersCollectionRef = collection(db, 'users');
    const documentRef = await addDoc(usersCollectionRef, {
      placeName: values.placeName,
      file: values.file,
      description: values.description,
      timestamp: time,
      Longitude: values.Longitude,
      Latitude: values.Latitude,
    });
    console.log(documentRef);
  },
})(InnerForm);

export const AddFormPage = () => (
  <div>
    <h1>AddFormPage</h1>
    <BaseButton text="マップを見る" routing="/maps" />
    <MyForm message="地名、名前、説明を記入" />
  </div>
);
