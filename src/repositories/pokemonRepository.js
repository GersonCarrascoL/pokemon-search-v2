import Repository from './Repository';

const resource = '/pokemon';

export default {
    getListPokemon() {
        return Repository.get(`${resource}`);
    },
    getPokemon(name) {
        return Repository.get(`${resource}/${name}`);
    },
};
