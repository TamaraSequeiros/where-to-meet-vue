<template>
  <h2>Let's find the middle!</h2>
  <AddressInput @coords="displayMap"/>
  <GoogleMaps v-if=middle :lat="middle.lat" :lng="middle.lng"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Coordinate } from './types/MapTypes.ts';
import GoogleMaps from './components/GoogleMap.vue';
import AddressInput from './components/AddressInput.vue';

const middle = ref<Coordinate>()

function displayMap(coord: Coordinate) {
  middle.value = coord;
}

</script>

<style>
/* desktop */
@media only screen and (min-width: 992px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
}

/* mobile */
@media only screen and (max-width: 767px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
}

.autocomplete {
  width:200px;
}

.results {
  margin-top: 30px;
  display: inline-block;
  text-align: left;
}
</style>


