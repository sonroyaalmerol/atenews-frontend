import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(() => ({
  reacts: {
    width: 40,
    height: 57,
    overflow: 'visible',
  },
  buttonReacts: {
    width: 19,
    height: 26,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0,
  },
  infoReacts: {
    width: 30,
    height: 43,
    backgroundColor: 'transparent',
    overflow: 'visible',
    border: 0,
  },
  container: {
    width: 'fit-content',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ReactInfo = ({
  disableHover,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [buttonText, setButtonText] = React.useState('React');
  const [react, setReact] = React.useState(null);

  const handlePopoverOpen = (event) => {
    if (!disableHover) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    if (!disableHover) {
      setAnchorEl(null);
    }
  };

  const handleReact = (reactX) => {
    handlePopoverClose();
    if (react === reactX) {
      setReact(null);
      setButtonText('React');
      return;
    }

    setReact(reactX);
    switch (reactX) {
      case 'happy':
        setButtonText('Happy');
        break;
      case 'sad':
        setButtonText('Sad');
        break;
      case 'angry':
        setButtonText('Angry');
        break;
      case 'disgust':
        setButtonText('Disgusted');
        break;
      case 'worried':
        setButtonText('Worried');
        break;
      default:
    }
  };

  const ButtonIcon = () => {
    if (!react) {
      return <InsertEmoticonIcon style={{ marginRight: theme.spacing(1) }} />;
    }

    switch (react) {
      case 'happy':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/happy.svg" />;
      case 'sad':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/sad.svg" />;
      case 'angry':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/angry.svg" />;
      case 'disgust':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/disgust.svg" />;
      case 'worried':
        return <Avatar className={classes.buttonReacts} style={{ marginRight: theme.spacing(1) }} src="/reacts/worried.svg" />;
      default:
        return null;
    }
  };

  return (
    <ClickAwayListener onClickAway={handlePopoverClose}>
      <div>
        <Button variant="text" color={theme.palette.type === 'light' ? 'primary' : 'secondary'} size="large" fullWidth onClick={handlePopoverOpen}>
          <ButtonIcon />
          { buttonText === 'React' ? buttonText
            : <b>{buttonText}</b>}
        </Button>

        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="top"
          disablePortal={false}
          style={{ zIndex: 2000 }}
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
        >
          <Grow in={Boolean(anchorEl)}>
            <Card elevation={0} variant="outlined" style={{ borderRadius: 40, marginBottom: theme.spacing(1) }}>
              <Grid container>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('happy')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/happy.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('sad')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/sad.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('angry')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/angry.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('disgust')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/disgust.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
                <Grid item>
                  <CardActionArea onClick={() => handleReact('worried')}>
                    <CardContent>
                      <Avatar className={classes.reacts} src="/reacts/worried.svg" />
                    </CardContent>
                  </CardActionArea>
                </Grid>
              </Grid>
            </Card>
          </Grow>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default ReactInfo;
