import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link style={{ textDecoration: 'none', color: 'gray' }} to='/agregar'><ListItemText primary='Inicio' /></Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <Link style={{ textDecoration: 'none', color: 'gray' }} to='/agregar'><ListItemText primary='Agregar Item' /></Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <Link style={{ textDecoration: 'none', color: 'gray' }} to='/eliminar'><ListItemText primary='Eliminar Item' /></Link>
    </ListItem>
  </div>
);

export default mainListItems;
