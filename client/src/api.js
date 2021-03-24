import axios from 'axios'

const apiAxios = () => {
  return axios.create({
    baseURL: 'http://localhost:5000/api/movies'
  })
}

export const fetchMovies = async () => {
  try {
    const response = await apiAxios().get()
    return response.data
  } catch (err) {
    throw err
  }
}

export const fetchMovie = async (id) => {
  try {
    const response = await apiAxios().get(`/${id}`)
    return response.data
  } catch (err) {
    throw err
  }
}

export const editMovie = async (id, movie) => {
  try {
    const response = await apiAxios().put(`/${id}`, movie)
    return response.data
  } catch (err) {
    throw err
  }
}

export const deleteMovie = async (id) => {
  try {
    const response = await apiAxios().delete(`/${id}`)
    return response.data
  } catch (err) {
    throw err
  }
}

export const createMovie = async (movie) => {
  try {
    const response = await apiAxios().post('', movie)
    return response.data
  } catch (err) {
    throw err
  }
}