<template>
    <GMapMap class="map" mapId="WHERE_MAP_ID" :api-key="api_key" :center="center" :zoom="zoom" :options="{
        controlSize: 28,
        zoomControl: true,
        mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false
        }">
        <!-- <GMapMarker v-if="lat" :options="middleMarker.options" /> -->
        <GMapMarker v-for="place in nearbyVenues" :options="place.options"
            @click="openMarker(place.venueInfo?.displayName)">
            <GMapInfoWindow @closeclick="openMarker(null)" :opened="openedMarkerID === place.venueInfo?.displayName"
                :options="{
                    maxWidth: 320,
                    maxHeight: 320,
                    headerDisabled: true
                }">
                <h2>{{ place.venueInfo?.displayName }}</h2>
                <p>{{ place.venueInfo?.formattedAddress }}</p>
                <p>Rating: {{ place.venueInfo?.rating }}</p>
                <p v-if="place.venueInfo?.priceLevel">Price: {{ place.venueInfo?.priceLevel }}</p>
            </GMapInfoWindow>
        </GMapMarker>
    </GMapMap>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MarkerOptions } from '../types/MapTypes.ts';
import axios from 'axios';

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;

const props = defineProps({ lat: Number, lng: Number })

const center = props;
const zoom = 17;
const middleMarker = {
    options: { position: center }
};
const nearbyVenues = ref<MarkerOptions[]>([])

async function searchPlaces() {
    try {
        const placesOptions = {
            url: import.meta.env.VITE_WTM_URL + '/places/nearby',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'lat': props.lat,
                'lng': props.lng
            }
        }
        const placesResponse = await axios(placesOptions);
        for (var venue of placesResponse.data.places) {
            let venueMarker = {
                options: { 
                    position: { lat: 0, lng: 0 }
                },
                venueInfo: { displayName: '', formattedAddress: '', rating: 0, priceLevel: undefined }
            };
            venueMarker.options.position = { lat: venue.location.latitude, lng: venue.location.longitude };
            venueMarker.venueInfo = venue;
            nearbyVenues.value.push(venueMarker);
        }

    } catch (error) {
        console.log("There was an error");
        console.log(error);
    }
}

searchPlaces()


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
