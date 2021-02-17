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
            {listItems.map((cont) => (
              <TableRow key={cont.id_vigencia}>
                <TableCell>{cont.contrato}</TableCell>
                <TableCell>{cont.descricao}</TableCell>
                <TableCell>{cont.renovacao}</TableCell>
                <TableCell>
                  {cont.inicio ? dateFormatList(cont.inicio) : ''}
                </TableCell>
                <TableCell>
                  {cont.fim ? dateFormatList(cont.fim) : ''}
                </TableCell>
                <TableCell>{formatNumber(cont.bdi)} %</TableCell>
                <TableCell>
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
