import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import * as api from '../../api/serviceApi';
import { makeStyles } from '@material-ui/core/styles';
import { dateFormat } from '../../helpers/formaters';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormContrato({ onSave, items, setNull }) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [numero, setNumero] = useState('');
  const [inicio, setInicio] = useState('');
  const [processo, setProcesso] = useState('');
  const [descricao, setDescricao] = useState('');

  const setData = (data) => {
    setId(data.id_contrato);
    setNumero(data.numero);
    setInicio(data.inicio);
    setProcesso(data.processo);
    setDescricao(data.descricao);
  };

  // if (material) {
  //   setData(material);
  // }

  const clearData = () => {
    setId(null);
    setNumero('');
    setInicio('');
    setProcesso('');
    setDescricao('');
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
      numero: numero,
      inicio: dateFormat(inicio),
      processo: processo,
      descricao: descricao,
    };
    if (id) {
      await api.EditContrato(id, data);
    } else {
      await api.InsertContrato(data);
    }
    onSave();
    clearData();
  };

  const date = (value) => {
    return new Date(value).toISOString();
  };

  return (
    <div>
      <h2>Adicionar Contrato {id && <span>({id})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            label="Número do Contrato"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Inicio"
            type="date"
            value={inicio === '' || inicio === null ? '' : dateFormat(inicio)}
            onChange={(e) =>
              e.target.value === ''
                ? setInicio(null)
                : setInicio(date(e.target.value))
            }
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Processo"
            value={processo}
            onChange={(e) => setProcesso(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </FormControl>
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
