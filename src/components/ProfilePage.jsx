import { useContext } from 'react';
import { UserContext } from '../userContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AccountNav from './AccountNav';
import { PlacesPage } from './PlacesPage';


export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  let { subpage } = useParams();
  console.log(subpage);

  subpage = subpage === undefined ? 'profile' : subpage;

  if (!ready) {
    return 'loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'}></Navigate>;
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }
  function Logout() {
    axios.post('/logout').then((succ) => {
        setredirect('/');
        setUser(null);
      })
      .catch((err) => {
        alert('some error occured while logging out');
      });
  }

  return (
    <div>
      {<AccountNav/>}
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto my-4">
          Logged in as {user.name}({user.email})<br />
          <button onClick={Logout} className="primary max-w-sm mx-auto mt-4">
            LogOut
          </button>
        </div>
      )}
    </div>
  );
}
