<template>
    <div
        class="w-2 h-2 border-l border-b border-gray-600"
        :class="{
        'arrow--left': direction === 'left',
        'arrow--right': direction === 'right'
      }"
    ></div>
</template>

<script>
export default {
    props: {
        direction: {
            type: String,
            required: true
        }
    }
};
</script>

<style>
    .arrow--left {
        transform: rotate(45deg);
    }
    .arrow--right {
        transform: rotate(-135deg);
    }
</style>