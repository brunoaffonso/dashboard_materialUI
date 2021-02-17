import axios from 'axios';
import { ipBackend } from '../ipBackend';

const apiUnidadesUrl = `${ipBackend}/unidade/`;
const apiDepartamentoUrl = `${ipBackend}/departamento/`;
const apiSetorUrl = `${ipBackend}/setor/`;
const apiContratoUrl = `${ipBackend}/contrato/`;
const apiVigenciaUrl = `${ipBackend}/vigencia/`;
const apiMateriaisUrl = `${ipBackend}/material/`;
const apiEstoqueUrl = `${ipBackend}/estoque/`;
const apiServicoUrl = `${ipBackend}/servico/`;
const apiMatServUrl = `${ipBackend}/matserv/`;

export async function Unidade() {
  const res = await axios.get(apiUnidadesUrl);
  return res.data;
}

export async function InsertUnidade(value) {
  const response = await axios.post(apiUnidadesUrl, value);
  return response.data.id;
}

export async function EditUnidade(id, value) {
  const response = await axios.post(`${apiUnidadesUrl}${id}`, value);
  return response.data;
}

export async function DeleteUnidade(id) {
  const response = await axios.delete(`${apiUnidadesUrl}${id}`);
  return response.data;
}

export async function Departamento() {
  const res = await axios.get(apiDepartamentoUrl);
  return res.data;
}

export async function InsertDepartamento(value) {
  const response = await axios.post(apiDepartamentoUrl, value);
  return response.data.id;
}

export async function EditDepartamento(id, value) {
  const response = await axios.post(`${apiDepartamentoUrl}${id}`, value);
  return response.data;
}

export async function DeleteDepartamento(id) {
  const response = await axios.delete(`${apiDepartamentoUrl}${id}`);
  return response.data;
}

export async function Setor() {
  const res = await axios.get(apiSetorUrl);
  // console.log(res.data);
  return res.data;
}

export async function InsertSetor(value) {
  const response = await axios.post(apiSetorUrl, value);
  return response.data.id;
}

export async function EditSetor(id, value) {
  const response = await axios.post(`${apiSetorUrl}${id}`, value);
  return response.data;
}

export async function DeleteSetor(id) {
  const response = await axios.delete(`${apiSetorUrl}${id}`);
  return response.data;
}

export async function Contrato() {
  const res = await axios.get(apiContratoUrl);
  // console.log(res.data);
  return res.data;
}

export async function InsertContrato(value) {
  const response = await axios.post(apiContratoUrl, value);
  return response.data.id;
}

export async function EditContrato(id, value) {
  const response = await axios.post(`${apiContratoUrl}${id}`, value);
  return response.data;
}

export async function DeleteContrato(id) {
  const response = await axios.delete(`${apiContratoUrl}${id}`);
  return response.data;
}

export async function Vigencia() {
  const res = await axios.get(apiVigenciaUrl);
  return res.data;
}

export async function InsertVigencia(value) {
  const response = await axios.post(apiVigenciaUrl, value);
  return response.data.id;
}

export async function EditVigencia(id, value) {
  const response = await axios.post(`${apiVigenciaUrl}${id}`, value);
  return response.data;
}

export async function DeleteVigencia(id) {
  const response = await axios.delete(`${apiVigenciaUrl}${id}`);
  return response.data;
}

export async function Materiais() {
  const res = await axios.get(apiMateriaisUrl);
  return res.data;
}

export async function InsertMaterial(value) {
  const response = await axios.post(apiMateriaisUrl, value);
  return response.data;
}

export async function EditMaterial(id, value) {
  const response = await axios.post(`${apiMateriaisUrl}${id}`, value);
  return response.data;
}

export async function DeleteMaterial(id) {
  const response = await axios.delete(`${apiMateriaisUrl}${id}`);
  return response.data;
}

export async function Estoque() {
  const res = await axios.get(apiEstoqueUrl);
  // console.log(res.data);
  return res.data;
}

export async function InsertEstoque(value) {
  const response = await axios.post(apiEstoqueUrl, value);
  return response.data.id;
}

export async function EditEstoque(id, value) {
  const response = await axios.post(`${apiEstoqueUrl}${id}`, value);
  return response.data;
}

export async function DeleteEstoque(id) {
  const response = await axios.delete(`${apiEstoqueUrl}${id}`);
  return response.data;
}

export async function Servico() {
  const res = await axios.get(apiServicoUrl);
  // console.log(res.data);
  return res.data;
}

export async function getServico(id) {
  const res = await axios.get(`${apiServicoUrl}${id}`);
  return res.data;
}

export async function deleteServico(id) {
  const res = await axios.delete(`${apiServicoUrl}${id}`);
  const matServ = await MatServ();
  const reqs = matServ
    .filter((m) => m.numero_rs === id)
    .forEach((s) => deleteMatServ(s.id));
  return [res.data, reqs.data];
}

export async function deleteServico2(id) {
  axios.defaults.baseURL = 'http://127.0.0.1:8000/';

  const header = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('JWTAccess'),
    },
  };
  const payload = {
    testValue: 'Hello API',
  };

  axios
    .delete(`servico/${id}`, payload, header)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  // const res = await axios.delete(`${apiServicoUrl}${id}`);
  return null;
}

export async function insertServico(value) {
  const response = await axios.post(apiServicoUrl, value);
  return response.data;
}

export async function insertServico2(value) {
  const response = await axios.post(apiServicoUrl, value);
  const servicos = await getServices();
  const serv = servicos
    .filter(
      (id) =>
        id.numero_rs === response.data.numero_rs &&
        id.data_fechamento === response.data.data_fechamento
    )
    .map((s) => {
      return {
        id: s.id,
      };
    });
  const idServ = serv[0];
  return idServ.id;
}

export async function MatServ() {
  const res = await axios.get(apiMatServUrl);
  // console.log(res.data);
  return res.data;
}

export async function insertMatServ(value) {
  const response = await axios.post(apiMatServUrl, value);
  return response.data;
}

export async function deleteMatServ(id) {
  const res = await axios.delete(`${apiMatServUrl}/${id}`);
  return res.data;
}

// export async function insertMatServ(value) {
//   const response = await axios.post(apiMatServUrl, value);
//   return response.data.id;
// }

export async function getServices() {
  const unidades = await Unidade();
  const matServ = await MatServ();
  const serv = await Servico();
  const mats = await Materiais();
  const res = serv.map((s) => {
    const reqs = matServ
      .filter((m) => m.numero_rs === s.id)
      .map((s) => {
        const matDesc = mats.filter((material) => material.id === s.material);
        return {
          id: s.id,
          numero_rs: s.numero_rs,
          material: s.material,
          descricao: matDesc[0],
          quantidade: s.quantidade,
          comentarios: s.comentarios,
        };
      });
    const unid = unidades.filter((u) => u.id === s.unidade);
    return {
      id: s.id,
      numero_rs: s.numero_rs,
      numero_os: s.numero_os,
      data_abertura: s.data_abertura,
      data_fechamento: s.data_fechamento,
      unidade: unid[0],
      departamento: s.departamento,
      setor: s.setor,
      obs: s.obs,
      custo: s.custo,
      reqs,
    };
  });
  return res;
}
