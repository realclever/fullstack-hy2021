import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const like = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const blogService = {
  getAll,
  setToken,
  create,
  like,
  remove,
};

export default blogService;
