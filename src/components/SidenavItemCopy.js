import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SidenavItemCopy = ({ item, expanded }) => (
  <ListItem button>
    <ListItemText primary={item.title} />
    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
  </ListItem>
);

export default SidenavItemCopy;
