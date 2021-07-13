import React, { useState } from 'react';
import { makeStyles, ListItem, ListItemText, Collapse, List } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  itemChild: {
    paddingLeft: theme.spacing(2)
  }
}));

const SidenavItem = ({ item, child }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [openChild, setOpenChild] = useState(false);

  const isChildItem = (children) => children && children.length;

  const onClickItem = ({ children, path }) => {
    if (isChildItem(children)) {
      setOpenChild(!openChild);
    } else {
      history.push(path);
    }
  };

  const expandIconChild = ({ children }) =>
    isChildItem(children) && (openChild ? <ExpandLessIcon /> : <ExpandMoreIcon />);

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
      <ListItem button onClick={() => onClickItem(item)} selected={location.pathname === item.path}>
        <ListItemText primary={item.name} className={child && classes.itemChild} />
        {expandIconChild(item)}
      </ListItem>
      {collapseList(item)}
    </>
  );
};

export default SidenavItem;
