<template>
    <div class="input">
        <GAutocomplete :label="'Address 1'" @selectPlace="setPlace1"/>
        <br/><br/>
        <GAutocomplete :label="'Address 2'" @selectPlace="setPlace2"/>
        <br/><br/>
        <el-radio-group v-model="method">
        <el-radio value="geographical">Geographical center</el-radio>
        <el-radio value="route">Midpoint by bike</el-radio>
        </el-radio-group>
        <br/><br/>
        <button :disabled="!noData()" @click="$emit('origins', method, address1, address2)">Search</button>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import GAutocomplete from '../components/GoogleAutocomplete.vue';

const address1 = ref<string>('')
const address2 = ref<string>('')
const method = ref('geographical')

function setPlace1(address: any) {
    console.log(address);
    address1.value = address;
}

function setPlace2(address: any) {
    address2.value = address;
}

function noData() {
    return address1.value != '' && address2.value != '';
}
</script>
