<template>
    <div class="min-w-[80px] w-[100%] text-[15px] relative" ref="wrapperRef">
        <div
            class="cursor-pointer flex items-center w-full max-h-[30px] py-2 px-2.5 bg-white relative"
            :class="{
                '!cursor-default opacity-50': disabled,
                'rounded-[3px] border-none':rounded,
                'rounded-sm border border-gray-300':!rounded
            }"
            :style="{...fieldStyle}"
            @click="toggleModal">
            <div
                v-if="selectedItem"
                class="max-w-[95%] text-gray-700 overflow-ellipsis overflow-hidden whitespace-nowrap"

            >
                {{ selectedItem.title }}
            </div>
            <div
                v-else
                class="max-w-[95%] text-gray-400 overflow-ellipsis overflow-hidden whitespace-nowrap"
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

        <SelectList
            :visible="modalVisible"
            :items="currentItems"
            :option-component="optionComponent"
            class="w-full mt-0.5"
            @selectItem="selectItem"
        />
    </div>
</template>

<script>
import dropdownImg from '../../../assets/img/dropdown.svg';
import SelectList from './MSelectList.vue';

export default {
    components: {SelectList},
    emits: ['select'],
    props: {
        items: {
            type: Array,
            required: true
        },
        selected: {
            type: [Number, String],
            default: ''
        },
        firstItem: {
            type: Object,
        },
        placeholder: {
            type: String,
            default: 'Не выбрано'
        },
        optionComponent: {
            type: Object
        },
        disabled: {
            type: Boolean,
            default: false
        },
        fieldStyle: {
            type: Object,
            default: () => ({})
        },
        rounded:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            dropdownImg,
            modalVisible: false,
            selectedItem: null,
        };
    },
    computed: {
        currentItems() {
            let withSelectedItems = this.firstItem ? [this.firstItem, ...this.items] : this.items;
            withSelectedItems = withSelectedItems.map((item) => ({
                ...item,
                selected: this.selectedItem && (item.value === this.selectedItem.value)
            }));

            return withSelectedItems;
        },
    },
    watch: {
        selected(value) {
            this.updateSelectedItem(value);
        },
        disabled(newDisabled) {
            if (newDisabled) {
                this.modalVisible = false;
            }
        }
    },
    methods: {
        toggleModal() {
            if (this.disabled) {
                return;
            }

            this.modalVisible = !this.modalVisible;
        },
        selectItem(item) {
            this.modalVisible = false;
            this.selectedItem = item;
            this.$emit('select', item.value);
        },
        updateSelectedItem(value) {
            this.selectedItem = this.currentItems.find((item) => item.value === value);
        }
    },
    mounted() {
        this.updateSelectedItem(this.selected);

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
    },
};
</script>

<style lang="scss" scoped>
</style>