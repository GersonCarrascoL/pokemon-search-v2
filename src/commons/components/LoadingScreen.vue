<template>
    <div :class="{ loader: true, fadeout: !isLoading }">
        <v-container fill-height>
            <v-row justify="center">
                <v-col cols="3" sm="2" md="2" lg="1" xl="1">
                    <v-img
                        class="rotating"
                        src="../../assets/images/loader.png"
                    ></v-img>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "LoadingScreen",
    props: ["isLoading"],
};
</script>

<style>
.loader {
    background-color: white;
    bottom: 0;
    color: white;
    display: block;
    font-size: 32px;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
    z-index: 1000;
}

@keyframes rotating {
    from {
        transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}
@-webkit-keyframes rotating {
    from {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}
.rotating {
    -webkit-animation: rotating 1s linear infinite;
    -moz-animation: rotating 1s linear infinite;
    -ms-animation: rotating 1s linear infinite;
    -o-animation: rotating 1s linear infinite;
    animation: rotating 1s linear infinite;
}

.fadeout {
    animation: fadeout 2s forwards;
}

@keyframes fadeout {
    to {
        opacity: 0;
        visibility: hidden;
    }
}
</style>