import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';

const Navigation = dynamic(import('@/components/Layout/Navigation'));
const AccountBar = dynamic(import('@/components/Layout/AccountBar'));
const MobileBar = dynamic(import('@/components/Layout/MobileBar'));

const useStyles = makeStyles((theme) => ({
  margin: {
    position: 'fixed',
    width: '15.5vw',
    height: 85,
    right: 0,
    top: 0,
    zIndex: 1100,
    background: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  container: {
    marginTop: 20,
  },
  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header({ closeButtomNav, setDarkMode }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.margin} />
      <div className={classes.desktop}>
        <Navigation />
        <AccountBar setDarkMode={setDarkMode} />
      </div>
      <div className={classes.mobile}>
        <MobileBar closeButtomNav={closeButtomNav} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}
