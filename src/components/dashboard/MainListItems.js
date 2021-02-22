import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ApartmentIcon from '@material-ui/icons/Apartment';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import BusinessIcon from '@material-ui/icons/Business';
import DescriptionIcon from '@material-ui/icons/Description';
import BuildIcon from '@material-ui/icons/Build';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CategoryIcon from '@material-ui/icons/Category';
import TodayIcon from '@material-ui/icons/Today';

export default function MainListItems({ setMenu, error }) {
  return (
    <div>
      <ListItem button onClick={() => setMenu('dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => setMenu('unidade')}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Unidades" />
      </ListItem>
      <ListItem button onClick={() => setMenu('departamento')}>
        <ListItemIcon>
          <LocationCityIcon />
        </ListItemIcon>
        <ListItemText primary="Departamentos" />
      </ListItem>
      <ListItem button onClick={() => setMenu('setor')}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Setores" />
      </ListItem>
      <ListItem button onClick={() => setMenu('contrato')}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Contratos" />
      </ListItem>
      <ListItem button onClick={() => setMenu('vigencia')}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Vigências" />
      </ListItem>
      <ListItem button onClick={() => setMenu('material')}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Materiais" />
      </ListItem>
      <ListItem button onClick={() => setMenu('estoque')}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Estoque" />
      </ListItem>
      <ListItem button onClick={() => setMenu('servico')}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Serviço" />
      </ListItem>
    </div>
  );
}
