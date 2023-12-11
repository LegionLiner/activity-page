<template>
    <div class="header">
        <div class="flex justify-between items-center">
            <div @click="showPrevMonth()" class="h-[20px] w-[10px]">
                <Arrow direction="left"/>
            </div>
            <div>
                {{ currentMonth }} {{ currentYear }}
            </div>
            <div @click="showNextMonth()" class="h-[20px] w-[10px]">
                <Arrow direction="right"/>
            </div>
        </div>
    </div>
</template>

<script>
import {getMonthName} from './lib';
import Arrow from './Arrow.vue';

export default {
    components: {Arrow},
    emits: ['setDate'],
    props: {
        date: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            currentMonth: getMonthName(this.date),
            currentYear: this.date.getFullYear(),
        };
    },
    methods: {
        showPrevMonth() {
            const day = 1;
            let month = this.date.getMonth();
            let year = this.date.getFullYear();

            if (month === 0) {
                month = 12;
                year--;
            }

            const newDate = new Date(`${month}/${day}/${year}`);
            this.$emit('setDate', newDate);
        },
        showNextMonth() {
            const day = 1;
            let month = this.date.getMonth() + 2;
            let year = this.date.getFullYear();

            if (month > 12) {
                month = 1;
                year++;
            }

            const newDate = new Date(`${month}/${day}/${year}`);
            this.$emit('setDate', newDate);
        }
    },
    watch: {
        date: {
            handler(date) {
                this.currentMonth = getMonthName(date);
                this.currentYear = date.getFullYear();
            },
            deep: true
        }
    }
};
</script>

<style scoped>

</style>