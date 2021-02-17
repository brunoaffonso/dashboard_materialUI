import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import * as api from '../../api/serviceApi';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { dateFormat } from '../../helpers/formaters';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormEstoque({ onSave, items, setNull, materiaisList }) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [material, setMaterial] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [desenho, setDesenho] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [responsavelRetirada, setResponsavelRetirada] = useState('');
  const [info, setInfo] = useState('');
  const [emEstoque, setEmEstoque] = useState(0);
  // const [booleanEmestoque, setBooleanEmEstoque] = useState(false);

  const setData = (data) => {
    setId(data.id_estoque);
    setMaterial(data.material);
    setFabricante(data.fabricante);
    setModelo(data.modelo);
    setNumeroSerie(data.numero_serie);
    setDesenho(data.desenho);
    setDataEntrada(data.data_entrada);
    setDataSaida(data.data_saida);
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
    setDataSaida('');
    setLocalizacao('');
    setResponsavelRetirada('');
    setInfo('');
    setEmEstoque(0);
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
      data_saida: dataSaida,
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

  const date = (value) => {
    return new Date(value).toISOString();
  };

  return (
    <div>
      <h2>Adicionar Estoque {id && <span>({id})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            select
            label="Material"
            value={material ? material : ''}
            onChange={(e) => setMaterial(e.target.value)}
          >
            {materiaisList.map((m) => (
              <MenuItem key={m.id_material} value={m.id_material}>
                {m.id_material} - {m.descricao}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl>
          <TextField
            label="Fabricante"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
            required
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
            type="date"
            value={
              dataEntrada === '' || dataEntrada === null
                ? ''
                : dateFormat(dataEntrada)
            }
            onChange={(e) =>
              e.target.value === ''
                ? setDataEntrada(null)
                : setDataEntrada(date(e.target.value))
            }
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Data de Saída"
            type="date"
            value={
              dataSaida === '' || dataSaida === null
                ? ''
                : dateFormat(dataSaida)
            }
            onChange={(e) =>
              e.target.value === ''
                ? setDataSaida(null)
                : setDataSaida(date(e.target.value))
            }
            InputLabelProps={{
              shrink: true,
            }}
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
        <FormControlLabel
          label="Em estoque?"
          control={
            <Checkbox
              checked={emEstoque === 0 ? false : true}
              onChange={() =>
                emEstoque === 0 ? setEmEstoque(1) : setEmEstoque(0)
              }
              name="checkedB"
              color="primary"
            />
          }
        />
        {/* <FormControl>
          <TextField
            label="Em estoque?"
            value={emEstoque}
            onChange={(e) => setEmEstoque(e.target.value)}
          />
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
