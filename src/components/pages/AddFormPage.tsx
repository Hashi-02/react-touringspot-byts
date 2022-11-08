import { BaseButton } from '../atoms/button/BaseButton';
import React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

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
          {touched.placeName && errors.placeName && (
            <div>{errors.placeName}</div>
          )}
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
          {touched.Latitude && errors.Latitude && <div>{errors.Latitude}</div>}
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
          {touched.Longitude && errors.Longitude && (
            <div>{errors.Longitude}</div>
          )}
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
          {touched.file && errors.file && <div>{errors.file}</div>}
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
            as="textarea"
            type="text"
            name="description"
            rows="6"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
          {touched.description && errors.description && (
            <div>{errors.description}</div>
          )}
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
      errors.placeName = 'このフィールドは必須です';
    } else if (values.placeName.length > 15) {
      errors.placeName = '１５文字以下で入力してください';
    }
    if (!values.description) {
      errors.description = 'このフィールドは必須です';
    } else if (values.description.length > 15) {
      errors.description = '１５文字以下で入力してください';
    }
    if (!values.Latitude) {
      errors.Latitude = 'このフィールドは必須です';
    } else if (values.Latitude.length > 50) {
      errors.Latitude = '１５文字以下で入力してください';
    }
    if (!values.Longitude) {
      errors.Longitude = 'このフィールドは必須です';
    } else if (values.Longitude.length > 50) {
      errors.Longitude = '１５文字以下で入力してください';
    }
    return errors;
  },

  handleSubmit: async (values) => {
    try {
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
      ChangePage();
    } catch (error) {
      console.log('err', error);
    }
  },
})(InnerForm);

export const AddFormPage = () => (
  <div>
    <h1>AddFormPage</h1>
    <BaseButton text="マップを見る" routing="/maps" />
    <div className="flex justify-center">
      <MyForm message="地名、名前、説明を記入" />
    </div>
  </div>
);
