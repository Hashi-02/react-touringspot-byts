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
    <Link to={props.routing}>
      <button className="m-3">
        <div className="w-full p-2 rounded-lg shadow-xl lg:flex lg:max-w-lg">
          <img
            className="object-cover w-full lg:w-40 lg:h-40 rounded-lg"
            src={props.imgSrc}
            alt=""
          />
          <div className="pl-2">
            <h4 className="text-xl font-semibold tracking-tight text-blue-600">
              {props.title}
            </h4>
            <p className="mb-2 leading-normal">{props.description}</p>
          </div>
        </div>
      </button>
    </Link>
  );
};
