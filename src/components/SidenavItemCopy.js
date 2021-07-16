import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.text.secondary,
    '&.selected': {
      color: theme.palette.primary.main
    }
  },
  subitem: {
    paddingLeft: theme.spacing(2)
  }
}));

const SidenavItemCopy = ({ item, hasSub, expanded, isSub, onClickItem }) => {
  const classes = useStyles();
  const location = useLocation();

  const itemSelected = item.path === location.pathname;

  const subitemSelected = !!(hasSub && item.items.filter((subitem) => subitem.path === location.pathname).length);

  return (
    <ListItem button onClick={() => onClickItem(item.path, isSub)}>
      <ListItemText
        primary={item.title}
        className={`${isSub && classes.subitem} ${classes.primary} ${(itemSelected || subitemSelected) && 'selected'}`}
      />
      {hasSub && (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
    </ListItem>
  );
};
export default SidenavItemCopy;
