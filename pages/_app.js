import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from 'components/Layout';
import theme from 'styles/theme';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'styles/nprogress.css';
import 'styles/main.css';
import 'react-gutenberg/default.css';

import WP from 'utils/wordpress';

NProgress.configure({
  showSpinner: false
})

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = (url) => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [trending, setTrending] = React.useState([]);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    WP.posts().perPage(5).then((articles) => {
      setTrending(articles);
    })
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Atenews - The official student publication of the Ateneo de Davao University</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        
        <link rel="preload" href="/logo.png" as="image"></link>
        <link rel="preload" href="/logo-blue.png" as="image"></link>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout trending={trending}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};