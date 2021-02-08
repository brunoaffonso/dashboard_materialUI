import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function SecundaryListItems() {
  return (
    <div>
      <ListSubheader inset>Relatórios</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Mês Atual" />
      </ListItem>
    </div>
  );
}
