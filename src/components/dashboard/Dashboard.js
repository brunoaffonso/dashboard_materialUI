import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Chart from './Chart';
import Materiais from './Materiais';
import * as api from '../../api/serviceApi';
import FormMaterial from './FormMaterial';
import MainListItems from './MainListItems';
import SecundaryListItems from './SecundaryListItems';
import Unidades from './Unidades';
import FormUnidade from './FormUnidade';
import Departamentos from './Departamentos';
import FormDepartamento from './FormDepartamento';
import Setores from './Setores';
import FormSetor from './FormSetor';
import Title from './Title';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Contratos from './Contratos';
import FormContrato from './FormContrato';
import Vigencias from './Vigencias';
import FormVigencia from './FormVigencia';
import Estoques from './Estoques';
import FormEstoque from './FormEstoque';
import Servicos from './Servicos';
import FormServico from './FormServico';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Todos os direitos reservados © '}
      <Link color="inherit" href="https://www.fiocruz.br/">
        Fundação Oswaldo Cruz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const today = `${day}/${month}/${year}`;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const [menu, setMenu] = useState('dashboard');
  const [material, setMaterial] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [unidade, setUnidade] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState(null);
  const [departamento, setDepartamento] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [setor, setSetor] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState(null);
  const [contrato, setContrato] = useState([]);
  const [selectedContrato, setSelectedContrato] = useState(null);
  const [vigencia, setVigencia] = useState([]);
  const [selectedVigencia, setSelectedVigencia] = useState(null);
  const [estoque, setEstoque] = useState([]);
  const [selectedEstoque, setSelectedEstoque] = useState(null);
  const [servico, setServico] = useState([]);
  const [selectedServico, setSelectedServico] = useState(null);
  const [matServ, setMatServ] = useState([]);
  const [selectedMatServ, setSelectedMatServ] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [fullData, setFullData] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getMateriais = async () => {
    const mats = await api.Materiais();
    setMaterial(mats);
  };

  const getUnidades = async () => {
    const unidades = await api.Unidade();
    setUnidade(unidades);
  };

  const getDepartamentos = async () => {
    const departamentos = await api.Departamento();
    setDepartamento(departamentos);
  };

  const getSetores = async () => {
    const setores = await api.Setor();
    setSetor(setores);
  };

  const getContratos = async () => {
    const contratos = await api.Contrato();
    setContrato(contratos);
  };

  const getVigencias = async () => {
    const vigencias = await api.Vigencia();
    setVigencia(vigencias);
  };

  const getEstoques = async () => {
    const estoques = await api.Estoque();
    setEstoque(estoques);
  };

  const getServicos = async () => {
    const servicos = await api.GetServices();
    setServico(servicos);
  };

  const getMatServs = async () => {
    const matServs = await api.MatServ();
    setMatServ(matServs);
  };

  const getFullData = async () => {
    const fullData = await api.FullData();
    setMaterial(fullData.material);
    setUnidade(fullData.unidade);
    setDepartamento(fullData.departamento);
    setSetor(fullData.setor);
    setContrato(fullData.contrato);
    setVigencia(fullData.vigencia);
    setEstoque(fullData.estoque);
    setServico(fullData.fullServices);
    setMatServ(fullData.matServ);
    setFullData(fullData);
  };

  const showData = () => {
    console.log(unidade);
    console.log(material);
    console.log(departamento);
    console.log(setor);
    console.log(contrato);
    console.log(vigencia);
    console.log(estoque);
    console.log(servico);
    console.log(matServ);
    console.log(fullData);
  };

  const setNull = () => {
    setSelectedMaterial(null);
    setSelectedUnidade(null);
    setSelectedDepartamento(null);
    setSelectedSetor(null);
    setSelectedContrato(null);
    setSelectedVigencia(null);
    setSelectedEstoque(null);
    setSelectedServico(null);
    setSelectedMatServ(null);
  };

  const editMaterial = (mat) => {
    const [res] = material.filter(
      (m) => parseInt(m.id_material) === parseInt(mat)
    );
    setSelectedMaterial(res);
  };

  const editUnidade = (unid) => {
    const [res] = unidade.filter(
      (u) => parseInt(u.id_unidade) === parseInt(unid)
    );
    setSelectedUnidade(res);
  };

  const editDepartamento = (depto) => {
    const [res] = departamento.filter(
      (d) => parseInt(d.id_departamento) === parseInt(depto)
    );
    setSelectedDepartamento(res);
  };

  const editSetor = (set) => {
    const [res] = setor.filter((s) => parseInt(s.id_setor) === parseInt(set));
    setSelectedSetor(res);
  };

  const editContrato = (cont) => {
    const [res] = contrato.filter(
      (c) => parseInt(c.id_contrato) === parseInt(cont)
    );
    setSelectedContrato(res);
  };

  const editVigencia = (vig) => {
    const [res] = vigencia.filter(
      (v) => parseInt(v.id_vigencia) === parseInt(vig)
    );
    setSelectedVigencia(res);
  };

  const editEstoque = (est) => {
    const [res] = estoque.filter(
      (e) => parseInt(e.id_estoque) === parseInt(est)
    );
    setSelectedEstoque(res);
  };

  const editServico = (serv) => {
    const [res] = servico.filter(
      (s) => parseInt(s.id_servico) === parseInt(serv)
    );
    setSelectedServico(res);
  };

  const editMatServ = (ms) => {
    const [res] = matServ.filter(
      (m) => parseInt(m.id_mat_serv) === parseInt(ms)
    );
    setSelectedMatServ(res);
  };

  const setItem = (item) => {
    setMenu(item);
  };

  useEffect(() => {
    // getMateriais();
    // getUnidades();
    // getDepartamentos();
    // getSetores();
    // getContratos();
    // getVigencias();
    // getEstoques();
    // getServicos();
    // getMatServs();
    getFullData();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems setMenu={setItem} />
        </List>
        <Divider />
        <List>
          <SecundaryListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {menu === 'dashboard' && (
              <>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <FormControl>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={(e) => showData(e)}
                      >
                        Enviar
                      </Button>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Materiais Cadastrados</Title>
                    <Typography component="p" variant="h4">
                      {material.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {today}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('material')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Unidades Cadastrados</Title>
                    <Typography component="p" variant="h4">
                      {unidade.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('unidade')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Departamentos Cadastrados</Title>
                    <Typography component="p" variant="h4">
                      {departamento.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('departamento')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Setores Cadastrados</Title>
                    <Typography component="p" variant="h4">
                      {setor.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('setor')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Contratos Cadastrados</Title>
                    <Typography component="p" variant="h4">
                      {contrato.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('contrato')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Vigências</Title>
                    <Typography component="p" variant="h4">
                      {vigencia.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('vigencia')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Materiais em Estoque</Title>
                    <Typography component="p" variant="h4">
                      {estoque.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('estoque')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Title>Serviços Cadastrados</Title>
                    <Typography component="p" variant="h4">
                      {servico.length}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.depositContext}
                    >
                      {Date()}
                    </Typography>
                    <div>
                      <Link
                        color="primary"
                        href="#"
                        onClick={() => setMenu('servico')}
                      >
                        Detalhes
                      </Link>
                    </div>
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'material' && (
              <>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <Materiais
                      listItems={material}
                      onUpdate={getMateriais}
                      editItem={editMaterial}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <FormMaterial
                      onSave={getMateriais}
                      items={selectedMaterial}
                      setNull={setNull}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'unidade' && (
              <>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <Unidades
                      listItems={unidade}
                      onUpdate={getUnidades}
                      editItem={editUnidade}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <FormUnidade
                      onSave={getUnidades}
                      items={selectedUnidade}
                      setNull={setNull}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'departamento' && (
              <>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <Departamentos
                      listItems={departamento}
                      unidades={unidade}
                      onUpdate={getDepartamentos}
                      editItem={editDepartamento}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <FormDepartamento
                      onSave={getDepartamentos}
                      unidades={unidade}
                      items={selectedDepartamento}
                      setNull={setNull}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'setor' && (
              <>
                <Grid item xs={9}>
                  <Paper className={classes.paper}>
                    <Setores
                      listItems={setor}
                      unidades={unidade}
                      departamentos={departamento}
                      onUpdate={getSetores}
                      editItem={editSetor}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <FormSetor
                      onSave={getSetores}
                      unidades={unidade}
                      departamentos={departamento}
                      items={selectedSetor}
                      setNull={setNull}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'contrato' && (
              <>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <FormContrato
                      onSave={getContratos}
                      items={selectedContrato}
                      setNull={setNull}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Contratos
                      listItems={contrato}
                      onUpdate={getContratos}
                      editItem={editContrato}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'vigencia' && (
              <>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <FormVigencia
                      onSave={getVigencias}
                      items={selectedVigencia}
                      setNull={setNull}
                      contratos={contrato}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Vigencias
                      listItems={vigencia}
                      onUpdate={getVigencias}
                      editItem={editVigencia}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'estoque' && (
              <>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <FormEstoque
                      onSave={getEstoques}
                      items={selectedEstoque}
                      setNull={setNull}
                      materiaisList={material}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Estoques
                      listItems={estoque}
                      onUpdate={getEstoques}
                      editItem={editEstoque}
                    />
                  </Paper>
                </Grid>
              </>
            )}
            {menu === 'servico' && (
              <>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <FormServico
                      onSave={getServicos}
                      onSaveMatServ={getMatServs}
                      listItemsMatServ={matServ}
                      itemsServico={selectedServico}
                      itemsMatServ={selectedMatServ}
                      setNull={setNull}
                      unidades={unidade}
                      departamentos={departamento}
                      setores={setor}
                      materiais={material}
                      editItemMatServ={editMatServ}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Servicos
                      listItems={servico}
                      onUpdate={getServicos}
                      editItemServico={editServico}
                    />
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
