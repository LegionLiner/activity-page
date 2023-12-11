<template>
    <img :src="currentImg" alt="delete">
</template>

<script lang="ts" setup>
import {computed} from "vue";
import trashImg from '@core/src/Vue/assets/img/trash.svg';
import trashRedImg from '@core/src/Vue/assets/img/trash_red.svg';

interface Props {
    color: 'gray' | 'red'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'gray'
});

const currentImg = computed(() => {
    if (props.color === 'red') {
        return trashRedImg;
    }

    return trashImg;
})
</script>