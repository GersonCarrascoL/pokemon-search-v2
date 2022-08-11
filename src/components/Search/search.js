import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const PokemonRepository = RepositoryFactory.get("pokemon");

import LoadingScreen from "../../commons/components/LoadingScreen.vue";
import PokemonEmptyList from "./commons/components/PokemonEmptyList/PokemonEmptyList.vue";
import PokemonDetail from "./commons/components/PokemonDetail/PokemonDetail.vue";

export default {
    data: () => ({
        inputSearch: "",
        isLoading: true,
        alertSuccess: false,
        alertError: false,
        successMessage: "",
        errorMessage: "",
        pokemonList: [],
        showPokemonDetail: false,
        objectPassModal: null,
        btnSelectBottom: "all",
    }),
    components: {
        LoadingScreen,
        PokemonEmptyList,
        PokemonDetail,
    },
    beforeMount() {
        this.getListPokemon();
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    },
    methods: {
        async showPokemonDetailModal(item) {
            let { data } = await PokemonRepository.getPokemon(item.name);
            data["nameUpper"] =
                data.name.charAt(0).toUpperCase() + data.name.slice(1);

            data.types.forEach((type, index) => {
                data["typesList"] = "";
                index + 1 == data.types.length
                    ? (data["typesList"] += type.type.name + "")
                    : (data["typesList"] += type.type.name + ",");
            });
            data["favorite"] = item.favorite;
            this.objectPassModal = data;
            this.showPokemonDetail = true;
        },
        getFavorites() {
            var favorites = this.pokemonList.filter(
                (pokemon) => pokemon.favorite == true
            );
            this.pokemonList = favorites;
        },
        changeFavorite: function (pokemon) {
            pokemon.favorite = !pokemon.favorite;
            let favorites = JSON.parse(
                localStorage.getItem("favorites") || "[]"
            );
            if (pokemon.favorite) {
                if (favorites) {
                    favorites.push({
                        name: pokemon.name,
                    });
                }
            } else {
                favorites.forEach((pokemonFav, index, object) => {
                    if (pokemonFav.name == pokemon.name) {
                        object.splice(index, 1);
                    }
                });
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
            this.$forceUpdate();
        },
        onClearClicked() {
            this.getListPokemon();
        },
        changeSelected(value) {
            this.btnSelectBottom = value;
            this.inputSearch = "";
            switch (value) {
                case "fav":
                    this.getFavorites();
                    break;
                case "all":
                    this.getListPokemon();
                    break;
            }
        },
        async getListPokemon() {
            try {
                let { data } = await PokemonRepository.getListPokemon();
                if (data != undefined) {
                    this.successMessage = "Successfull search!.";
                    this.pokemonList = data.results;

                    let favorites = JSON.parse(
                        localStorage.getItem("favorites") || "[]"
                    );
                    this.pokemonList.forEach((pokemon) => {
                        let find = favorites.find(
                            (pokemonFav) => pokemonFav.name == pokemon.name
                        );
                        find
                            ? (pokemon["favorite"] = true)
                            : (pokemon["favorite"] = false);

                        pokemon["nameUpper"] =
                            pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1);
                    });
                } else {
                    this.successMessage = "Nothing found";
                    this.pokemonList = [];
                }
            } catch (error) {
                this.isLoading = false;
                this.alertSuccess = false;
                this.alertError = true;
                this.errorMessage = error;
                setTimeout(() => {
                    this.alertError = false;
                }, 2000);
            }
        },
        async onSearchPokemon() {
            try {
                this.isLoading = true;

                let data = await PokemonRepository.getPokemon(
                    this.inputSearch.toLowerCase().trim()
                );
                this.isLoading = false;
                this.alertSuccess = true;
                this.alertError = false;
                if (data != undefined) {
                    this.successMessage = "Successfull search!.";
                    this.pokemonList = [
                        {
                            name: data.data.name,
                            nameUpper:
                                data.data.name.charAt(0).toUpperCase() +
                                data.data.name.slice(1),
                        },
                    ];
                } else {
                    this.successMessage = "Nothing found";
                    this.pokemonList = [];
                }
                setTimeout(() => {
                    this.alertSuccess = false;
                }, 2000);
            } catch (error) {
                this.pokemonList = [];
                this.isLoading = false;
                this.alertSuccess = false;
                this.alertError = true;
                this.errorMessage = error;
                setTimeout(() => {
                    this.alertError = false;
                }, 5000);
            }
        },
    },
};