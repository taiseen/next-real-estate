import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import '../style/progressBar.css'


function MyApp({ Component, pageProps }) {

  NProgress.configure({ showSpinner: false });

  // we have different events that we can track, as...
  // routeChangeStart
  // routeChangeComplete
  // & we can call specific part of code... on that event...

  // Start Loading, When User Start Changing The Page...
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  // Stop Loading, When Page loading is complete...
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });


  return (
    <>
      <Head>
        <link rel='stylesheet' referrerPolicy='no-referrer'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider>
        <Layout>

          <Component {...pageProps} />

        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;