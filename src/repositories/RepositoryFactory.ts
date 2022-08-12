import PokemonRepository from './pokemonRepository';

const repositories: PokemonRepositoryInterface = {
	pokemon: PokemonRepository,
};

export const RepositoryFactory = {
	get: (name: string) => repositories[name as keyof PokemonRepositoryInterface]
};

interface PokemonRepositoryInterface {
	pokemon: typeof PokemonRepository;
}