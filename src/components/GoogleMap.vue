<template>
    <GoogleMap
    :api-key="api_key"
    style="width: 50%; height: 500px"
    :center="center"
    :zoom="zoom"
    >
        <Marker v-if="lat" :options="markerOptions" />
    </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map';
import { defineProps } from 'vue';

const props = defineProps({ lat: Number, lng: Number })

const center = { lat: parseFloat(props.lat), lng: parseFloat(props.lng) };
const zoom = 15;
const markerOptions =  { position: center };

</script>

<style scoped>



</style>
