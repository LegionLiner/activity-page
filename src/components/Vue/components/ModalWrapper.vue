<template>
  <div
      :class="{
        'z-[1000]': true,
        'hidden': !visible
      }"
  >
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
    },
};
</script>
