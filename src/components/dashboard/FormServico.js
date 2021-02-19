import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import * as api from '../../api/serviceApi';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { dateFormat } from '../../helpers/formaters';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormServico({
  onSave,
  onSaveMatServ,
  listItems,
  listItemsMatServ,
  itemsServico,
  itemsMatServ,
  setNull,
  unidades,
  departamentos,
  setores,
  materiais,
  editItemMatServ,
}) {
  const classes = useStyles();
  const [idServico, setIdServico] = useState(null);
  const [idMatServ, setIdMatserv] = useState(null);
  const [numeroRs, setNumeroRs] = useState('');
  const [numeroOs, setNumeroOs] = useState('');
  const [abertura, setAbertura] = useState('');
  const [fechamento, setFechamento] = useState('');
  const [unidade, setUnidade] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [setor, setSetor] = useState('');
  const [obs, setObs] = useState('');
  const [custo, setCusto] = useState('');
  const [material, setMaterial] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [matServ, setMatServ] = useState([])
  const [newMatServ, setNewMatServ] = useState([]);
  const [serviceDisabled, setServiceDisabled] = useState(false);
  const [matServDisabled, setMatServDisabled] = useState(true);

  useEffect(() => {
    if (idServico) {
      setServiceDisabled(false);
      setMatServDisabled(false);
    } else {
      setServiceDisabled(false);
      setMatServDisabled(true);
    }
  }, [idServico]);

  useEffect(() => {
    if (listItemsMatServ) {
      setItemsMatServ(listItemsMatServ)
    }
  }, [listItemsMatServ, idServico])

  const setItemsMatServ = (data) => {
    const newData = data.filter(d => d.numero_rs === idServico).map(r => {
      const [mat] = materiais.filter((m) => m.id_material === r.material);
      return {
        id_mat_serv: r.id_mat_serv,
        numero_rs: idServico,
        material: mat.id_material,
        quantidade: r.quantidade,
        comentarios: r.comentarios,
        numero_item: mat.numero_item,
        descricao: mat.descricao,
      }
    })
    setMatServ(newData);
  }

  const setDataServico = (data) => {
    setIdServico(data.id_servico);
    setNumeroRs(data.numero_rs);
    setNumeroOs(data.numero_os);
    setAbertura(data.data_abertura);
    setFechamento(data.data_fechamento);
    setUnidade(data.unidade);
    setDepartamento(data.departamento);
    setSetor(data.setor);
    setObs(data.obs);
    setCusto(data.custo);
    // editMaterialList(data.reqs);
  };

  // const editMaterialList = (value) => {
  //   setNewMatServ([]);
  //   value.forEach((ms) => {
  //     const value = {
  //       id_mat_serv: ms.id_mat_serv,
  //       numero_rs: ms.numero_rs,
  //       material: ms.material,
  //       quantidade: ms.quantidade,
  //       comentarios: ms.comentarios,
  //       numero_item: ms.descricao.numero_item,
  //       descricao: ms.descricao.descricao,
  //     };
  //     setNewMatServ((prevState) => [...prevState, value]);
  //   });
  // };

  const setDataMatServ = (data) => {
    setIdMatserv(data.id_mat_serv);
    setNumeroRs(data.numero_rs);
    setMaterial(data.material);
    setQuantidade(data.quantidade);
    setComentarios(data.comentarios);
  };

  const clearData = () => {
    setIdServico(null);
    setIdMatserv(null);
    setNumeroRs('');
    setNumeroOs('');
    setAbertura('');
    setFechamento('');
    setUnidade('');
    setDepartamento('');
    setSetor('');
    setObs('');
    setCusto('');
    setMaterial('');
    setQuantidade('');
    setComentarios('');
    setNewMatServ([]);
    setNull();
  };

  useEffect(() => {
    if (itemsServico) {
      setDataServico(itemsServico);
    }
  }, [itemsServico]);

  useEffect(() => {
    if (itemsMatServ) {
      setDataMatServ(itemsMatServ);
    }
  }, [itemsMatServ]);

  const handleClearData = (event) => {
    event.preventDefault();
    clearData();
  };

  const handleButtonServico = async (event) => {
    event.preventDefault();
    const data = {
      numero_rs: numeroRs,
      numero_os: numeroOs,
      data_abertura: abertura,
      data_fechamento: fechamento,
      unidade: unidade,
      departamento: departamento,
      setor: setor,
      obs: obs,
    };
    if (idServico) {
      await api.EditServico(idServico, data);
      setMatServDisabled(false);
      clearData();
    } else {
      const res = await api.InsertServico(data);
      setIdServico(res);
    }
    onSave();
  };

  const handleButtonMatServ = async (event) => {
    event.preventDefault();
    const data = {
      numero_rs: idServico,
      material: material,
      quantidade: quantidade,
      comentarios: comentarios,
    };
    console.log(data)
    if (idMatServ) {
      await api.EditMatServ(idMatServ, data);
    } else {
      const res = await api.InsertMatServ(data);
      console.log(res)
    }
    onSave();
    onSaveMatServ();
    setIdMatserv(null);
    setMaterial('');
    setQuantidade('');
    setComentarios('');
  };

  const deleteMatServ = async (id, event) => {
    event.preventDefault();
    await api.DeleteMatServ(id);
    onSaveMatServ();
    onSave();
  };

  const date = (value) => {
    return new Date(value).toISOString();
  };

  return (
    <div>
      <h2>Adicionar Serviço {idServico && <span>({idServico})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Número RS"
            value={numeroRs}
            onInput={(e) => setNumeroRs(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Número OS"
            value={numeroOs}
            onInput={(e) => setNumeroOs(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Data de Abertura"
            type="date"
            value={
              abertura === '' || abertura === null ? '' : dateFormat(abertura)
            }
            onChange={(e) =>
              e.target.value === ''
                ? setAbertura(null)
                : setAbertura(date(e.target.value))
            }
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={abertura}
            // onInput={(e) => setAbertura(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Data de Fechamento"
            type="date"
            value={
              fechamento === '' || fechamento === null
                ? ''
                : dateFormat(fechamento)
            }
            onChange={(e) =>
              e.target.value === ''
                ? setFechamento(null)
                : setFechamento(date(e.target.value))
            }
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            // defaultValue={fechamento}
            // onInput={(e) => setFechamento(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            select
            disabled={serviceDisabled}
            label="Unidade"
            value={unidade ? unidade : ''}
            onChange={(e) => setUnidade(parseInt(e.target.value))}
          >
            {unidades.map((unidade) => (
              <MenuItem key={unidade.id_unidade} value={unidade.id_unidade}>
                {unidade.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            select
            disabled={serviceDisabled}
            label="Departamento"
            value={departamento ? departamento : ''}
            onChange={(e) => setDepartamento(parseInt(e.target.value))}
          >
            {departamentos
              .filter((departamento) => departamento.unidade === unidade)
              .map((departamento) => (
                <MenuItem
                  key={departamento.id_departamento}
                  value={departamento.id_departamento}
                >
                  {departamento.name}
                </MenuItem>
              ))}
          </TextField>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            select
            disabled={serviceDisabled}
            label="Setor"
            value={setor ? setor : ''}
            onChange={(e) =>
              e.target.value === ''
                ? setSetor(null)
                : setSetor(parseInt(e.target.value))
            }
          >
            {setores
              .filter((setor) => setor.departamento === departamento)
              .map((setor) => (
                <MenuItem key={setor.id_setor} value={setor.id_setor}>
                  {setor.name}
                </MenuItem>
              ))}
          </TextField>
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Observações"
            value={obs}
            onInput={(e) => setObs(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            disabled={serviceDisabled}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleButtonServico}
            className={classes.button}
          >
            Inserir
          </Button>
        </FormControl>
        <FormControl>
          <Button
            disabled={serviceDisabled}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={(e) => handleClearData(e)}
          >
            Limpar
          </Button>
        </FormControl>
      </form>
      <Divider />
      <h3>Materiais do Serviço {idMatServ && <span>({idMatServ})</span>}</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            disabled
            label=" "
            value={`ID: ${idServico} | RS: ${numeroRs}`}
            size="small"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            select
            disabled={matServDisabled}
            label="Material"
            value={material ? material : ''}
            onChange={(e) => setMaterial(parseInt(e.target.value))}
          >
            {materiais.map((material) => (
              <MenuItem key={material.id_material} value={material.id_material}>
                {material.descricao}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl>
          <TextField
            disabled={matServDisabled}
            label="Quantidade"
            value={quantidade}
            onInput={(e) => setQuantidade(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={matServDisabled}
            label="Comentários"
            value={comentarios}
            onInput={(e) => setComentarios(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            disabled={matServDisabled}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleButtonMatServ}
            className={classes.button}
          >
            Adicionar Material
          </Button>
        </FormControl>
        <FormControl>
          <Button
            disabled={matServDisabled}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => handleButtonServico(e)}
          >
            Salvar Alterações
          </Button>
        </FormControl>
        <FormControl>
          <Button
            disabled={matServDisabled}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={(e) => handleClearData(e)}
          >
            Limpar
          </Button>
        </FormControl>
      </form>
      <Divider />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Código</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Comentários</TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matServ.map((row) => (
              <TableRow key={row.id_mat_serv}>
                <TableCell align="center">{row.numero_item}</TableCell>
                <TableCell component="th" scope="row">
                  {row.descricao}
                </TableCell>
                <TableCell align="center">{row.quantidade}</TableCell>
                <TableCell align="center">{row.comentarios}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => editItemMatServ(row.id_mat_serv)}
                  >
                    <EditOutlinedIcon color="primary" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={(e) => deleteMatServ(row.id_mat_serv, e)}
                  >
                    <DeleteForeverOutlinedIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
