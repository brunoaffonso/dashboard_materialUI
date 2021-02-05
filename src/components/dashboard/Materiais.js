import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import AddMaterialModal from './AddMaterialModal';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Materiais({ matarialList }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Materiais</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>N. Item</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Quantidade Anual</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matarialList.map((mat) => (
            <TableRow key={mat.id_material}>
              <TableCell>{mat.numero_item}</TableCell>
              <TableCell>{mat.descricao}</TableCell>
              <TableCell>{mat.quantidade_ano}</TableCell>
              <TableCell>{mat.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <AddMaterialModal />
      </div>
    </React.Fragment>
  );
}
