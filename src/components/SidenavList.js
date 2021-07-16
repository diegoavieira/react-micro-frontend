import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  List,
  ListSubheader,
  withStyles
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SidenavItem from './SidenavItem';

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: 48,
    padding: 0,
    '&$expanded': {
      minHeight: 48,
      padding: 0
    }
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: 0,
    display: 'block'
  }
})(MuiAccordionDetails);

const SidenavList = ({ itemsList }) => {
  const history = useHistory();
  const location = useLocation();

  const itemSelected = (item) => item.path === location.pathname;

  const subitemSelected = (item) =>
    !!(item.items && item.items.filter((subitem) => subitem.path === location.pathname).length);

  const [expanded, setExpanded] = useState(false);

  const onChangeItem = (expandedId) => (event, isExpanded) => setExpanded(isExpanded ? expandedId : false);

  const expandedId = (itemListId, itemId) => `${itemListId}-${itemId}`;

  const onClickItem = (path, isSub) => {
    if (!isSub) setExpanded(false);
    if (path) history.push(path);
  };

  return (
    <>
      {itemsList.map((itemList) => (
        <List key={itemList.id} disablePadding subheader={<ListSubheader>{itemList.subtitle}</ListSubheader>}>
          {itemList.items.map((item) =>
            item.items ? (
              <Accordion
                key={item.id}
                square
                expanded={expanded === expandedId(itemList.id, item.id) || subitemSelected(item)}
                onChange={onChangeItem(expandedId(itemList.id, item.id))}
              >
                <AccordionSummary>
                  <SidenavItem
                    onClickItem={onClickItem}
                    hasSub
                    expanded={expanded === expandedId(itemList.id, item.id) || subitemSelected(item)}
                    item={item}
                    selected={subitemSelected(item)}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {item.items.map((subitem) => (
                    <SidenavItem
                      selected={itemSelected(subitem)}
                      onClickItem={onClickItem}
                      isSub
                      key={subitem.id}
                      item={subitem}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : (
              <SidenavItem selected={itemSelected(item)} onClickItem={onClickItem} key={item.id} item={item} />
            )
          )}
        </List>
      ))}
    </>
  );
};

export default SidenavList;
