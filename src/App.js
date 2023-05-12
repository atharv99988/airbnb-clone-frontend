
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Indexpage from './components/Indexpage';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import RegisterPage from './components/Register';
import axios from 'axios';
import { UserContextProvider } from './userContext';
import ProfilePage from './components/ProfilePage';
import { PlacesPage } from './components/PlacesPage';
import PlacesFormPage from './components/PlacesFormPage';
import PlacePage from './components/PlacePage';
import BookingsPage from './components/BookingsPage';
import BookingPage from './components/BooknigPage';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Indexpage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/account' element={<ProfilePage/>}></Route>
        <Route path='/account/place' element={<PlacesPage/>}></Route>
        <Route path="/account/place/new" element={<PlacesFormPage />} />
        <Route path="/account/place/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/account/booking" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
