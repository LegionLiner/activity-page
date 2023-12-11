<template>
    <img :src="currentImg" alt="lock">
</template>

<script lang="ts" setup>
import {computed} from "vue";
import lockImg from '@core/src/Vue/assets/img/lock.svg';
import lockBlueImg from '@core/src/Vue/assets/img/lock_blue.svg';
import lockRedImg from '@core/src/Vue/assets/img/lock_red.svg';

interface Props {
    color: 'gray' | 'blue' | 'red'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'gray'
});

const currentImg = computed(() => {
    if (props.color === 'blue') {
        return lockBlueImg;
    }

    if (props.color === 'red') {
        return lockRedImg;
    }

    return lockImg;
})
</script>