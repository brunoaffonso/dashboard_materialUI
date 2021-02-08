import axios from 'axios';

const apiUnidadesUrl = 'http://127.0.0.1:3001/unidade/';
const apiDepartamentoUrl = 'http://127.0.0.1:3001/departamento/';
const apiSetorUrl = 'http://127.0.0.1:3001/core/setor/';
const apiContratoUrl = 'http://127.0.0.1:3001/contrato/';
const apiMateriaisUrl = 'http://127.0.0.1:3001/material/';
const apiEstoqueUrl = 'http://127.0.0.1:3001/estoque/';
const apiServicoUrl = 'http://127.0.0.1:3001/servico/';
const apiMatServUrl = 'http://127.0.0.1:3001/matserv/';

export async function Unidade() {
  const res = await axios.get(apiUnidadesUrl);
  // console.log(res.data);
  // const results = res.data.map((item) => {
  //   const { id, name } = item;
  //   return { id, name };
  // });
  return res.data;
}

export async function insertUnidade(value) {
  const response = await axios.post(apiUnidadesUrl, value);
  return response.data.id;
}

export async function Departamento() {
  const res = await axios.get(apiDepartamentoUrl);
  // console.log(res.data);
  // const results = res.data.map((item) => {
  //   const { id, name, unidade } = item;
  //   return { departamento: item.name };
  // });
  return res.data;
}

export async function Setor() {
  const res = await axios.get(apiSetorUrl);
  // console.log(res.data);
  return res.data;
}

export async function Contrato() {
  const res = await axios.get(apiContratoUrl);
  // console.log(res.data);
  return res.data;
}

export async function Materiais() {
  const res = await axios.get(apiMateriaisUrl);
  // const mats = res.data.map((mat) => {
  //   const { id_material, numero_item, descricao, quantidade_ano, valor, comentarios } = mat;
  //   return {
  //     id_material,
  //     numero_item,
  //     descricao,
  //     quantidade_ano,
  //     valor,
  //     comentarios
  //   };
  // });
  return res.data;
}

export async function InsertMaterial(value) {
  const response = await axios.post(apiMateriaisUrl, value);
  return response.data;
}

export async function DeleteMaterial(id) {
  const response = await axios.delete(`${apiMateriaisUrl}${id}`);
  return response.data;
}

export async function EditMaterial(id, value) {
  const response = await axios.post(`${apiMateriaisUrl}${id}`, value);
}

export async function Estoque() {
  const res = await axios.get(apiEstoqueUrl);
  // console.log(res.data);
  return res.data;
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
