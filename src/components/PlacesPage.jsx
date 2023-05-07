import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export function PlacesPage() {
  const { action } = useParams();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [link, setlink] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  function uploadpic(ev) {
    ev.preventDefault();
    axios
      .post('/upload', { link })
      .then((filename) => {
        console.log(filename);
        setAddedPhotos((prev) => {
          return [...prev, filename.data];
        });
        alert('image added succesfully');
      })
      .catch((err) => {
        console.log(err);
        alert('failed to add image');
      });
  }

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

  function uploadPhoto(ev) {
    const files = ev.target.files
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos',files[i])
    }
    console.log(files,data);
    axios.post('/upload-file',data,{headers :{"Content-Type" : 'multipart/form-data' , }}).then(succ => {
      const { data } = succ
      console.log(data); 
      alert('file uploaded succ')
    }).catch(err => {
      console.log(err);
      alert('some error occured')
    })
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
          <form action="">
            {preInput('Title', 'Title for your page, should be short and catchy.')}
            <input type="text" value={title} name="" id="" placeholder="title,for example: My sweet home" />

            {preInput('Address', 'Address to this page.')}
            <input type="text" value={address} placeholder="address"></input>

            {preInput('Photos', 'More = better')}
            <div className="flex gap-2">
              <input type="text" value={link} onChange={(ev) => setlink(ev.target.value)} name="" id="" placeholder="Add using a link...jpg" />
              <button onClick={uploadpic} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photos
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  return (
                    <div>
                      <img className="rounded-2xl h-full w-full" src={'http://localhost:5000/upload/' + link} alt="" />
                    </div>
                  );
                })}
              <label className="flex gap-2 justify-center border bg-transparent rounded-2xl text-gray-600 text-2xl p-2 items-center">
                <input multiple type="file" className="hidden cursor-pointer" name="" id="" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload
              </label>
            </div>

            {preInput('Description', 'Description of this page.')}
            <textarea name="" id="" cols="30" rows="10" />

            {preInput('Perks', 'Select all the perks .')}

            <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 gap-1 mt-1 ">
              <label className="border p-4 rounded-md flex gap-2 cursor-pointer ">
                <input type="checkbox" name="" id="" />
                <span>WIFI</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
              </label>

              <label className="border p-4 rounded-md flex gap-2 cursor-pointer">
                <input type="checkbox" name="" id="" />
                <span>Free parking</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </label>

              <label className="border p-4 rounded-md flex gap-2 cursor-pointer">
                <input type="checkbox" name="" id="" />
                <span>TV</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </label>

              <label className="border p-4 rounded-md flex gap-2 cursor-pointer">
                <input type="checkbox" name="" id="" />
                <span>Pets</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
              </label>

              <label className="border p-4 rounded-md flex gap-2 cursor-pointer">
                <input type="checkbox" name="" id="" />
                <span>Private Entrance</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
              </label>

              <label className="border p-4 rounded-md flex gap-2 cursor-pointer items-center">
                <input type="checkbox" name="" id="" />
                <span>Radio</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </label>
            </div>

            <h2 className="text-xl mt-4">Check-In and Check-Out</h2>
            <p className="text-gray-500 text-sm">add in check in and check out time .Remember to have time for cleaning </p>
            <div className="grid gap-2 sm:grid-col-3">
              <div>
                <h2 className="mt-2 -mb-1">Check in Time</h2>
                <input type="text" placeholder="14:00" />
              </div>

              <div>
                <h2 className="mt-2 -mb-1">Check Out Time</h2>
                <input type="text" />
              </div>

              <div>
                <h2 className="mt-2 -mb-1">Max Guest</h2>
                <input type="text" />
              </div>
            </div>
            <button className="primary">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
