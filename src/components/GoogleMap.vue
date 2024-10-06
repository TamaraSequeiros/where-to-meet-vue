<template>
    <GoogleMap
        :center="center"
        :zoom="zoom"
        mapId="WHERE_MAP_ID"
        style="width: 50%; height: 500px"
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



</style>
