<template>
    <img :src="currentImg" alt="edit">
</template>

<script lang="ts" setup>
import {computed} from "vue";
import editImg from '@core/src/Vue/assets/img/edit.svg';
import editBlueImg from '@core/src/Vue/assets/img/edit_blue.svg';

interface Props {
    color: 'gray' | 'blue'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'gray'
});

const currentImg = computed(() => {
    if (props.color === 'blue') {
        return editBlueImg;
    }

    return editImg;
})
</script>