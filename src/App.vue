<template>
    <h2>Search middle</h2>
    <label for="address1">Address 1: </label>
    <input type="text" placeholder="" v-model="address1" />
    <br/><br/>
    <label for="address2">Address 2: </label>
    <input type="text" placeholder="" v-model="address2" />
    <br/><br/>
      <el-radio-group v-model="method">
      <el-radio value="geographical">Exact center</el-radio>
      <el-radio value="route">By bike</el-radio>
    </el-radio-group>
    <br/><br/>
    <button @click="submit">Submit</button>
    <GoogleMaps class="map" v-if=middle :lat="lat" :lng="lng"/>
</template>

<script setup>
import { ref } from 'vue';
import GoogleMaps from './components/GoogleMap.vue'
const axios = require('axios');

const address1 = ref('Stationsplein, 1012AB Amsterdam')
const address2 = ref('Westermarkt 20, 1016GV Amsterdam')
const method = ref('geographical')

let middle = ref(undefined)
let lat = ref(undefined)
let lng = ref(undefined)

async function submit() {
  console.log( method.value )
  const options = {
    url: 'http://localhost:3000/where/middle',
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
  console.log( options.data )

  let response;
  try {
    response = await axios(options);
    middle.value = response.data.middle_point;
    lat.value = middle.value.lat;
    lng.value = middle.value.lng;
  } catch (error) {
    console.log(error)
    middle.value = error.message;
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

.map {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


