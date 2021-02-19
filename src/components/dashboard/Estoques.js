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
import { dateFormatList } from '../../helpers/formaters';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Estoques({ listItems, onUpdate, editItem }) {
  const deleteItem = async (id) => {
    await api.DeleteEstoque(id);
    onUpdate();
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Estoque</Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Material</TableCell>
              <TableCell align="center">Fabricante</TableCell>
              <TableCell align="center">Modelo</TableCell>
              <TableCell align="center">Data de Entrada</TableCell>
              <TableCell align="center">Data de Saída</TableCell>
              <TableCell align="center">Local</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Em estoque</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((mat) => (
              <TableRow key={mat.id_estoque}>
                <TableCell align="center">{mat.material}</TableCell>
                <TableCell align="center">{mat.fabricante}</TableCell>
                <TableCell align="center">{mat.modelo}</TableCell>
                <TableCell align="center">
                  {dateFormatList(mat.data_entrada)}
                </TableCell>
                <TableCell align="center">
                  {mat.data_saida ? dateFormatList(mat.data_saida) : ''}
                </TableCell>
                <TableCell align="center">{mat.localizacao}</TableCell>
                <TableCell align="center">{mat.quantidade}</TableCell>
                <TableCell align="center">
                  {mat.em_estoque === 0 ? 'Não' : 'Sim'}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItem(mat.id_estoque)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deleteItem(mat.id_estoque)}
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
