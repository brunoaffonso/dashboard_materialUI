import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import IconButton from '@material-ui/core/IconButton';
import * as api from '../../api/serviceApi';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { dateFormatList, dateFormat } from '../../helpers/formaters';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const useRowStyles = makeStyles();

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Row(props) {
  const { row, onUpdate, editItemServico, editItemMatServ } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const deleteServico = async (id, event) => {
    event.preventDefault();
    const resp = await api.DeleteServico(id);
    onUpdate();
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.id_servico}</TableCell>
        <TableCell align="left">{row.unidadeName}</TableCell>
        <TableCell align="center">
          {dateFormatList(row.data_fechamento)}
        </TableCell>
        <TableCell align="center">{row.numero_rs}</TableCell>
        <TableCell align="center">{row.numero_os}</TableCell>
        <TableCell align="left">{row.custo}</TableCell>
        <TableCell align="left">
          <IconButton
            aria-label="edit"
            className={classes.margin}
            onClick={(e) => editItemServico(row.id_servico)}
          >
            <EditOutlinedIcon color="primary" />
          </IconButton>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={(e) => deleteServico(row.id_servico, e)}
          >
            <DeleteForeverOutlinedIcon color="secondary" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cód. Material</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="left">Comentários</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.reqs.map((matServ) => (
                    <TableRow key={matServ.id}>
                      <TableCell component="th" scope="row" align="center">
                        {matServ.descricao.numero_item}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {matServ.descricao.descricao}
                      </TableCell>
                      <TableCell align="center">{matServ.quantidade}</TableCell>
                      <TableCell align="left">
                        {matServ.comentarios ? matServ.comentarios : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Servicos({
  listItems,
  onUpdate,
  editItemServico,
  editItemMatServ,
}) {
  const deleteItem = async (id) => {
    await api.DeleteServico(id);
    onUpdate();
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Materiais</Title>
      <TableContainer component={Paper}>
        <Title>Relatório de Materiais Utilizados</Title>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">ID Serviço</TableCell>
              <TableCell align="left">Unidade</TableCell>
              <TableCell align="center">Data de Fechamento</TableCell>
              <TableCell align="center">RS</TableCell>
              <TableCell align="center">OS</TableCell>
              <TableCell align="left">Custo</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((row) => (
              <Row
                key={row.id_servico}
                row={row}
                onUpdate={onUpdate}
                editItemServico={editItemServico}
                editItemMatServ={editItemMatServ}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
