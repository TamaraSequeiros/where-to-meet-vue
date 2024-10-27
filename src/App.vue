<template>
  <h2>Let's find the middle!</h2>
  <AddressInput @origins="displayMap"/>
  <GoogleMaps v-if="mapReady" :middle="middle" :nearbyVenues="nearbyVenues" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Coordinate, MarkerOptions } from './types/MapTypes.ts';
import GoogleMaps from './components/GoogleMap.vue';
import AddressInput from './components/AddressInput.vue';
import axios from 'axios';

const mapReady = ref<boolean>(false)
const middle = ref<Coordinate>({lat: 0, lng: 0})
const nearbyVenues = ref<MarkerOptions[]>([])

async function displayMap(method: string, address1: string, address2: string) {
  mapReady.value = false;
  const coord = await findMiddle(method, address1, address2);
  middle.value = coord;
  nearbyVenues.value = await searchNearbyPlaces(coord);
  mapReady.value = true;
}

async function findMiddle(method: string, address1: string, address2: string) {
    const address_data = {
        url: import.meta.env.VITE_WTM_URL + '/where/middle',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'method': method,
            'addresses': [
                address1,
                address2
            ]
        }
    }

    try {
        const response = await axios(address_data);
        return response.data.middle_point;
    } catch (error) {
        console.log("There was an error");
        console.log(error);
    }
}

async function searchNearbyPlaces(coord: Coordinate) {
    let venues = [];
    const placesOptions = {
            url: import.meta.env.VITE_WTM_URL + '/places/nearby',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'lat': coord.lat,
                'lng': coord.lng
            }
        }
    try {
        const placesResponse = await axios(placesOptions);
        for (var venue of placesResponse.data.places) {
            let venueMarker = {
                options: { 
                    position: { lat: 0, lng: 0 }
                },
                venueInfo: { displayName: '', googleMapsUri: '', formattedAddress: '', rating: 0, priceLevel: undefined }
            };
            venueMarker.options.position = { lat: venue.location.latitude, lng: venue.location.longitude };
            venueMarker.venueInfo = venue;
            venues.push(venueMarker);
        }
    } catch (error) {
        console.log("There was an error");
        console.log(error);
    }
    return venues;
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


