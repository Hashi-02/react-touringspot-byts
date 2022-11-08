import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
  routing: string;
  imgSrc: string;
  title: string;
  description: string;
};

export const Card = (props: Props) => {
  return (
    <div className="m-6">
      <Link to={props.routing}>
        <button className="w-full">
          <div className="flex flex-row rounded-lg shadow-xl lg:flex  p-2">
            <img
              className="object-cover w-full lg:w-40 lg:h-40 rounded-lg mr-3"
              src={props.imgSrc}
              alt=""
            />
            <div className="flex flex-col  mx-auto">
              <h4 className="text-xl text-center font-semibold tracking-tight text-purple-600">
                {props.title}
              </h4>
              <p className="mb-2 leading-normal">{props.description}</p>
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
};
