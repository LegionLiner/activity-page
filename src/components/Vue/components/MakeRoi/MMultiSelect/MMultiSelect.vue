<template>
    <div
        class="relative text-[15px] w-full"
        :class="{
            'opacity-50': disabled
        }"
        ref="wrapperRef"
    >
        <div
            class="flex items-center relative py-[8px] px-[10px] border border-gray-300 rounded bg-white"
            :class="{
                'cursor-pointer': !disabled,
                'cursor-default': disabled
            }"
            @click="toggleModal"
        >
            <CheckBox
                :checked="checkedAllItems"
                :disabled="disabled"
                class="!opacity-100"
                @click="$event.stopPropagation()"
                @check="checkAllItems"
            />
            <div
                v-if="items.length && (checkedValues.length === items.length)"
                class="ml-[5px]"
            >
                Все
            </div>
            <div
                v-else-if="checkedValues.length > 0"
                class="ml-[5px]"
            >
                {{ checkedValues.length }} {{ getCountLabel(checkedValues.length, labels) }}
            </div>
            <div
                v-else
                class="field__text ml-[5px]"
            >
                {{ placeholder }}
            </div>
            <img :src="dropdownImg"
                 alt=""
                 class="absolute right-2"
                 :class="{
                    'rotate-180': modalVisible
                 }"
            >
        </div>

        <MultiSelectList
            v-model:visible="modalVisible"
            :items="listItems"
            :option-component="optionComponent"
            class="mt-0.5 w-full"
            @checkItem="checkItem"
            @closeModal="modalVisible = false"
        />
    </div>
</template>

<script lang="ts">
import dropdownImg from '../../../assets/img/dropdown.svg';
import {defineComponent, type PropType} from 'vue';
import {getCountLabel} from '../lib';
import type {DropdownItem, DropdownValue} from '../../../type';
import MultiSelectList from './MultiSelectList.vue';
import CheckBox from '../MCheckbox/MCheckbox.vue';

export default defineComponent({
    components: {CheckBox, MultiSelectList},
    emits: ['setChecked'],
    props: {
        labels: {
            type: Object as PropType<string[]>,
            default: () => {
                return ['Элемент', 'Элемента', 'Элементов'] as Object
            }
        },
        items: {
            type: Object as PropType<DropdownItem[]>,
            required: true
        },
        checked: {
            type: Object as PropType<DropdownValue[]>,
            default: [] as Object
        },
        placeholder: {
            type: String,
            default: 'Не выбрано'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        optionComponent: {
            type: Object
        },
    },
    data() {
        return {
            dropdownImg,
            modalVisible: false,
            checkedAllItems: false,
            listItems: this.items as (DropdownItem & {checked?: boolean})[],
            checkedValues: this.checked
        };
    },
    methods: {
        getCountLabel,
        toggleModal() {
            if (this.disabled) {
                return;
            }

            this.modalVisible = !this.modalVisible;
        },
        checkItem(item: DropdownItem) {
            const newCheckedValues = this.checkedValues.filter((v) => v !== item.value);

            if (newCheckedValues.length !== this.checkedValues.length) {
                this.checkedValues = newCheckedValues;
            } else {
                this.checkedValues = [...newCheckedValues, item.value];
            }

            this.updateState(this.items, this.checkedValues);
            this.$emit('setChecked', this.checkedValues);
        },
        checkAllItems() {
            if (this.checkedAllItems) {
                this.checkedValues = [];
            } else {
                this.checkedValues = this.items.map((i) => i.value);
            }

            this.updateState(this.items, this.checkedValues);
            this.$emit('setChecked', this.checkedValues);
        },
        updateState(items: DropdownItem[], checkedValues: DropdownValue[]) {
            this.checkedAllItems = items.length === checkedValues.length;
            this.listItems = items.map((i) => {
                return {...i, checked: Boolean(checkedValues.find((v) => v === i.value))};
            });
        },
    },
    watch: {
        disabled: {
            handler(newDisabled) {
                if (newDisabled) {
                    this.modalVisible = false;
                }
            }
        },
        items: {
            handler(newItems) {
                this.updateState(newItems, this.checkedValues);
            },
            deep: true
        },
        defaultCheckedValues: {
            handler(newCheckedValues) {
                this.checkedValues = newCheckedValues;
                this.updateState(this.items, newCheckedValues);
            },
            deep: true,
        },
    },
    mounted() {
        this.updateState(this.items, this.checkedValues);

        document.addEventListener('click', (e: any) => {
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
    }
});
</script>
