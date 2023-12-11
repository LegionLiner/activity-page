<template>
    <ModalWrapper
        class="absolute bg-white"
        :visible="visible"
        @set-visible="$emit('update:visible')"
    >
        <div class="border border-gray-300 rounded-sm">
            <div
                v-for="item in items"
                :key="item.value"
                class="cursor-pointer flex items-center px-2.5 py-1.5 hover:bg-gray-100"
                @click="$emit('selectItem', item)"
            >
                <component v-if="optionComponent" :is="optionComponent" :item="item"/>
                <SelectOption v-else :item="item"/>
            </div>
        </div>
    </ModalWrapper>
</template>

<script>
import ModalWrapper from '../../ModalWrapper.vue';
import SelectOption from './MSelectOption.vue';

export default {
    components: {SelectOption, ModalWrapper},
    emits: ['selectItem'],
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            required: true
        },
        optionComponent: {
            type: Object
        },
    },
};
</script>

<style scoped>

</style>