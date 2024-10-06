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
    <button @click="submit">Submit</button>
  </div>
  <GoogleMaps class="map" v-if=ready :lat="lat" :lng="lng"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GoogleMaps from './components/GoogleMap.vue';
import axios from 'axios';


const address1 = ref<string>('Stationsplein, 1012AB Amsterdam')
const address2 = ref<string>('Westermarkt 20, 1016GV Amsterdam')
// const address1 = ref<string>('')
// const address2 = ref<string>('')
const method = ref('geographical')

const ready = ref(false)
const lat = ref<number>()
const lng = ref<number>()

async function setPlace1(address: any) {
  address1.value = address.formatted_address;
}

async function setPlace2(address: any) {
  address2.value = address.formatted_address;
}

async function submit() {
  ready.value = false;

  const options = {
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
    response = await axios(options);
    const middle = response.data.middle_point;
    lat.value = middle.lat;
    lng.value = middle.lng;
    ready.value = true;
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* desktop */
@media only screen and (min-width: 992px) {
  .map {
    margin: auto;
    margin-top: 50px;
    width: 70%;
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

.autocomplete {
  width:200px;
}
</style>


