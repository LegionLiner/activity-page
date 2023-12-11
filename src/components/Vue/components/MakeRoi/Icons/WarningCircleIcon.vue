<template>
    <img :src="currentImg" alt="warning">
</template>

<script lang="ts" setup>
import { computed } from "vue";
import img from '@core/src/Vue/assets/img/warning_circle.svg';
import redImg from '@core/src/Vue/assets/img/warning_circle_red.svg';

interface Props {
    color: 'blue' | 'red';
}

const props = withDefaults(defineProps<Props>(), {
    color: 'blue'
});

const currentImg = computed(() => {
    if (props.color === 'red') {
        return redImg;
    }

    return img;
});
</script>