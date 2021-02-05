import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function FormMaterial() {
  const [numeroItem, setNumeroItem] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [quantidadeAnual, setQuantidadeAnual] = useState(null);
  const [tipoUnidade, setTipoUnidade] = useState(null);
  const [valor, setValor] = useState(null);
  const [obs, setObs] = useState(null);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleButton = (event) => {
    console.log(event);
  };
  return (
    <div>
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Adicionar Material</h2>
        <FormControl className={classes.formControl}>
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
          <TextField
            select
            label=" "
            value={tipoUnidade}
            onChange={(e) => setTipoUnidade(e.target.value)}
            helperText=" "
          >
            <MenuItem key={''} value={'u'}>
              Unidade
            </MenuItem>
            <MenuItem key={''} value={'m'}>
              Metro
            </MenuItem>
          </TextField>

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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onSubmit={(e) => handleButton(e)}
          >
            Enviar
          </Button>
        </FormControl>
        <form className={classes.root} noValidate autoComplete="off"></form>
      </div>
    </div>
  );
}
