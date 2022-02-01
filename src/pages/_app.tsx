import AuthenticationProvider from '../contexts/Authentication';
import MessageProvider from '../contexts/Message';

import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthenticationProvider>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </AuthenticationProvider>
  );
}

export default MyApp
