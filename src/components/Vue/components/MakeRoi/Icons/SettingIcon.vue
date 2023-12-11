<template>
    <img :src="currentImg" alt="settings">
</template>

<script lang="ts" setup>
import {computed} from "vue";
import settingImg from '@core/src/Vue/assets/img/setting.svg';
import settingBlueImg from '@core/src/Vue/assets/img/setting_blue.svg';

interface Props {
    color: 'gray' | 'blue'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'gray'
});

const currentImg = computed(() => {
    if (props.color === 'blue') {
        return settingBlueImg;
    }

    return settingImg;
})
</script>