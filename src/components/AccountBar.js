import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import AccountIcon from '@material-ui/icons/AccountCircle';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
  account: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    marginRight: 20,
    height: 65,
  },
  button: {
    height: 65,
    width: 65,
    borderRadius: 0
  },
  viewContainer: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20
  }
});


export default function AccountBar() {
  const classes = useStyles();

  const profileView = () => {
    return (
      <div className={classes.viewContainer}>
        This is profile view.
      </div>
    )
  }
  
  
  const notificationView = () => {
    return (
      <div className={classes.viewContainer}>
        This is notification view.
      </div>
    )
  }
  
  const searchView = () => {
    return (
      <div className={classes.viewContainer}>
        This is search view.
      </div>
    )
  }

  const [activeButton, setActiveButton] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentView, setCurrentView] = React.useState(profileView);

  const handleClick = (event, button) => {
    setAnchorEl(event.currentTarget);
    setActiveButton(button);
  }

  const handleClose = () => {
    setActiveButton(null);
    setAnchorEl(null);
  }

  React.useEffect(() => {
    if (activeButton === 'Search') {
      setCurrentView(searchView);
    } else if (activeButton === 'Notifications') {
      setCurrentView(notificationView);
    } else if (activeButton === 'Account') {
      setCurrentView(profileView);
    }
  }, [activeButton])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.account}>
        <Button className={classes.button}
          variant={activeButton === 'Search' ? 'contained' : 'text'}
          color='primary'
          disableElevation
          onClick={(e) => handleClick(e, 'Search')}
        >
          <SearchIcon />
        </Button>
        <Button className={classes.button}
          variant={activeButton === 'Notifications' ? 'contained' : 'text'}
          color='primary'
          disableElevation
          onClick={(e) => handleClick(e, 'Notifications')}
        >
          <BellIcon />
        </Button>
        <Button className={classes.button}
          variant={activeButton === 'Account' ? 'contained' : 'text'}
          color='primary'
          disableElevation
          onClick={(e) => handleClick(e, 'Account')}
        >
          <AccountIcon />
        </Button>
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom-end"
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: false
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent"
            }
          }}
        >
          {currentView}
        </Popper>
      </div>
    </ClickAwayListener>
  );
}