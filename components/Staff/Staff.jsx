import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Typography, Paper, Grid, CardActionArea, Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  trendingItem: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  trendingStats: {
    width: '100%',
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
    padding: theme.spacing(0.5),
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  avatar: {
    height: 80,
    width: 80,
  },
}));

const Column = ({ details }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <CardActionArea onClick={() => {}} style={{ marginTop: theme.spacing(1) }}>
      <Paper variant="outlined" className={classes.trendingItem}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar} src={details.avatar} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{details.name}</Typography>
            <Typography variant="body1" style={{ color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white' }}>{details.position}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </CardActionArea>
  );
};

export default Column;