import PokemonRepository from './pokemonRepository';

interface PokemonRepository {
	pokemon: typeof PokemonRepository;
}
const repositories: PokemonRepository = {
	pokemon: PokemonRepository,
};

export const RepositoryFactory = {
	get: (name: string) => repositories[name as keyof PokemonRepository]
};
