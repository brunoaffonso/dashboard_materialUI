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

export default function Setores({
  listItems,
  onUpdate,
  editItem,
  departamentos,
  unidades,
}) {
  const deleteItem = async (id) => {
    const res = await api.DeleteSetor(id);
    console.log(res);
    onUpdate();
  };

  const getUnidade = (id) => {
    const [res] = departamentos.filter((d) => d.id_departamento === id);
    const [unidade] = unidades.filter((u) => u.id_unidade === res.unidade);
    return unidade.name;
  };

  const getDepartamento = (id) => {
    const [res] = departamentos.filter((u) => u.id_departamento === id);
    return res.name;
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Setores</Title>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Setor</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item) => (
              <TableRow key={item.id_setor}>
                <TableCell>{item.id_setor}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{getDepartamento(item.departamento)}</TableCell>
                <TableCell>{getUnidade(item.departamento)}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" className={classes.margin}>
                    <EditIcon onClick={() => editItem(item.id_setor)} />
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon onClick={() => deleteItem(item.id_setor)} />
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
