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
import { dateFormatList, formatNumber } from '../../helpers/formaters';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Vigencias({ listItems, onUpdate, editItem }) {
  const deleteItem = async (id) => {
    await api.DeleteVigencia(id);
    onUpdate();
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Vigências de Contratos</Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">N. Contrato / Ano</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Renovação</TableCell>
              <TableCell align="center">Início</TableCell>
              <TableCell align="center">Fim</TableCell>
              <TableCell align="center">BDI</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((cont) => (
              <TableRow key={cont.id_vigencia}>
                <TableCell align="center">{cont.contrato}</TableCell>
                <TableCell align="center">{cont.descricao}</TableCell>
                <TableCell align="center">{cont.renovacao}</TableCell>
                <TableCell align="center">
                  {cont.inicio ? dateFormatList(cont.inicio) : ''}
                </TableCell>
                <TableCell align="center">
                  {cont.fim ? dateFormatList(cont.fim) : ''}
                </TableCell>
                <TableCell align="center">{formatNumber(cont.bdi)} %</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItem(cont.id_vigencia)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deleteItem(cont.id_vigencia)}
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
