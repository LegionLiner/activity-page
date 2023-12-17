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
    [key: number | string ]: TimeActivity
}

export default defineComponent({
    name: "TimePanel",
    props: ['userActivity', 'types'],
    data() {
        return {
            activities: {} as Activities,
        }
    },
    methods: {
        updatePanel(): void {
            this.activities = {};
            for (let activity in this.userActivity) {
                const type = this.userActivity[activity].type as number;
                if (type == 82 || type == 81) {
                    if (!this.activities['calls']) this.activities['calls'] = {
                        overall: 0,
                        color: this.types[type].color
                    }
                    this.activities['calls'].overall += this.userActivity[activity].duration;
                } else {
                    if (!this.activities['actions']) this.activities['actions'] = {
                        overall: 0,
                        color: this.types[type].color
                    }
                    this.activities['actions'].overall += this.userActivity[activity].duration;
                }
                // if (!this.activities[type]) this.activities[type] = {
                //     overall: 0,
                //     color: this.types[type].color
                // };
                // this.activities[type].overall += this.userActivity[activity].duration;
            }
            for (let activity in this.activities) {
                const date = new Date(this.activities[activity].overall);
                const hours = date.getHours() - 3;
                const minutes = date.getMinutes();
                this.activities[activity].time = `${hours}ч ${minutes}м`;
            } 
        }
    },
    created() {
        this.updatePanel();
    },
    updated() {  
        this.updatePanel();
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