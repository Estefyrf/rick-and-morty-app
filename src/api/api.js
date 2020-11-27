import { getClient } from './client';

const getRangeForPage = (page) => {
	return Array.from({ length: 8 }, (_, i) => i + 1 + (page > 1 ? (page-1) * 8 : 0));
}

const client = getClient();
const rickAndMorty = { 
    getCharacters: async (page) => await client.get(`/character/${getRangeForPage(page)}`),
}
export default rickAndMorty;