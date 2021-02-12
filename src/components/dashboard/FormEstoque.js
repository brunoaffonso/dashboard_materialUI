import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import * as api from '../../api/serviceApi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormEstoque({ onSave, items, setNull }) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [material, setMaterial] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [desenho, setDesenho] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [responsavelRetirada, setResponsavelRetirada] = useState('');
  const [info, setInfo] = useState('');
  const [emEstoque, setEmEstoque] = useState('');

  const setData = (data) => {
    setId(data.id_estoque);
    setMaterial(data.material);
    setFabricante(data.fabricante);
    setModelo(data.modelo);
    setNumeroSerie(data.numero_serie);
    setDesenho(data.desenho);
    setDataEntrada(data.data_entrada);
    setLocalizacao(data.localizacao);
    setResponsavelRetirada(data.responsavel_retirada);
    setInfo(data.info);
    setEmEstoque(data.em_estoque);
  };

  // if (material) {
  //   setData(material);
  // }

  const clearData = () => {
    setId(null);
    setMaterial('');
    setFabricante('');
    setModelo('');
    setNumeroSerie('');
    setDesenho('');
    setDataEntrada('');
    setLocalizacao('');
    setResponsavelRetirada('');
    setInfo('');
    setEmEstoque('');
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
      material: material,
      fabricante: fabricante,
      modelo: modelo,
      numero_serie: numeroSerie,
      desenho: desenho,
      data_entrada: dataEntrada,
      localizacao: localizacao,
      responsavel_retirada: responsavelRetirada,
      info: info,
      em_estoque: emEstoque,
    };
    if (id) {
      await api.EditEstoque(id, data);
    } else {
      await api.InsertEstoque(data);
    }
    onSave();
    clearData();
  };
  return (
    <div>
      <h2>Adicionar Estoque {id && <span>({id})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            label="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Fabricante"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Número de Série"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Desenho da Placa"
            value={desenho}
            onChange={(e) => setDesenho(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Data de Entrada"
            value={dataEntrada}
            onChange={(e) => setDataEntrada(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Localização do Material"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Responsável Retirada"
            value={responsavelRetirada}
            onChange={(e) => setResponsavelRetirada(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Informações"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Em estoque?"
            value={emEstoque}
            onChange={(e) => setEmEstoque(e.target.value)}
          />
        </FormControl>
        {/* <FormControl>
          <TextField
            select
            label="Número de Série"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
          >
            <MenuItem key={'u'} value={'u'}>
              Unidade
            </MenuItem>
            <MenuItem key={'m'} value={'m'}>
              Metro
            </MenuItem>
          </TextField>
        </FormControl> */}
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
      </form>
    </div>
  );
}
