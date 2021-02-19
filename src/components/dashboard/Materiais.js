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
import { formatNumber } from '../../helpers/formaters';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Materiais({ listItems, onUpdate, editItem }) {
  const deleteItem = async (id) => {
    await api.DeleteMaterial(id);
    onUpdate();
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Materiais</Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">N. Item</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Quantidade Anual</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((mat) => (
              <TableRow key={mat.id_material}>
                <TableCell align="center">{mat.numero_item}</TableCell>
                <TableCell align="center">{mat.descricao}</TableCell>
                <TableCell align="center">{mat.quantidade_ano}</TableCell>
                <TableCell align="center">
                  R$ {formatNumber(mat.valor)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItem(mat.id_material)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deleteItem(mat.id_material)}
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
