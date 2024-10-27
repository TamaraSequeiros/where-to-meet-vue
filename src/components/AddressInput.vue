<template>
    <div class="input">
        <label>Address 1: 
            <GMapAutocomplete class="autocomplete"
                placeholder="Search for an address"
                @place_changed="setPlace1"
                :options="{
                    componentRestrictions: { country: 'nl' }
                }"
            />
        </label>
        <br/><br/>
        <label>Address 2: 
            <GMapAutocomplete class="autocomplete"
                placeholder="Search for an address"
                @place_changed="setPlace2"
                :options="{
                    componentRestrictions: { country: 'nl' }
                }"
            />
        </label>
        <br/><br/>
        <el-radio-group v-model="method">
        <el-radio value="geographical">Geographical center</el-radio>
        <el-radio value="route">Midpoint by bike</el-radio>
        </el-radio-group>
        <br/><br/>
        <button @click="findMiddle(); $emit('coords', middle)">Search</button>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import type { Coordinate } from '../types/MapTypes.ts';
import axios from 'axios';

const middle = ref<Coordinate>()

const address1 = ref<string>('')
const address2 = ref<string>('')
const method = ref('geographical')

async function setPlace1(address: any) {
    address1.value = address.formatted_address;
}

async function setPlace2(address: any) {
    address2.value = address.formatted_address;
}

async function findMiddle() {
    const address_data = {
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

    try {
        const response = await axios(address_data);
        middle.value = response.data.middle_point;
    } catch (error) {
        console.log("There was an error");
        console.log(error);
    }
}
</script>

<style scoped>

</style>