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

const SidenavItemCopy = ({ item, hasSub, expanded, isSub }) => {
  const classes = useStyles();
  const location = useLocation();

  const isSelected = item.path === location.pathname;

  const onClickItem = () => {
    console.log(item.path);
  };

  return (
    <ListItem button onClick={() => onClickItem()}>
      <ListItemText
        primary={item.title}
        className={`${isSub && classes.subitem} ${classes.primary} ${isSelected && 'selected'}`}
      />
      {hasSub && (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
    </ListItem>
  );
};
export default SidenavItemCopy;
