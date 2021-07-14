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
  itemChild: {
    paddingLeft: theme.spacing(2)
  }
}));

const SidenavItem = ({ item, child }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const isChildItem = (children) => children && children.length;

  const hasChildItemSelected = !!(
    isChildItem(item.children) && item.children.filter((itemChild) => itemChild.path === location.pathname).length
  );

  const isSelected = item.path === location.pathname;

  const [openChild, setOpenChild] = useState(hasChildItemSelected);

  const onClickItem = ({ children, path }) => {
    if (isChildItem(children)) {
      setOpenChild(!openChild);
    } else {
      history.push(path);
    }
  };

  const expandIconChild = ({ children }) => {
    const color = isSelected || hasChildItemSelected ? theme.palette.primary.main : theme.palette.text.secondary;
    return (
      isChildItem(children) && (openChild ? <ExpandLessIcon style={{ color }} /> : <ExpandMoreIcon style={{ color }} />)
    );
  };

  const collapseList = ({ children }) =>
    isChildItem(children) && (
      <Collapse in={openChild} timeout="auto" unmountOnExit>
        <List disablePadding>
          {children.map((childItem) => (
            <SidenavItem child key={childItem.name} item={childItem} />
          ))}
        </List>
      </Collapse>
    );

  return (
    <>
      <ListItem button onClick={() => onClickItem(item)}>
        <ListItemText
          primary={item.name}
          className={`${child && classes.itemChild} ${classes.primary} ${
            (isSelected || hasChildItemSelected) && 'selected'
          }`}
        />
        {expandIconChild(item)}
      </ListItem>
      {collapseList(item)}
    </>
  );
};

export default SidenavItem;
