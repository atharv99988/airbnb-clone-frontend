
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Indexpage from './components/Indexpage';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import RegisterPage from './components/Register';
import axios from 'axios';
import { UserContextProvider } from './userContext';
import AccountPage from './components/AcountPage';
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
        <Route path='/account' element={<AccountPage/>}></Route>
        <Route path='/account/:subpage?' element={<AccountPage/>}></Route>
        <Route path='/account/:subpage/:action' element={<AccountPage/>}></Route>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
