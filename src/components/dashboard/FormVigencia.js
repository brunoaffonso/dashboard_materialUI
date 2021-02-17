import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
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

export default function FormVigencia({ onSave, items, setNull, contratos }) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [contrato, setContrato] = useState('');
  const [renovacao, setRenovacao] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [bdi, setBdi] = useState('');
  const [descricao, setDescricao] = useState('');

  const setData = (data) => {
    setId(data.id_vigencia);
    setContrato(data.contrato);
    setRenovacao(data.renovacao);
    setInicio(data.inicio);
    setFim(data.fim);
    setBdi(data.bdi);
    setDescricao(data.descricao);
  };

  // if (material) {
  //   setData(material);
  // }

  const clearData = () => {
    setId(null);
    setContrato('');
    setRenovacao('');
    setInicio('');
    setFim('');
    setBdi('');
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
      contrato: contrato,
      renovacao: renovacao,
      inicio: inicio,
      fim: fim,
      bdi: bdi,
      descricao: descricao,
    };
    if (id) {
      await api.EditVigencia(id, data);
    } else {
      await api.InsertVigencia(data);
    }
    onSave();
    clearData();
  };

  const date = (value) => {
    return new Date(value).toISOString();
  };

  return (
    <div>
      <h2>Adicionar Vigencia {id && <span>({id})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            select
            label="Contrato"
            value={contrato ? contrato : ''}
            onChange={(e) => setContrato(e.target.value)}
          >
            {contratos.map((c) => (
              <MenuItem key={c.id_contrato} value={c.id_contrato}>
                {c.numero} - {c.descricao}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl>
          <TextField
            select
            label="Renovação"
            value={renovacao}
            onChange={(e) => setRenovacao(e.target.value)}
          >
            <MenuItem key={'1'} value={'1'}>
              Primeiro ano
            </MenuItem>
            <MenuItem key={'2'} value={'2'}>
              1 Renovação
            </MenuItem>
            <MenuItem key={'3'} value={'3'}>
              2 Renovação
            </MenuItem>
            <MenuItem key={'4'} value={'4'}>
              3 Renovação
            </MenuItem>
            <MenuItem key={'5'} value={'5'}>
              4 Renovação
            </MenuItem>
          </TextField>
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
            label="Fim"
            type="date"
            value={fim === '' || fim === null ? '' : dateFormat(fim)}
            onChange={(e) =>
              e.target.value === ''
                ? setFim(null)
                : setFim(date(e.target.value))
            }
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </FormControl>
        <FormControl>
          <TextField
            label="BDI"
            value={bdi}
            onChange={(e) => setBdi(e.target.value)}
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
