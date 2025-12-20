import axios from 'axios'
const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(BASE_URL)
    .then(response => response.data)
}

const create = contact => {
  return axios
    .post(BASE_URL, contact)
    .then(response => response.data)
}

const update = (id, contact) => {
  return axios
    .put(`${BASE_URL}/${id}`, contact)
    .then(response => response.data)
}

const del = id => {
  console.log(`received request to delete id ${id}`)
  return axios
    .delete(`${BASE_URL}/${id}`)
    .then(response => response.data)
}

export default { getAll, create, update, del }