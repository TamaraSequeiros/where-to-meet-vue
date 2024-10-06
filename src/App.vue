<template>
  <h2>Let's find the middle!</h2>
  <div class="input">
    <label for="address1">Address 1: </label>
    <GMapAutocomplete class="autocomplete"
        placeholder="Search for an address"
        @place_changed="setPlace1"
        :options="{
              componentRestrictions: { country: 'nl' }
        }"
    />
    <br/><br/>
    <label for="address2">Address 2: </label>
    <GMapAutocomplete class="autocomplete"
        placeholder="Search for an address"
        @place_changed="setPlace2"
        :options="{
              componentRestrictions: { country: 'nl' }
        }"
    />
    <br/><br/>
      <el-radio-group v-model="method">
      <el-radio value="geographical">Geographical center</el-radio>
      <el-radio value="route">Midpoint by bike</el-radio>
    </el-radio-group>
    <br/><br/>
    <button @click="submit">Search</button>
  </div>
  <GoogleMaps v-if=ready :lat="lat" :lng="lng"/>
  <div style="text-align: center;">
    <div class="results">
      <h2 v-if=ready>Nearby places</h2>
      <ul>
        <li v-for="place in nearby_places">
          {{ place.displayName.text }} -- Rating: {{ place.rating }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GoogleMaps from './components/GoogleMap.vue';
import axios from 'axios';

interface Place {
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
}

const address1 = ref<string>('Stationsplein, 1012AB Amsterdam')
const address2 = ref<string>('Westermarkt 20, 1016GV Amsterdam')
// const address1 = ref<string>('')
// const address2 = ref<string>('')
const method = ref('geographical')

const ready = ref(false)
const lat = ref<number>()
const lng = ref<number>()

const nearby_places = ref<Place[]>([])

async function setPlace1(address: any) {
  address1.value = address.formatted_address;
}

async function setPlace2(address: any) {
  address2.value = address.formatted_address;
}

async function submit() {
  ready.value = false;

  const map_options = {
    url: import.meta.env.VITE_WTM_URL + '/where/middle',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      'method': method.value,
      'addresses': [
        address1.value,
        address2.value
      ]
    }
  }

  let response;
  try {
    response = await axios(map_options);
    const middle = response.data.middle_point;
    lat.value = middle.lat;
    lng.value = middle.lng;

    const places_options = {
      url: import.meta.env.VITE_WTM_URL + '/places/nearby',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'lat': middle.lat,
        'lng': middle.lng
      }
    }
    const places_response = await axios(places_options);
    nearby_places.value = places_response.data.places;

    ready.value = true;
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
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


