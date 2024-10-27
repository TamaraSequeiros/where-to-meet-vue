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
        <button @click="$emit('origins', method, address1, address2)">Search</button>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const address1 = ref<string>('Zeeburgerkade 910, Amsterdam, Netherlands')
const address2 = ref<string>('Rokin 21, Amsterdam, Netherlands')
// const address1 = ref<string>('')
// const address2 = ref<string>('')
const method = ref('geographical')

function setPlace1(address: any) {
  address1.value = address.formatted_address;
}

function setPlace2(address: any) {
  address2.value = address.formatted_address;
}

</script>

<style scoped>

</style>