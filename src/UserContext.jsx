import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/user').then(({ data }) => {
        setUser(data);
        setReady(true);
      }).catch(err => {
        console.log(err);
      });
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser, ready }}>{children}</UserContext.Provider>;
}
