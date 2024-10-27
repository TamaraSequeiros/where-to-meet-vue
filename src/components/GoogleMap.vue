<template>
    <GMapMap class="map" mapId="WHERE_MAP_ID" :center="center" :zoom="zoom" :options="{
        controlSize: 28,
        zoomControl: true,
        mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false
        }">
        <GMapMarker :options="middleMarker.options" :icon="{ url: centerMarker, scaledSize: { height: 35, width: 40}}"/>
        <GMapMarker v-for="place in nearbyVenues" :options="place.options"
            @click="openMarker(place.venueInfo?.displayName)">
            <GMapInfoWindow class="info" @closeclick="openMarker(null)" :opened="openedMarkerID === place.venueInfo?.displayName"
                :options="{
                    maxWidth: 320,
                    maxHeight: 320,
                    headerDisabled: true
                }">
                <h3>{{ place.venueInfo?.displayName }}</h3>
                <p><a :href=place.venueInfo?.googleMapsUri target="_blank">{{ place.venueInfo?.formattedAddress }}</a></p>
                <p class="venueType" v-if="place.venueInfo?.priceLevel">{{ place.venueInfo?.primaryTypeDisplayName }} — {{ place.venueInfo?.priceLevel }}</p>
                <p class="venueType" v-else>{{ place.venueInfo?.primaryTypeDisplayName }}</p>
                <el-rate v-if="place.venueInfo?.rating"
                    v-model="place.venueInfo.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                />
            </GMapInfoWindow>
        </GMapMarker>
    </GMapMap>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Coordinate, MarkerOptions } from '../types/MapTypes.ts';
import centerMarker from '/src/assets/mark.png';

const props = defineProps<{
    middle: Coordinate
    nearbyVenues: MarkerOptions[]
}>()

const center = props.middle;
const zoom = 17;

const middleMarker = {
    options: { position: center, clickable: false }
}

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

.venueType {
    font-family: Arial;
    text-align: center;
    margin: 6px;
}
</style>
