import axios from 'axios'
const BASE_URL = 'http://localhost:3001/notes'

const getAll = () => {
	const nonExistingNote = {
		id: 10000,
		content: 'This note is not saved to the server',
		important: true
	}

  return axios
		.get(BASE_URL)
		.then(response => response.data.concat(nonExistingNote))
}

const create = newObject => {
  return axios
		.post(BASE_URL, newObject)
		.then(response => response.data)
}

const update = (id, newObject) => {
	return axios
		.put(`${BASE_URL}/${id}`, newObject)
		.then(response => response.data)
}

export default { getAll, create, update }