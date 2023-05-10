import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import PhotoUpload from './PhotoUploader';
import Perks from './Perks';

export function PlacesPage() {
  const { action } = useParams();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuest, setMaxGuests] = useState(1);
  const [extrainfo,setextrainfo] = useState('')
  const [price, setPrice] = useState(100);
  const [photos, setAddedPhotos] = useState([]);
  const [redirect,setredirect] = useState('')



  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }


  function addNewPlace(ev){
    ev.preventDefault()
    // const {title , address , photos , description , perks , extrainfo , checkIn , checkOut , maxGuest}
    const data = {id , title ,address,description,perks,checkIn,checkOut,maxGuest,photos,extrainfo}
    console.log(data);
    axios.post('/place',data).then(succ => {
      alert('place added successfully')
      setredirect('/place')
    }).catch(err => {
      alert('some unwanted error occured')
    })
  }

  if (redirect){
    <Navigate to={redirect} />
  }
  

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/place/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new places
          </Link>
        </div>
      )}

      {action === 'new' && (
        <div className="m-4">
          <form action="" onSubmit={addNewPlace}>
            {preInput('Title', 'Title for your page, should be short and catchy.')}
            <input type="text" value={title} onChange={ev => {setTitle(ev.target.value)}} name="" id="" placeholder="title,for example: My sweet home" />

            {preInput('Address', 'Address to this page.')}
            <input type="text" value={address} onChange={ev => {setAddress(ev.target.value)}} placeholder="address"></input>

            {preInput('Photos', 'More = better')}
            <PhotoUpload addedPhotos = {photos} setAddedPhotos = {setAddedPhotos}/>

            {preInput('Description', 'Description of this page.')}
            <textarea name="" id="" cols="30" rows="10" onChange={ev => {setDescription(ev.target.value)}}/>

            {preInput('Extra Information', 'Description of this area.')}
            <textarea name="" id="" cols="30" rows="10" onChange={ev => {setextrainfo(ev.target.value)}}/>

            {preInput('Perks', 'Select all the perks .')}
            <Perks selected={perks} onChange={setPerks} />
            

            <h2 className="text-xl mt-4">Check-In and Check-Out</h2>
            <p className="text-gray-500 text-sm">add in check in and check out time .Remember to have time for cleaning </p>
            <div className="grid gap-2 sm:grid-col-3">
              <div>
                <h2 className="mt-2 -mb-1">Check in Time</h2>
                <input type="text" placeholder="14:00" onChange={ev => setCheckIn(ev.target.value)}/>
              </div>

              <div>
                <h2 className="mt-2 -mb-1">Check Out Time</h2>
                <input type="text" onChange={ev => setCheckOut(ev.target.value)}/>
              </div>

              <div>
                <h2 className="mt-2 -mb-1">Max Guest</h2>
                <input type="text" onChange={ev => setMaxGuests(ev.target.value)}/>
              </div>
            </div>
            <button className="primary">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
