<template>
  <ActivityPanel></ActivityPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ActivityPanel from './components/ActivityPanel.vue';

export default defineComponent({
  name: 'App',
  components: {
    ActivityPanel
  }
});
</script>

<style>
body {
  margin: 0;
  background: #153042;
  font-family: PT Sans;
  overflow-x: hidden;
}
body::-webkit-scrollbar {
  width: 6px;
}
body::-webkit-scrollbar-track {
  background: rgba(4, 21, 34, 1);
}
body::-webkit-scrollbar-thumb {
  background-color: rgba(95, 131, 154, 1);
  border-radius: 10px;
}
</style>
