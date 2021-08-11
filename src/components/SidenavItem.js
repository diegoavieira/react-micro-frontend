import { ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3.2),
    '&.subitem': {
      paddingLeft: theme.spacing(5),
      '&.selected': {
        background: theme.palette.secondary.light
      }
    },
    '&.selected': {
      background: theme.palette.primary.light
    }
  },
  icon: {
    color: theme.palette.text.secondary,
    '&.selected': {
      color: theme.palette.primary.main
    }
  }
}));

const SidenavItem = ({ item, hasSub, expanded, isSub, onClickItem, selected }) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      onClick={() => onClickItem(item.path, isSub)}
      className={`${classes.root} ${isSub && 'subitem'} ${selected && 'selected'}`}
    >
      <ListItemText>
        <Typography variant="button" component="span" color={selected ? 'primary' : 'textPrimary'}>
          {item.title}
        </Typography>
      </ListItemText>
      {hasSub &&
        (expanded ? (
          <ExpandLessIcon className={`${classes.icon} ${selected && 'selected'}`} />
        ) : (
          <ExpandMoreIcon className={`${classes.icon} ${selected && 'selected'}`} />
        ))}
    </ListItem>
  );
};

export default SidenavItem;
