<template>
    <div class="caption">
        <div class="time_indicator">
            <div class="border"></div>
            <p class="time" style="left: 0;">00:00</p>
        </div>
        <div v-for="n in 23" class="time_indicator">
            <div class="border"></div>
            <p class="time">{{ n > 9 ? `${n}` : `0${n}` }}:00</p>
        </div>
        <p class="time time-absolute">24:00</p>
        <div class="border" style="height: 4px;"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "TimeLine"
})
</script>

<style scoped>
.caption {
    display: flex;
    width: 100%;
    margin-top: 5px;
}
.time_indicator {
    width: 100%;
    position: relative;
    display: flex;
}
.time_indicator .border {
    height: 4px;
    width: 1px; 
   border-left: 1px solid #28485F;
}
.time {
    color: #28485F;
    font-size: 11px;
    line-height: 13px;
    margin-top: 4px;
    position: absolute;
}
.time:not(.time-absolute) {
    left: -13px;
}
.time-absolute {
    right: 33px;
    width: 27px;
}
@media (width < 1100px) {
    .time_indicator:nth-of-type(even) {
        display: none;
    }
}
@media (width < 470px) {
    .time_indicator:nth-of-type(4n + 3) {
        display: none;
    }
}
@media (width < 250px) {
    .time_indicator, .time {
        display: none;
    }
}
</style>