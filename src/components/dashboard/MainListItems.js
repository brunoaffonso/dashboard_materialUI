import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function MainListItems({ setMenu }) {
  return (
    <div>
      <ListItem button onClick={() => setMenu('dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => setMenu('material')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Materiais" />
      </ListItem>
      <ListItem button onClick={() => setMenu('unidade')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Unidades" />
      </ListItem>
      <ListItem button onClick={() => setMenu('departamento')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Departamentos" />
      </ListItem>
      <ListItem button onClick={() => setMenu('setor')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Setores" />
      </ListItem>
      <ListItem button onClick={() => setMenu('contrato')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Contratos" />
      </ListItem>
      <ListItem button onClick={() => setMenu('estoque')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Estoque" />
      </ListItem>
    </div>
  );
}
