import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import axios from 'axios';

export default function Indexpage(params) {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then((res) => {
      setPlaces([...res.data]);
    });
  }, []);
  return (
    <div className="grid mt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <div className="m-4">
              <Link to={'/place/' + place._id}>
                <div className="bg-gray-500 rounded-2xl flex ">
                  <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:5000/upload/' + place.photos?.[0]} alt="" />
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
