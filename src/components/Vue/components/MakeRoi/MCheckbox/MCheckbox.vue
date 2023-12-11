<template>
    <input
        type="checkbox"
        class="checkbox"
        :class="{
            'checkbox--disabled': disabled
        }"
        :checked="currentChecked"
        :disabled="disabled"
        @change="check"
    />
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";

interface Props {
    checked?: boolean,
    disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    checked: false,
    disabled: false
});
const emit = defineEmits(['check']);

const currentChecked = ref(props.checked);

watch(() => props.checked, (newChecked) => {
    currentChecked.value = newChecked;
}, {immediate: true})

function check() {
    currentChecked.value = !currentChecked.value;
    emit('check', currentChecked.value);
}
</script>

<style scoped>
.checkbox {
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: block;
    border: 1px solid #DBDEDF;
    border-radius: 3px;
    margin: 0;
    padding: 0;

    &:checked {
        accent-color: #4C89F7;
    }

    &--disabled {
        cursor: default;
        opacity: 0.5
    }
}
</style>