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
const apiDataUrl = `${ipBackend}/data/`;

export async function FullData() {
  const res = await axios.get(apiDataUrl);
  return res.data;
}

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
  return res.data;
}

export async function GetServico(id) {
  const res = await axios.get(`${apiServicoUrl}${id}`);
  return res.data;
}

export async function DeleteServico(id) {
  const matServ = await MatServ();
  const reqs = matServ
    .filter((m) => m.numero_rs === id)
    .forEach((s) => DeleteMatServ(s.id_mat_serv));
  const res = await axios.delete(`${apiServicoUrl}${id}`);
  return [res.data, reqs];
}

export async function InsertServico(value) {
  const response = await axios.post(apiServicoUrl, value);
  return response.data;
}

export async function InsertServico2(value) {
  const response = await axios.post(apiServicoUrl, value);
  const servicos = await GetServices();
  const [serv] = servicos
    .filter(
      (id) =>
        id.numero_rs === response.data.numero_rs &&
        id.data_fechamento === response.data.data_fechamento
    )
    .map((s) => {
      return {
        id: s.id_servico,
      };
    });
  const idServ = serv;
  console.log(idServ);
  return idServ.id_servico;
}

export async function EditServico(id, value) {
  const response = await axios.post(`${apiServicoUrl}${id}`, value);
  return response.data;
}

export async function MatServ() {
  const res = await axios.get(apiMatServUrl);
  return res.data;
}

export async function InsertMatServ(value) {
  const response = await axios.post(apiMatServUrl, value);
  return response.data;
}

export async function EditMatServ(id, value) {
  const response = await axios.post(`${apiMatServUrl}${id}`, value);
  return response.data;
}

export async function DeleteMatServ(id) {
  const res = await axios.delete(`${apiMatServUrl}/${id}`);
  return res.data;
}

export async function GetServices() {
  const res = await axios.get(`${apiServicoUrl}/data`);
  return res.data;
}

export async function GetServices2() {
  const unidades = await Unidade();
  const matServ = await MatServ();
  const serv = await Servico();
  const mats = await Materiais();
  const res = serv.map((s) => {
    const reqs = matServ
      .filter((m) => m.numero_rs === s.id_servico)
      .map((s) => {
        const [matDesc] = mats.filter(
          (material) => material.id_material === s.material
        );
        return {
          id_mat_serv: s.id_mat_serv,
          numero_rs: s.numero_rs,
          material: s.material,
          descricao: matDesc,
          quantidade: s.quantidade,
          comentarios: s.comentarios,
        };
      });
    const [unid] = unidades.filter((u) => u.id_unidade === s.unidade);
    return {
      id_servico: s.id_servico,
      numero_rs: s.numero_rs,
      numero_os: s.numero_os,
      data_abertura: s.data_abertura,
      data_fechamento: s.data_fechamento,
      unidade: unid.id_unidade,
      unidadeName: unid.name,
      departamento: s.departamento,
      setor: s.setor,
      obs: s.obs,
      custo: s.custo,
      reqs,
    };
  });
  return res;
}
