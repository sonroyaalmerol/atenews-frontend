import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  menu: {
    display: 'flex',
    width: '15vw',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    touchAction: 'manipulation',
    userSelect: 'none',
    textDecoration: 'none',
    color: 'white',
    background: '#195EA9'
  },
  menuLabel: {
    zIndex: 0,
    color: 'white'
  },
});

export default function Menu({color, children, label, onClick}) {
  const classes = useStyles();

  const [submenu, setSubmenu] = React.useState(false);

  const handleHover = () => {
    setSubmenu(true);
  }

  const handleClose = () => {
    setSubmenu(false);
  };

  return (
    <div className={classes.menu} onMouseOver={handleHover} onMouseLeave={handleClose} style={{ background: color }}>
      <CardActionArea onClick={onClick} style={{ height: 65 }}>
        <div className={classes.menuLabel}>
          {label}
        </div>
      </CardActionArea>
      {submenu ? children : null}
    </div>
  );
}