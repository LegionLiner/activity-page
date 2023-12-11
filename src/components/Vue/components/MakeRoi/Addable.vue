<template>
    <div class="h-[30px]">
        <div class="flex items-center" :class="{'hidden': !fieldVisible}">
            <input v-model="text"
                   :placeholder="placeholder"
                   class="w-[150px] mr-[10px] py-[2px] border-b border-black"
                   ref="inputRef"
            >
            <img :src="roundedCheckImg" alt="" class="cursor-pointer" @click="create">
            <img :src="roundedCloseImg" alt="" class="cursor-pointer" @click="close">
        </div>
        <div class="cursor-pointer flex items-center"
             :class="{
                'hidden': fieldVisible
             }"
             @click="fieldVisible = true"
        >
            <div class="mr-[10px] py-[2px] px-[6px] border rounded">+</div>
            <div>Добавить поле</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import roundedCheckImg from '@core/src/Vue/assets/img/rounded_check.svg';
import roundedCloseImg from '@core/src/Vue/assets/img/rounded_close.svg';
import {onUpdated, ref} from "vue";

interface Props {
    placeholder?: string
}

defineProps<Props>();
const emit = defineEmits(['create']);
const fieldVisible = ref(false);
const text = ref('');
const inputRef = ref<HTMLInputElement>();

onUpdated(() => {
    if (fieldVisible.value) {
        inputRef.value?.focus();
    }
})

function create() {
    emit('create', text.value);
    close();
}

function close() {
    fieldVisible.value = false;
    text.value = '';
}
</script>