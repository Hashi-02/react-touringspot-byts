import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import * as Yup from 'yup';
import { BaseButton } from '../atoms/button/BaseButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface Values {
  placeName: string;
  file: string;
  description: string;
  Latitude: string;
  Longitude: string;
}

const validationSchema = Yup.object({
  placeName: Yup.string()
    .max(15, '１５文字以下で入力してください')
    .required('このフィールドは必須です'),
  description: Yup.string()
    .max(15, '１５文字以下で入力してください')
    .required('このフィールドは必須です'),
  Longitude: Yup.string()
    .max(15, '１５文字以下で入力してください')
    .required('このフィールドは必須です'),
  Latitude: Yup.string()
    .max(50, '１５文字以下で入力してください')
    .required('このフィールドは必須です'),
});

export const AddFormPage = () => {
  const location = useLocation();
  const { name, lat, lng } = location.state;
  const navigate = useNavigate();
  const handleSubmit = async (values: Values) => {
    try {
      const time = serverTimestamp();
      const spotsCollectionRef = collection(db, 'spots');
      const documentRef = await addDoc(spotsCollectionRef, {
        placeName: values.placeName,
        file: values.file,
        description: values.description,
        timestamp: time,
        Longitude: values.Longitude,
        Latitude: values.Latitude,
      }).then(() => {
        navigate('/maps');
      });
      console.log(documentRef);
    } catch (error) {
      console.log('err', error);
    }
  };

  const initialValues: Values = {
    placeName: name,
    file: '',
    description: '',
    Latitude: lat,
    Longitude: lng,
  };

  return (
    <div>
      <h1>AddFormPage</h1>
      <BaseButton text="マップを見る" routing="/maps" />
      <div className="flex justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
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
                      value={formik.values.placeName}
                      onChange={formik.handleChange}
                      disabled={true}
                    />
                    {formik.touched.placeName && formik.errors.placeName ? (
                      <div>{formik.errors.placeName}</div>
                    ) : null}
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 invisible">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      緯度
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Field
                      disabled={true}
                      type="text"
                      name="Latitude"
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                    {formik.touched.Latitude && formik.errors.Latitude ? (
                      <div>{formik.errors.Latitude}</div>
                    ) : null}
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6 invisible">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      経度
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Field
                      disabled={true}
                      type="text"
                      name="Longitude"
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                    {formik.touched.Longitude && formik.errors.Longitude ? (
                      <div>{formik.errors.Longitude}</div>
                    ) : null}
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
                    {formik.touched.description && formik.errors.description ? (
                      <div>{formik.errors.description}</div>
                    ) : null}
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
