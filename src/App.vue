<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
html,
body {
    font-family: "Lato", sans-serif;
}

#app {
    font-family: "Lato", sans-serif;
}
* {
    text-transform: none !important;
}
</style>

<script>
export default {
    name: "App",
    data: () => ({
        //
    }),
};
</script>
