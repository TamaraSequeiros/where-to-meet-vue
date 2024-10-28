<template>
    <GMapMap ref="googleMapRef" class="map" mapId="WHERE_MAP_ID" @click="openMarker(null)" :options="{
        controlSize: 28,
        zoomControl: true,
        mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false
        }">
        <GMapMarker @click="openMarker('middle')"
        :options="middleMarker.options" :icon="{ url: centerMarker, scaledSize: { height: 50, width: 50}}">
            <GMapInfoWindow class="info" @closeclick="openMarker(null)" :opened="openedMarkerID === 'middle'"
                :options="{
                    headerDisabled: true
                }">
                <h3 class="venueType">Here is the middle</h3>
            </GMapInfoWindow>
        </GMapMarker>
        <GMapMarker v-for="place in props.nearbyVenues" :options="place.options"
            @click="openMarker(place.venueInfo?.displayName)">
            <GMapInfoWindow class="info" @closeclick="openMarker(null)" :opened="openedMarkerID === place.venueInfo?.displayName"
                :options="{
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
import { ref, onMounted } from 'vue';
import type { Coordinate, MarkerOptions } from '../types/MapTypes.ts';
import centerMarker from '/src/assets/middle.png';

const props = defineProps<{
    middle: Coordinate
    nearbyVenues: MarkerOptions[]
}>()

const middleMarker = {
    options: { position: props.middle, clickable: true }
}

const openedMarkerID = ref<string|null>('middle')
function openMarker(id: string | null) {
    if (openedMarkerID.value == id) {
        openedMarkerID.value = null;
    } else {
        openedMarkerID.value = id
    }
}

const googleMapRef = ref();
async function fitMarkerBounds() {
  const googleMapInstance = await googleMapRef.value.$mapPromise;

  const bounds = new (window as any).google.maps.LatLngBounds();
  bounds.extend(props.middle);
  props.nearbyVenues.forEach((marker) => {
    bounds.extend(marker.options.position);
  });

  googleMapInstance.fitBounds(bounds);
}

onMounted(fitMarkerBounds);

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
    margin: 6px;
}
</style>
