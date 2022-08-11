import PokemonRepository from './pokemonRepository';

interface IPokemonRepository {
	pokemon: typeof PokemonRepository
}
const repositories: IPokemonRepository = {
	pokemon: PokemonRepository,
};

export const RepositoryFactory = {
	get: (name: string) => repositories[name as keyof IPokemonRepository]
};
