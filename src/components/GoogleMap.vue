<template>
    <GoogleMap class="map"
        :center="center"
        :zoom="zoom"
        mapId="WHERE_MAP_ID"
    >
    <Marker v-if="lat" :options="markerOptions" />
    </GoogleMap>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';
import { defineProps } from 'vue';

const props = defineProps({ lat: Number, lng: Number })

const center = { lat: props.lat, lng: props.lng };
const zoom = 15;
const markerOptions =  { position: center };

</script>

<style scoped>

/* desktop */
@media only screen and (min-width: 992px) {
  .map {
    margin: auto;
    margin-top: 50px;
    width: 60%;
    height: 600px;
  }
}

/* mobile */
@media only screen and (max-width: 767px) {
  .map {
    margin: auto;
    margin-top: 25px;
    width: 80%;
    height: 300px;
  }
}

</style>
