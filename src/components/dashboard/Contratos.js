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
              <TableCell align="center">N. Contrato</TableCell>
              <TableCell align="center">Processo</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Início</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((cont) => (
              <TableRow key={cont.id_contrato}>
                <TableCell align="center">{cont.numero}</TableCell>
                <TableCell align="center">{cont.processo}</TableCell>
                <TableCell align="center">{cont.descricao}</TableCell>
                <TableCell align="center">
                  {cont.inicio ? dateFormatList(cont.inicio) : ''}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItem(cont.id_contrato)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deleteItem(cont.id_contrato)}
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
