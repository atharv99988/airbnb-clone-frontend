import axios from 'axios';
import { useState } from 'react';

export default function PhotoUpload({ addedPhotos, setAddedPhotos}) {
  const [link, setlink] = useState('');

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const map1 = new FormData();
    for (let i = 0; i < files.length; i++) {
      map1.append('photos', files[i]);
    }
    console.log(files, map1);
    axios.post('/upload-file', map1, { headers: { 'Content-Type': 'multipart/form-data' } }).then((succ) => {
        const { data: filename } = succ;
        setAddedPhotos((prev) => {
          const arr = [...prev, ...filename];
          console.log(arr);
          return arr;
        });
        alert('file uploaded succ');
      })
      .catch((err) => {
        console.log(err);
        alert('some error occured');
      });
  }

  function uploadpic(ev) {
    ev.preventDefault();
    axios.post('/upload', { link }).then((filename) => {
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

  return (
    <>
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
              <div className=" flex" key={link}>
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
    </>
  );
}
