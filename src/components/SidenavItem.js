import React, { useState } from 'react';
import { makeStyles, ListItem, ListItemText, Collapse, List, useTheme } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const SidenavItem = ({ item, isSubitem }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const hasSubitems = (subitems) => subitems && subitems.length;

  const hasChildItemSelected = !!(
    hasSubitems(item.subitems) && item.subitems.filter((subitem) => subitem.path === location.pathname).length
  );

  const isSelected = item.path === location.pathname;

  const [openItem, setOpenItem] = useState(hasChildItemSelected);

  const onClickItem = ({ subitems, path }) => {
    if (hasSubitems(subitems)) {
      setOpenItem(!openItem);
    } else {
      history.push(path);
    }
  };

  const expandIcon = ({ subitems }) => {
    const color = isSelected || hasChildItemSelected ? theme.palette.primary.main : theme.palette.text.secondary;
    return (
      hasSubitems(subitems) && (openItem ? <ExpandLessIcon style={{ color }} /> : <ExpandMoreIcon style={{ color }} />)
    );
  };

  const collapseList = ({ subitems }) =>
    hasSubitems(subitems) && (
      <Collapse in={openItem} timeout="auto" unmountOnExit>
        <List disablePadding>
          {subitems.map((subitem) => (
            <SidenavItem isSubitem key={subitem.id} item={subitem} />
          ))}
        </List>
      </Collapse>
    );

  return (
    <>
      <ListItem button onClick={() => onClickItem(item)}>
        <ListItemText
          primary={item.title}
          className={`${isSubitem && classes.subitem} ${classes.primary} ${
            (isSelected || hasChildItemSelected) && 'selected'
          }`}
        />
        {expandIcon(item)}
      </ListItem>
      {collapseList(item)}
    </>
  );
};

export default SidenavItem;
