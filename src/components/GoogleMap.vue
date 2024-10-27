<template>
    <GMapMap class="map" mapId="WHERE_MAP_ID" :center="center" :zoom="zoom" :options="{
        controlSize: 28,
        zoomControl: true,
        mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false
        }">
        <GMapMarker v-for="place in nearbyVenues" :options="place.options"
            @click="openMarker(place.venueInfo?.displayName)">
            <GMapInfoWindow @closeclick="openMarker(null)" :opened="openedMarkerID === place.venueInfo?.displayName"
                :options="{
                    maxWidth: 320,
                    maxHeight: 320,
                    headerDisabled: true
                }">
                <h2>{{ place.venueInfo?.displayName }}</h2>
                <p><a :href=place.venueInfo?.googleMapsUri target="_blank">View on Google Maps</a></p>
                <p>{{ place.venueInfo?.formattedAddress }}</p>
                <p>Rating: {{ place.venueInfo?.rating }}</p>
                <p v-if="place.venueInfo?.priceLevel">Price: {{ place.venueInfo?.priceLevel }}</p>
            </GMapInfoWindow>
        </GMapMarker>
    </GMapMap>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Coordinate, MarkerOptions } from '../types/MapTypes.ts';

const props = defineProps<{
    middle: Coordinate
    nearbyVenues: MarkerOptions[]
}>()

const center = props.middle;
const zoom = 17;

const nearbyVenues = props.nearbyVenues;

const openedMarkerID = ref<string | null>(null)
function openMarker(id: string | null) {
    if (openedMarkerID.value == id) {
        openedMarkerID.value = null;
    } else {
        openedMarkerID.value = id
    }
}

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
        width: 85%;
        height: 350px;
    }
}
</style>
