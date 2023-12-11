<template>
    <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :readonly="readOnly"
        :maxlength="maxLength"
        :autocomplete="autocomplete"
        :disabled="disabled"
        class="text-[15px] w-[250px] border border-gray-300 rounded-sm py-2 pl-2.5 focus:border-gray-500 outline-0"
        :class="{
            'opacity-50': disabled
        }"
        @input="(e) => $emit('input', e)"
        @change="(e) => $emit('change', e)"
        style="background: #0B2031;"
    />
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    emits: ['input', 'change'],
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxLength: {
            type: Number,
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
});
</script>