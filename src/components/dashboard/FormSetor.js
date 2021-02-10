import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import * as api from '../../api/serviceApi';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormSetor({
  onSave,
  items,
  setNull,
  departamentos,
  unidades,
}) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [departamento, setDepartamento] = useState('');

  const setData = (data) => {
    setId(data.id_setor);
    setName(data.name);
    setDepartamento(data.departamento);
  };

  const getUnidade = (id) => {
    const [res] = departamentos.filter((d) => d.id_departamento === id);
    const [unidade] = unidades.filter((u) => u.id_unidade === res.unidade);
    return unidade.name;
  };

  const clearData = () => {
    setId(null);
    setName('');
    setDepartamento('');
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
      name: name,
      departamento: departamento,
    };
    if (id) {
      await api.EditSetor(id, data);
    } else {
      await api.insertSetor(data);
    }
    onSave();
    clearData();
  };
  return (
    <div>
      <h2>Adicionar Depto. {id && <span>({id})</span>}</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            select
            label="Departamento"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          >
            {departamentos.map((d) => (
              <MenuItem key={d.id_departamento} value={d.id_departamento}>
                {d.name} - {getUnidade(d.id_departamento)}
              </MenuItem>
            ))}
          </TextField>
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
