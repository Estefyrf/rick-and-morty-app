import { getClient } from './client';

const client = getClient();
const rickAndMorty = { 
    getCharacters: async (nextPage) => await client.get(`/character/?page=${nextPage}`),
}
export default rickAndMorty;