<template>
    <div class="header">
                <div class="head_title_block">
                    <p>Панель активности</p>
                </div>
                <div class="filter_block">
                    <div class="filter users">
                        <MMultiSelect 
                        :labels="['Пользователь','Пользователя','Пользователей']"
                        :items="users"
                        placeholder="Пользователи"
                        @set-checked="setCheckedUsers"></MMultiSelect>
                    </div>
                    <div class="filter date">
                        <MDate
                        placeholder="Дата"
                        @set-selected="setSelected"
                        ></MDate>
                    </div>
                    <div class="filter activities">
                        <MMultiSelect 
                        :labels="['Тип','Типа','Типов']" 
                        :items="activityTypes" 
                        placeholder="Типы активности" 
                        @set-checked="setCheckedActivities"></MMultiSelect>
                    </div>
                </div>
            </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MMultiSelect from './Vue/components/MakeRoi/MMultiSelect/MMultiSelect.vue';
import MDate from './Vue/components/MakeRoi/MDate/MDate.vue';
import { User, ActivityTypes } from '../interfaces';
interface DropdownItem {
    title: string,
    value: DropdownValue
}
type DropdownValue = number | string;


export default defineComponent({
    name: "PanelHeader",
    components: {
        MMultiSelect,
        MDate
    },
    props: ['info'],
    emits: ['filter-users', 'filter-date', 'filter-activities'],
    data() {
        return {
            users: [] as DropdownItem[],
            activityTypes: [] as DropdownItem[],
        }
    },
    methods: {
        setCheckedUsers(users: number[]): void {
            this.$emit('filter-users', users)
        },
        setCheckedActivities(activities: number[]): void {
            this.$emit('filter-activities', activities)
        },
        setSelected(date: number): void {
            this.$emit('filter-date', date)
        }
    },
    created() {
        this.info.data.users.forEach((user: User) => {
            this.users.push({
                value: user.id,
                title: user.name
            })
        });
        this.info.data.activity_types.forEach((activity: ActivityTypes) => {
            this.activityTypes.push({
                value: activity.id,
                title: activity.name
            })
        });
        
    }
});
</script>

<style scoped>
.head_title_block {
    color: #F5F5F5;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
}
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}
.filter_block {
    display: flex;
    gap: 10px;
}
.filter {
    box-sizing: border-box;
    background-color: #0B2031;
    border-radius: 10px;
    height: 34px;
    width: 200px;
    color: #5F839A;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
    cursor: pointer;
}
.filter:hover {
    background-color: #041522;
}
@media (width < 700px) {
    .header {
        flex-direction: column;
        gap: 20px;
    }
}
@media (width < 530px) {
    .filter_block {
        flex-direction: column;
    }
    .filter {
        width: 100%;
    }
}
</style>