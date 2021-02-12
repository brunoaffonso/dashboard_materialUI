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

export default function FormDepartamentos({
  onSave,
  items,
  setNull,
  unidades,
}) {
  const classes = useStyles();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [unidade, setUnidade] = useState('');

  const setData = (data) => {
    setId(data.id_departamento);
    setName(data.name);
    setUnidade(data.unidade);
  };

  const clearData = () => {
    setId(null);
    setName('');
    setUnidade('');
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
      unidade: unidade,
    };
    if (id) {
      await api.EditDepartamento(id, data);
    } else {
      await api.InsertDepartamento(data);
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
            label="Unidade"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          >
            {unidades.map((u) => (
              <MenuItem key={u.id_unidade} value={u.id_unidade}>
                {u.name}
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
