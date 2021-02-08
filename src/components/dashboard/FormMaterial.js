import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import * as api from '../../api/serviceApi';

export default function FormMaterial({ onSave, material, setNull }) {
  const [id, setId] = useState(null);
  const [numeroItem, setNumeroItem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidadeAnual, setQuantidadeAnual] = useState('');
  const [tipoUnidade, setTipoUnidade] = useState('');
  const [valor, setValor] = useState('');
  const [obs, setObs] = useState('');

  const setData = (data) => {
    setId(data.id_material);
    setNumeroItem(data.numero_item);
    setDescricao(data.descricao);
    setQuantidadeAnual(data.quantidade_ano);
    setTipoUnidade(data.tipo_unidade);
    setValor(data.valor);
    setObs(data.comentarios);
  };

  // if (material) {
  //   setData(material);
  // }

  const clearData = () => {
    setId(null);
    setNumeroItem('');
    setDescricao('');
    setQuantidadeAnual('');
    setTipoUnidade('');
    setValor('');
    setObs('');
    setNull();
  };

  useEffect(() => {
    if (material) {
      setData(material);
    }
  }, [material]);

  const handleClearData = (event) => {
    event.preventDefault();
    clearData();
  };

  const handleButton = async (event) => {
    event.preventDefault();
    const data = {
      numero_item: numeroItem,
      descricao: descricao,
      quantidade_ano: quantidadeAnual,
      tipo_unidade: tipoUnidade,
      valor: valor,
      comentarios: obs,
    };
    if (id) {
      await api.EditMaterial(id, data);
    } else {
      await api.InsertMaterial(data);
    }
    onSave();
    clearData();
  };
  return (
    <div>
      <h2>Adicionar Material {id && <span>({id})</span>}</h2>
      <form noValidate autoComplete="off">
        <FormControl>
          <TextField
            label="Número do Item"
            value={numeroItem}
            onChange={(e) => setNumeroItem(e.target.value)}
          />
          <TextField
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <TextField
            label="Quantidade Anual"
            value={quantidadeAnual}
            onChange={(e) => setQuantidadeAnual(e.target.value)}
          />
          <FormControl>
            <TextField
              select
              label="Tipo Unidade"
              value={tipoUnidade}
              onChange={(e) => setTipoUnidade(e.target.value)}
            >
              <MenuItem key={'u'} value={'u'}>
                Unidade
              </MenuItem>
              <MenuItem key={'m'} value={'m'}>
                Metro
              </MenuItem>
            </TextField>
          </FormControl>

          <TextField
            label="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <TextField
            label="Observações"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => handleButton(e)}
        >
          Enviar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secundary"
          onClick={(e) => handleClearData(e)}
        >
          Limpar
        </Button>
      </form>
    </div>
  );
}
