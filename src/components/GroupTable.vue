<template>
    <div class="users">
        <div class="user" v-for="user in group.users">
            <div class="user_main-info">
                <p class="user_name">{{ user.name }}</p>
                <p class="all_time">{{ user.time }}</p>
            </div>
            <div class="user_time">
                <TimePanel :userActivity="user.activities" :types="types"></TimePanel>
            </div>
            <div class="user_timeline">
                <div class="timeline">
                    <div v-for="(activity, index) in user.activities" class="line"
                     :style="{ 
                        background: activity?.time?.color, 
                        width: activity?.time?.part + '%', 
                        left: activity?.time?.start + '%'
                        }" 
                        :class="{ 
                        'first-line': index == 0,
                        'last-line': index + 1 == user.activities.length
                         }">
                        <div class="activity-type">
                            <p class="type">{{ activity?.time?.name }}</p>
                            <p class="duration">{{ activity?.time?.label }}</p>
                        </div>
                    </div>
                </div>
                <TimeLine></TimeLine>
            </div>
        </div>        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeLine from './TimeLine.vue';
import TimePanel from './TimePanel.vue';
import { ActivityItem } from '../interfaces';

export default defineComponent({
    name: "GroupTable",
    props: ['group', 'types'],
    components: {
        TimeLine,
        TimePanel
    },
    mounted() {
        for (let user in this.group.users) {
             let result = 0;
             this.group.users[user]?.activities?.forEach((activity: ActivityItem) => {
                
                const startDate = new Date(activity.created_at);
                const start = (startDate.getHours() * 60 + startDate.getMinutes()) / 1440 * 100;
                result += activity.duration;
                const actDate = new Date(activity.duration);
                const hours = actDate.getHours() - 3;
                const minutes = actDate.getMinutes();
                activity.time = {
                    label: `${hours}ч ${minutes}м`,
                    name: this.types[activity.type].name,
                    start: start,
                    part: ((activity.duration / 1000) / 60 / 1440) * 100,
                    color: this.types[activity.type].color
                } 
             });
             const date = new Date(result);
             const hours = date.getHours() - 3;
             const minutes = date.getMinutes();
             this.group.users[user].time = `${hours}ч ${minutes}м`;
         }
    },
    updated() {
         for (let user in this.group.users) {
             let result = 0;
             this.group.users[user]?.activities?.forEach((activity: ActivityItem) => {
                
                const startDate = new Date(activity.created_at);
                const start = (startDate.getHours() * 60 + startDate.getMinutes()) / 1440 * 100;
                result += activity.duration;
                const actDate = new Date(activity.duration);
                const hours = actDate.getHours() - 3;
                const minutes = actDate.getMinutes();
                activity.time = {
                    label: `${hours}ч ${minutes}м`,
                    name: this.types[activity.type].name,
                    start: start,
                    part: ((activity.duration / 1000) / 60 / 1440) * 100,
                    color: this.types[activity.type].color
                }    
             });
             const date = new Date(result);
             const hours = date.getHours() - 3;
             const minutes = date.getMinutes();
             this.group.users[user].time = `${hours}ч ${minutes}м`;
         }
    }
});
</script>

<style scoped>
.user {
    color: #F5F5F5;
    font-size: 15px;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 20px 28px;
    row-gap: 12px;
    margin-top: 32px;
}
.user_timeline {
    grid-column: span 2;
    width: 100%;
    height: 4px;
    border-radius: 3px;
    background-color: #0B2031;;
}
.user_main-info {
    display: flex;
    gap: 10px;
}
.all_time {
    display: flex;
    padding: 3px 9px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: rgba(65, 209, 187, 0.15);
    color: #41D1BB;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
}
.user_time {
    display: flex;
    justify-content: flex-end;
}
.timeline {
    display: flex;
    margin-bottom: 4px;
    position: relative;
}
.line {
    height: 4px;
    cursor: pointer;
    background: #EF8888; 
    position: absolute;
}
.line:hover .activity-type {
    visibility: visible;
}
.activity-type {
    position: absolute;
    top: -50px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(4px);
    padding: 6px 8px;
    visibility: hidden;

    color: #FFF;
    font-size: 13px;
    line-height: 17px;
    white-space: nowrap;
}
@media (width < 470px) {
    .user {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .user_time {
        justify-content: flex-start;
    }
    .user_timeline {
        margin-bottom: 20px;
    }
    .group {
        padding-bottom: 28px;
    }
}
@media (width < 250px) {
    .user_main-info {
        flex-direction: column;
    }
    .all_time {
        width: 60px;
    }
    .activity {
        flex-direction: column;
    }
}
.first-line {
    border-top-left-radius: 3px; 
    border-bottom-left-radius: 3px;
}
.last-line {
    border-top-right-radius: 3px; 
    border-bottom-right-radius: 3px;
}
</style>