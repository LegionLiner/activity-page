<template>
    <div class="activity">
        <p v-for="activity in activities" class="activity_time">
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" :fill="activity.color"/>
            </svg>
            {{ activity.time }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TimeActivity } from '../interfaces';
interface Activities {
    [key: number]: TimeActivity
}

export default defineComponent({
    name: "TimePanel",
    props: ['userActivity', 'types'],
    data() {
        return {
            activities: {} as Activities,
        }
    },
    created() {
        for (let activity in this.userActivity) {
            const type = this.userActivity[activity].type as number;
            if (!this.activities[type]) this.activities[type] = {
                overall: 0,
                color: this.types[type].color
            };
            this.activities[type].overall += this.userActivity[activity].duration;
        }
        for (let activity in this.activities) {
            const date = new Date(this.activities[activity].overall);
            const hours = date.getHours() - 3;
            const minutes = date.getMinutes();
            this.activities[activity].time = `${hours}ч ${minutes}м`;
        } 
    },
    updated() {  
        this.activities = {};
        for (let activity in this.userActivity) {
            const type = this.userActivity[activity].type as number;
            if (!this.activities[type]) this.activities[type] = {
                overall: 0,
                color: this.types[type].color
            };
            this.activities[type].overall += this.userActivity[activity].duration;
        }
        for (let activity in this.activities) {
            const date = new Date(this.activities[activity].overall);
            const hours = date.getHours() - 3;
            const minutes = date.getMinutes();
            this.activities[activity].time = `${hours}ч ${minutes}м`;
        } 
    }
})
</script>

<style scoped>
.activity {
    font-size: 13px;
    line-height: 18px;
    display: flex;
    gap: 12px;
}
.activity_time {
    display: flex;
    align-items: center;
    gap: 6px;
}
</style>