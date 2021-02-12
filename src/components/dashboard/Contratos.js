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

export default function Contratos({ listItems, onUpdate, editItem }) {
  const deleteItem = async (id) => {
    await api.DeleteContrato(id);
    onUpdate();
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Contratos</Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>N. Contrato / Ano</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Renovação</TableCell>
              <TableCell>Início</TableCell>
              <TableCell>Fim</TableCell>
              <TableCell>BDI</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((mat) => (
              <TableRow key={mat.id_contrato}>
                <TableCell>
                  {mat.numero}/{mat.ano}
                </TableCell>
                <TableCell>{mat.descricao}</TableCell>
                <TableCell>{mat.renovacao}</TableCell>
                <TableCell>{mat.inicio}</TableCell>
                <TableCell>{mat.fim}</TableCell>
                <TableCell>{mat.bdi}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItem(mat.id_contrato)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deleteItem(mat.id_contrato)}
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