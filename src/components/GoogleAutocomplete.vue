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
/* desktop */
@media only screen and (min-width: 992px) {
    .autocomplete {
        width:200px;
        height:20px;
    }
}

/* mobile */
@media only screen and (max-width: 767px) {
    .autocomplete {
        width:310px;
        height:30px;
    }
}
</style>
