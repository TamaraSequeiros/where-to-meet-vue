<template>
    <label>
        <GMapAutocomplete class="autocomplete"
            :placeholder=label
            @place_changed="setPlace"
            :options="{
                componentRestrictions: { country: 'nl' }
            }"
        />
    </label>
</template>


<script setup lang="ts">

defineProps<{
    label: string
}>()

const emit = defineEmits(['selectPlace'])

function setPlace(address: any) {
    let selection = '';
    if (address.name != '') {
        selection = address.formatted_address;
    }
    emit('selectPlace', selection)
}

</script>


<style scoped>
.autocomplete {
  width:250px;
  height:20px;
}
</style>
