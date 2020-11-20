import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';
const config = {}

export const getClient = () => axios.create({ baseURL, ...config });
