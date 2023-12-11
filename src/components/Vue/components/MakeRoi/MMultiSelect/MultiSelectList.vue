<template>
  <ModalWrapper
      class="absolute bg-white"
      :visible="visible"
      @set-visible="$emit('update:visible')"
  >
    <div class="list">
      <div
          v-for="item in items"
          :key="item.value"
          class="item cursor-default"
      >
        <div class="mr-1.5">
          <CheckBox
              :checked="item.checked"
              class="cursor-pointer"
              @click="$event.stopPropagation()"
              @check="$emit('checkItem', item)"
          />
        </div>
        <component v-if="optionComponent" :is="optionComponent" :item="item" />
        <MultiSelectOption v-else :item="item" />
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '../../ModalWrapper.vue';
import CheckBox from '../MCheckbox/MCheckbox.vue';
import MultiSelectOption from './MultiSelectOption.vue';

export default {
    components: {MultiSelectOption, CheckBox, ModalWrapper},
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
.list {
  border: 1px solid #041522;
  border-radius: 3px;
}
.item {
  display: flex;
  align-items: center;
  padding: 6px 10px;

  &:hover {
    background-color: #041522;
  }
}
</style>