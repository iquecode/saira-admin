import '../styles/globals.css'
import { AppProvider } from '../data/context/AppContext'
import { AuthProvider } from '../data/context/AuthContext'

import '../styles/nprogress.css';
import NProgress from 'nprogress';
import { Router } from 'next/router';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  });

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading... ${url}`);
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());

Router.events.on('routeChangeError', () => NProgress.done());




function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
       <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  ) 
}

export default MyApp
