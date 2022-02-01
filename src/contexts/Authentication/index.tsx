import { useState, createContext, useEffect, useMemo } from 'react';
import axios from 'axios';

import supa from '../../services/supa';

type AuthenticationContextData = {
  loadingAuthentication: boolean;
  authenticated: boolean;
  loadingProfile: boolean;
  profile: any | null;
  errors: any[];
  handleLogout: () => Promise<void>; 
  handleUsernameSearch: (username: string) => Promise<void>;
}

export const AuthenticationContext = createContext({} as AuthenticationContextData);

export default function Authentication({ children }) {
  const [loadingAuthentication, setLoadingAuthentiation] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchProfile(username: string) {
      try {
        setLoadingProfile(true);
        const { data: userExists } = await supa.from('users')
          .select('*')
          .filter('username', 'eq', username);
          if (userExists.length === 0) {
            throw new Error();
          }

          setProfile(userExists[0]);
          setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false)
        setProfile(null);
        setErrors((oldState) => [...oldState, { status: 404, message: 'Usuário não existe!'}])
        localStorage.removeItem('@session');
      } finally {
        setLoadingProfile(false);
      }
    }

    const username = localStorage.getItem('@session');
    if (username && username.length > 0) {
      setTimeout(() => {
        fetchProfile(username);
      }, 1000);
    } else {
      setLoadingProfile(false);
    }
  }, []);

  async function handleUsernameSearch(value: string): Promise<void> {
    try {
      setErrors([]);
      setLoadingAuthentiation(true);
      setLoadingProfile(true);
      const { data: userExists } = await supa.from('users')
        .select('*')
        .filter('username', 'eq', value);
      if (userExists[0]) {
        setAuthenticated(true);
        setProfile(userExists[0]);
        localStorage.setItem('@session', userExists[0].username);
        return;
      }
      const { data: userGithub } = await axios
        .get(`https://api.github.com/users/${value}`);
      if (userGithub.name && userGithub.login) {
        const newProfile = [{
          name: `${userGithub.name.split(' ')[0]} ${userGithub.name.split(' ')[1]}`,
          username: userGithub.login.toLowerCase(),
          avatar_url: userGithub.avatar_url,
          location: userGithub.location,
          email: userGithub.email
        }];
        await supa.from('users').insert(newProfile);
        setErrors([]);
        setProfile(newProfile[0]);
        setAuthenticated(true);
        localStorage.setItem('@session', userExists[0].username);
        return;
      }
      throw new Error();
    } catch (error) {
      setProfile(null)
      setAuthenticated(null)
      setErrors((oldState) => [...oldState, { status: error.status || 404, message: 'Usuário não existe!' }]);
    } finally {
      setLoadingAuthentiation(false);
      setLoadingProfile(false);
    }
  }

  async function handleLogout() {
    localStorage.removeItem('@session');
    setAuthenticated(false);
    setProfile(false);
    setErrors([]);
  }

  const states = useMemo(() => {
    return {
      loadingAuthentication,
      authenticated,
      loadingProfile,
      profile,
      errors
    }
  }, [loadingAuthentication, authenticated, loadingProfile, profile, errors]);

  useEffect(() => {
    async function handleCleanup() {
      alert('Okay!');
    }

    window.addEventListener('beforeunload', handleCleanup)

    return () => {
      window.removeEventListener('beforeunload', handleCleanup);
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{...states, handleLogout, handleUsernameSearch}}>
      {children}
    </AuthenticationContext.Provider>
  );
}