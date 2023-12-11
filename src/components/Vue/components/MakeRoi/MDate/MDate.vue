<template>
    <div class="w-full"
         :class="{
            'opacity-50': disabled
         }"
         ref="wrapperRef"
    >
        <div class="relative">
            <img :src="calendarImg"
                 alt="calendar"
                 class="absolute w-5 top-[6px] left-1.5"
                 @click="$refs.input.$el.focus()"
            >
            <TextInput
                :placeholder="placeholder"
                :value="fieldValue"
                :disabled="disabled"
                :read-only="readOnly"
                ref="input"
                autocomplete="new-password"
                class="!pl-[30px] w-full !opacity-100"
                @focus="showModal"
                @change="changeFieldValue"
            />
        </div>

        <ModalWrapper :visible="modalVisible" class="mt-1 absolute" @set-visible="modalVisible = !modalVisible">
            <div class="date-picker-modal p-2.5 rounded-sm bg-white">
                <DateModalHeader :date="date" @set-date="setDate"/>
                <div class="mt-1.5">
                    <DateModalBody :type="type" :date="date" :selected-date="currentDate" :selected-range="currentRange" @set-selected="setCurrent" />
                </div>
            </div>
        </ModalWrapper>
    </div>
</template>

<script>
import calendarImg from '../../../assets/img/calendar.svg';
import {getDateStr, getDateFromStr, removeExtraChars} from './lib';
import DateModalHeader from './DateModalHeader.vue';
import DateModalBody from './DateModalBody.vue';
import ModalWrapper from '../../ModalWrapper.vue';
import TextInput from '../MInput/MInput.vue';

export default {
    emits: ['setSelected'],
    components: {TextInput, ModalWrapper, DateModalHeader, DateModalBody},
    props: {
        type: {
            type: String,
            default: 'single'
        },
        placeholder: {
            type: String,
            default: 'Выбрать дату'
        },
        selectedDate: {
            validator(v) {
                return typeof v === 'number' || typeof v === 'undefined';
            }
        },
        selectedRange: {
            type: Object,
            default: () => ({
                start: null,
                end: null
            })
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            calendarImg,
            modalVisible: false,
            fieldValue: '',
            date: new Date(),
            currentDate: this.selectedDate ? new Date(this.selectedDate) : null,
            currentRange: {
                start: this.selectedRange.start ? new Date(this.selectedRange.start) : null,
                end: this.selectedRange.end ? new Date(this.selectedRange.end) : null
            },
        };
    },
    watch: {
        disabled(newDisabled) {
            if (newDisabled) {
                this.modalVisible = false;
            }
        },
        selectedRange: {
            handler(range) {
                const currentRange = {
                    start: range.start ? new Date(range.start) : null,
                    end: range.end ? new Date(range.end) : null
                };
                this.setCurrentRange(currentRange);
                this.date = range.start ? new Date(range.start) : new Date();
            },
            deep: true
        },
        selectedDate: {
            handler(date) {
                const newDate = date ? new Date(date) : null;
                this.setCurrentDate(newDate);
                this.date = newDate ?? new Date();
                this.modalVisible = false;
            },
        }
    },
    mounted() {
        document.addEventListener('click', (e) => {
            let el = e.target;
            const nodes = [];
            nodes.push(el);

            while(el) {
                nodes.unshift(el.parentNode);
                el = el.parentNode;
            }

            const hasWrapper = nodes.reduce((res, element) => {
                return res || element === this.$refs.wrapperRef;
            }, false);

            if (!hasWrapper) {
                this.modalVisible = false;
            }
        });

        if (this.type === 'single') {
            this.setCurrentDate(this.currentDate);
        } else {
            this.setCurrentRange(this.currentRange);
        }
    },
    methods: {
        setDate(date) {
            this.date = new Date(date);
        },
        setCurrent(data) {
            if (this.type === 'single') {
                this.setCurrentDate(data);
            } else {
                this.setCurrentRange(data);
            }

            this.updateSelected();
        },
        setCurrentDate(date) {
            this.currentDate = date;
            this.fieldValue = getDateStr(date);
        },
        setCurrentRange(range) {
            this.currentRange = range;
            let newFieldValue = '';

            if (range.start) {
                newFieldValue += getDateStr(range.start) + ' - ';
            }

            if (range.end) {
                newFieldValue += getDateStr(range.end);
            }

            this.fieldValue = newFieldValue;
        },
        changeFieldValue(e) {
            if (this.type === 'single') {
                this.changeDateFieldValue(e);
            } else {
                this.changeRangeFieldValue(e);
            }

            this.updateSelected();
        },
        changeDateFieldValue(e) {
            const value = e.target.value;
            const filteredValue = removeExtraChars(value);
            const newDate = getDateFromStr(filteredValue);
            if (newDate) {
                this.date = newDate;
                this.currentDate = newDate;
            } else {
                this.currentDate = null;
                this.date = new Date();
            }
        },
        changeRangeFieldValue(e) {
            const value = e.target.value;
            const filteredValue = removeExtraChars(value);
            let newFieldValue = '';
            const dates = filteredValue.split('-');

            if (dates.length > 0 && getDateFromStr(dates[0])) {
                this.currentRange.start = getDateFromStr(dates[0]);
                this.date = getDateFromStr(dates[0]);
                newFieldValue += getDateStr(this.currentRange.start) + '-';
            } else {
                this.currentRange.start = null;
                this.currentRange.end = null;
                this.date = new Date();
            }

            if (this.currentRange.start && dates.length > 1 && getDateFromStr(dates[1])) {
                this.currentRange.end = getDateFromStr(dates[1]);
                newFieldValue += getDateStr(this.currentRange.end);
            } else {
                this.currentRange.end = null;
            }

            newFieldValue = removeExtraChars(newFieldValue).split('-').join(' - ');
            this.fieldValue = newFieldValue;
        },
        updateSelected() {
            if (this.type === 'single') {
                if (this.currentDate) {
                    const numberDate = this.currentDate.getTime();
                    this.$emit('setSelected', numberDate);
                }
            } else {
                if (!this.currentRange.start || !this.currentRange.end) {
                    return;
                }

                const numberRange = {
                    start: this.currentRange.start.getTime(),
                    end: this.currentRange.end.getTime()
                };

                this.$emit('setSelected', numberRange);
            }
        },
        showModal() {
            if (this.readOnly) {
                return;
            }

            this.modalVisible = true;
        }
    },
};
</script>

<style scoped>
.date-picker-modal {
    border: 1px solid #041522;
}
</style>