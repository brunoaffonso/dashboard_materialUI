import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import * as api from '../../api/serviceApi';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
  items,
  setNull,
  unidades,
  departamentos,
  setores,
  materiais,
}) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [numeroRs, setNumeroRs] = useState('');
  const [numeroOs, setNumeroOs] = useState('');
  const [abertura, setAbertura] = useState('');
  const [fechamento, setFechamento] = useState('');
  const [unidade, setUnidade] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [setor, setSetor] = useState('');
  const [obs, setObs] = useState('');
  const [custo, setCusto] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState('');
  const [selectedDepto, setSelectedDepto] = useState('');
  const [selectedSetor, setSelectedSetor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedQuantidade, setSelectedQuantidade] = useState('');
  const [selectedObs, setSelectedObs] = useState('');
  const [newService, setNewService] = useState('');
  const [newMatServ, setNewMatServ] = useState([]);
  const [serviceDisabled, setServiceDisabled] = useState(false);
  const [matServDisabled, setMatServDisabled] = useState(true);

  useEffect(() => {
    if (newService) {
      setServiceDisabled((prevState) => !prevState);
      setMatServDisabled((prevState) => !prevState);
    }
  }, [newService]);

  const setData = (data) => {
    setId(data.id_servico);
    setNumeroRs(data.numero_rs);
    setNumeroOs(data.numero_os);
    setAbertura(data.data_abertura);
    setFechamento(data.data_fechamento);
    setUnidade(data.unidade);
    setDepartamento(data.departamento);
    setSetor(data.setor);
    setObs(data.obs);
    setCusto(data.custo);
  };

  // if (material) {
  //   setData(material);
  // }

  const clearData = () => {
    setId(null);
    setNumeroRs('');
    setNumeroOs('');
    setAbertura('');
    setFechamento('');
    setUnidade('');
    setDepartamento('');
    setSetor('');
    setObs('');
    setCusto('');
    setNull();
  };

  useEffect(() => {
    if (items) {
      setData(items);
    }
  }, [items]);

  const handleClearData = (event) => {
    event.preventDefault();
    clearData();
  };

  const handleButton = async (event) => {
    event.preventDefault();
    const data = {
      numeroRs: numeroRs,
      numeroOs: numeroOs,
      abertura: abertura,
      fechamento: fechamento,
      unidade: unidade,
      departamento: departamento,
      setor: setor,
      obs: obs,
      custo: custo,
    };
    if (id) {
      await api.EditServico(id, data);
    } else {
      await api.InsertServico(data);
    }
    onSave();
    clearData();
  };

  const handleButtonServico = async (event) => {
    event.preventDefault();
    const value = {
      numero_rs: numeroRs,
      numero_os: numeroOs,
      data_abertura: abertura,
      data_fechamento: fechamento,
      unidade: selectedUnidade,
      departamento: selectedDepto,
      setor: selectedSetor,
      obs: obs,
    };
    const resp = async (value) => {
      const res = await api.InsertServico(value);
      setNewService(res);
    };
    await resp(value);
  };

  const handleButtonTempService = (event) => {
    event.preventDefault();
    const mat = materiais.filter((m) => m.id === selectedMaterial);
    const value = {
      numero_rs: newService,
      material: mat[0].id_material,
      quantidade: selectedQuantidade,
      comentarios: selectedObs,
      numero_item: mat[0].numero_item,
      descricao: mat[0].descricao,
    };
    setNewMatServ((prevState) => [...prevState, value]);
    setSelectedMaterial('');
    setSelectedQuantidade('');
    setSelectedObs('');
  };

  const saveMatServs = async (event) => {
    event.preventDefault();
    newMatServ.forEach((ms) => {
      const value = {
        numero_rs: ms.numero_rs,
        material: ms.material,
        quantidade: ms.quantidade,
        comentarios: ms.comentarios,
      };
      api.InsertMatServ(value);
    });
    setNumeroRs('');
    setNumeroOs('');
    setAbertura('');
    setFechamento('');
    setSelectedUnidade('');
    setSelectedDepto('');
    setSelectedSetor('');
    setObs('');
    setSelectedMaterial('');
    setSelectedQuantidade('');
    setSelectedObs('');
    setNewService('');
    setNewMatServ([]);
    setServiceDisabled((prevState) => !prevState);
    setMatServDisabled((prevState) => !prevState);
  };

  return (
    <div>
      <h2>Adicionar Serviço {id && <span>({id})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Número RS"
            value={numeroRs}
            onInput={(e) => setNumeroRs(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Número OS"
            value={numeroOs}
            onInput={(e) => setNumeroOs(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Data de Abertura"
            type="date"
            defaultValue={abertura}
            className={classes.textField}
            onInput={(e) => setAbertura(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={serviceDisabled}
            label="Data de Fechamento"
            type="date"
            defaultValue={fechamento}
            className={classes.textField}
            onInput={(e) => setFechamento(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Unidade</InputLabel>
          <Select
            disabled={serviceDisabled}
            native
            onChange={(e) => setSelectedUnidade(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {unidades.map((unidade) => (
              <option key={unidade.id_unidade} value={unidade.id_unidade}>
                {unidade.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Departamento</InputLabel>
          <Select
            disabled={serviceDisabled}
            native
            onChange={(e) => setSelectedDepto(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {departamentos
              .filter(
                (departamento) => departamento.unidade === selectedUnidade
              )
              .map((departamento) => (
                <option
                  key={departamento.id_departamento}
                  value={departamento.id_departamento}
                >
                  {departamento.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Setor</InputLabel>
          <Select
            disabled={serviceDisabled}
            native
            onChange={(e) => setSelectedSetor(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {setores
              .filter((setor) => setor.departamento === selectedDepto)
              .map((setor) => (
                <option key={setor.id_setor} value={setor.id_setor}>
                  {setor.name}
                </option>
              ))}
          </Select>
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
      </form>
      <Divider />
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            disabled
            label=" "
            value={`ID: ${newService} | RS: ${numeroRs}`}
            size="small"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Material</InputLabel>
          <Select
            disabled={matServDisabled}
            native
            onChange={(e) => setSelectedMaterial(parseInt(e.target.value))}
          >
            <option aria-label="None" value="" />
            {materiais.map((material) => (
              <option key={material.id_material} value={material.id_material}>
                {material.numero_item} - {material.descricao}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            disabled={matServDisabled}
            label="Quantidade"
            value={selectedQuantidade}
            onInput={(e) => setSelectedQuantidade(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            disabled={matServDisabled}
            label="Comentários"
            value={selectedObs}
            onInput={(e) => setSelectedObs(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            disabled={matServDisabled}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleButtonTempService}
            className={classes.button}
          >
            Inserir
          </Button>
        </FormControl>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Código</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Comentários</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newMatServ.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.numero_item}</TableCell>
                <TableCell component="th" scope="row">
                  {row.descricao}
                </TableCell>
                <TableCell align="center">{row.quantidade}</TableCell>
                <TableCell align="center">{row.comentarios}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => handleButton(e)}
          >
            Enviar
          </Button>
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={(e) => handleClearData(e)}
          >
            Limpar
          </Button>
        </FormControl>
      </TableContainer>
    </div>
  );
}
