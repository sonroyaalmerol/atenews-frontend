import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(6),
    display: 'flex',
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="body1">End the silence of the gagged!</Typography>
          <Typography variant="body1">
            ©
            {' '}
            {(new Date()).getFullYear()}
            {' '}
            <b style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>Atenews</b>
          </Typography>
          <Grid item container direction="row" spacing={4} justify="center" style={{ marginTop: theme.spacing(1) }}>
            <Grid item>
              <IconButton color={theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={() => window.open('https://www.facebook.com/atenews', '_blank')}>
                <FacebookIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color={theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={() => window.open('https://twitter.com/atenews', '_blank')}>
                <TwitterIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color={theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={() => window.open('https://instagram.com/atenews', '_blank')}>
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
