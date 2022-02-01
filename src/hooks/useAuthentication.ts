import { useContext } from 'react';

import { AuthenticationContext } from '../contexts/Authentication';

export default () => {
  const context = useContext(AuthenticationContext);
  return context;
}