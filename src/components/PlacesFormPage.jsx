import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PhotoUpload from './PhotoUploader';
import Perks from './Perks';
import AccountNav from './AccountNav';

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuest, setMaxGuests] = useState();
  const [extrainfo, setextrainfo] = useState('');
  const [price, setPrice] = useState();
  const [photos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  function preInput(header, description) {
    function inputDescription(text) {
      return <p className="text-gray-500 text-sm">{text}</p>;
    }

    function inputHeader(text) {
      return <h2 className="text-2xl mt-4">{text}</h2>;
    }
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

function addNewPlace(ev) {

      ev.preventDefault();
      const data = { id, title, address, description, perks, checkIn, checkOut, maxGuest, photos, extrainfo,price };
      if (id) {
        // update
       axios.put('/place', {id, ...data}).then(succ => {
        alert('place updated successfully');
       }).catch(err => {
        alert('some unwanted error occured while updating');
       })
        setRedirect(true);
      } else {
        // new place
        axios.post('/place', data).then(succ => {
          alert('place added successfully');
        })
        setRedirect(true);
      }
  }

  useEffect(() => {
    if(!id) {return}
    axios.get('place/'+ id).then(({data}) => {
      setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setextrainfo(data.extrainfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuest);
       setPrice(data.price);
    }).catch(err => {
      alert('some error occured ')
    })
  },[id])

  if (redirect) {
    return <Navigate to={'/account/place'} />;
  }

  return (
    <>
      <AccountNav />
      <div className="m-4">
        <form action="" onSubmit={addNewPlace}>
          {preInput('Title', 'Title for your page, should be short and catchy.')}
          <input
            type="text"
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
            name=""
            id=""
            placeholder="title,for example: My sweet home"
          />

          {preInput('Address', 'Address to this page.')}
          <input
            type="text"
            value={address}
            onChange={(ev) => {
              setAddress(ev.target.value);
            }}
            placeholder="address"
          ></input>

          {preInput('Photos', 'More = better')}
          <PhotoUpload addedPhotos={photos} setAddedPhotos={setAddedPhotos} />

          {preInput('Description', 'Description of this page.')}
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
          />

          {preInput('Extra Information', 'Description of this area.')}
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            value={extrainfo}
            onChange={(ev) => {
              setextrainfo(ev.target.value);
            }}
          />

          {preInput('Perks', 'Select all the perks .')}
          <Perks selected={perks} onChange={setPerks} />

          <h2 className="text-xl mt-4">Check-In and Check-Out</h2>
          <p className="text-gray-500 text-sm">add in check in and check out time .Remember to have time for cleaning </p>
          <div className="grid gap-2 sm:grid-col-3  md:grid-cols-4 m-2">
            <div>
              <h2 className="mt-2 -mb-1">Check in Time</h2>
              <input type="text" value={checkIn} placeholder="14:00" onChange={(ev) => setCheckIn(ev.target.value)} />
            </div>

            <div>
              <h2 className="mt-2 -mb-1">Check Out Time</h2>
              <input type="text" value={checkOut} placeholder="24:00" onChange={(ev) => setCheckOut(ev.target.value)} />
            </div>

            <div>
              <h2 className="mt-2 -mb-1">Max Guest</h2>
              <input type="text" value={maxGuest} placeholder="5" onChange={(ev) => setMaxGuests(ev.target.value)} />
            </div>

            <div>
              <h2 className="mt-2 -mb-1">Price per Night</h2>
              <input type="text" value={price} placeholder="100" onChange={(ev) => setPrice(ev.target.value)} />
            </div>

          </div>
          <button className="primary">Save</button>
        </form>
      </div>
    </>
  );
}
