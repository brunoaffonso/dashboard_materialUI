import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as api from '../../api/serviceApi';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Departamentos({
  listItems,
  onUpdate,
  editItem,
  unidades,
}) {
  const deleteItem = async (id) => {
    await api.DeleteDepartamento(id);
    onUpdate();
  };

  const getName = (id) => {
    const [res] = unidades.filter((u) => u.id_unidade === id);
    return res.name;
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Departamentos</Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item) => (
              <TableRow key={item.id_departamento}>
                <TableCell>{item.id_departamento}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{getName(item.unidade)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItem(item.id_departamento)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deleteItem(item.id_departamento)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
