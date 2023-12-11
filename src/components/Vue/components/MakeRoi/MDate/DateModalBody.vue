<template>
    <table class="w-full">
        <tr>
            <td v-for="day in weekDays" :key="day">
                <div class="cursor-pointer flex justify-center">
                    {{ day }}
                </div>
            </td>
        </tr>
        <tr v-for="i in Math.ceil(currentDates.length / 7)" :key="i">
            <td v-for="j in 7" :class="getSelectedClasses(i, j)" :key="j">
                <div
                    class="cursor-pointer flex justify-center items-center w-[30px] h-[30px] hover:bg-gray-100 rounded-full"
                    :class="{
              'text-gray-400': !isCurrentMonth(getRowColDate(i, j)),
              'text-blue-600 font-bold': isToday(getRowColDate(i, j)),
            }"
                    @click="setSelected(getRowColDate(i, j))"
                >
                    {{ getRowColDate(i, j).getDate() }}
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
import {getCurrentDates, weekDays} from './lib';

export default {
    emits: ['setSelected'],
    props: {
        type: {
            type: String,
            required: true,
        },
        selectedDate: {
            type: Object,
        },
        selectedRange: {
            type: Object,
        },
        date: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            weekDays,
            currentDates: getCurrentDates(this.date),
        };
    },
    watch: {
        date: {
            handler(date) {
                this.currentDates = getCurrentDates(date);
            },
            deep: true
        }
    },
    methods: {
        getRowColDate(row, col) {
            return this.currentDates[(row - 1) * 7 + (col - 1)];
        },
        isToday(date) {
            return this.compareDates(date, new Date()) === 0;
        },
        isCurrentMonth(date) {
            return date.getMonth() === this.date.getMonth();
        },
        compareDates(firstDate, secondDate) {
            if (!firstDate || !secondDate) {
                return -2;
            }

            if (firstDate.getFullYear() === secondDate.getFullYear()
                && firstDate.getMonth() === secondDate.getMonth()
                && firstDate.getDate() === secondDate.getDate()
            ) {
                return 0;
            }

            if (firstDate > secondDate) {
                return 1;
            }

            return -1;
        },
        setSelected(date) {
            if (this.type === 'single') {
                this.$emit('setSelected', date);
                return;
            }

            if (this.selectedRange.end || !this.selectedRange.start || date < this.selectedRange.start) {
                this.$emit('setSelected', {
                    start: date,
                    end: null
                });

                return;
            }

            if (this.selectedRange.start) {
                this.$emit('setSelected', {
                    ...this.selectedRange,
                    end: date
                });
            }
        },
        getSelectedClasses(row, col) {
            const classes = {};
            const currentDate = this.getRowColDate(row, col);

            if (col === 1) {
                classes['rounded-l-full'] = true;
            }

            if (col === 7) {
                classes['rounded-r-full'] = true;
            }

            if (this.type === 'single') {
                if (this.compareDates(currentDate, this.selectedDate) === 0) {
                    classes['bg-blue-300'] = true;
                    classes['rounded-full'] = true;
                }

                return classes;
            }

            if (this.compareDates(currentDate, this.selectedRange.start) === 1
                && this.compareDates(currentDate, this.selectedRange.end) === -1
            ) {
                classes['bg-blue-100'] = true;
            }

            if (this.compareDates(currentDate, this.selectedRange.start) === 0) {
                classes['bg-blue-300'] = true;
                classes['rounded-l-full'] = true;
            }

            if (this.compareDates(currentDate, this.selectedRange.end) === 0) {
                classes['bg-blue-300'] = true;
                classes['rounded-r-full'] = true;
            }

            return classes;
        }
    }
};
</script>

<style scoped>

</style>