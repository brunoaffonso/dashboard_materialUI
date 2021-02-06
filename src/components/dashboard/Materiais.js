import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import AddMaterialModal from './AddMaterialModal';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as api from '../../api/serviceApi';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Materiais({ matarialList, onUpdate }) {
  const deleteMaterial = async (id) => {
    await api.DeleteMaterial(id);
    onUpdate();
  };
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
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matarialList.map((mat) => (
            <TableRow key={mat.id_material}>
              <TableCell>{mat.numero_item}</TableCell>
              <TableCell>{mat.descricao}</TableCell>
              <TableCell>{mat.quantidade_ano}</TableCell>
              <TableCell>{mat.valor}</TableCell>
              <TableCell>
                <IconButton aria-label="edit" className={classes.margin}>
                  <EditIcon onClick={(e) => console.log(mat.id_material)} />
                </IconButton>
                <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon
                    onClick={(e) => deleteMaterial(mat.id_material)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <AddMaterialModal onUpdate={onUpdate} />
      </div>
    </React.Fragment>
  );
}
