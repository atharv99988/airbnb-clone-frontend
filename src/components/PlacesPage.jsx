import { Link, useParams } from 'react-router-dom';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from './AccountNav';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function PlacesPage() {
  const { action } = useParams();
  const [place, setPlace] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  function getPlaces() {
    axios
      .get('/user-place')
      .then(({ data }) => {
        console.log(data);
        setPlace(data);
      })
      .catch((err) => {
        console.log(err);
        alert('some error occured ');
      });
  }

  return (
    <div>
      <AccountNav />
      <div>
        {action !== 'new' && (
          <>
            <div className="text-center">
              <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/place/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new places
              </Link>
            </div>

            <div>
              {place.length > 0 &&
                place.map((place) => {
                  return (
                    <>
                    <Link to={'/account/place/' + place._id}>
                    <div className=" flex bg-gray-100 p-4 m-4 gap-4 rounded-2xl">
                      <div className="w-32 h-32 bg-gray-200 shrink-0 ">{place.photos.length > 0 && <img className = 'h-32 w-32' src= {'http://localhost:5000/upload/'+ place.photos[0] } alt="" />  }</div>
                      <div>
                        <h2 className="text-xl grow-0">{place.title}</h2>
                        <p>{place.description}</p>
                      </div>
                    </div>
                    </Link>
                    </>
                  );
                })}
            </div>
          </>
        )}
        {action === 'new' && <PlacesFormPage />}
      </div>
    </div>
  );
}
