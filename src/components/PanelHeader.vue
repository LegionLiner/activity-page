<template>
    <div class="header">
                <div class="head_title_block">
                    <p>Панель активности</p>
                </div>
                <div class="filter_block">
                    <div class="filter users">
                        <MMultiSelect :labels="['Элемент','Элемента','Элементов']" :items="[{'value':1,'title':'item1'},{'value':2,'title':'item2'}]" :checked="[1]" placeholder="Выберите элементы" :disabled="false" @set-checked="setChecked"></MMultiSelect>
                        <!-- <img src="images/user.svg"> -->
                    </div>
                    <div class="filter date">
                        <MDate></MDate>
                        <!-- <img src="images/date.svg"> -->
                    </div>
                    <div class="filter activities">
                        <MMultiSelect :labels="['Элемент','Элемента','Элементов']" :items="[{'value':1,'title':'item1'},{'value':2,'title':'item2'}]" :checked="[1]" placeholder="Выберите элементы" :disabled="false" @set-checked="setChecked"></MMultiSelect>
                            <!-- <img src="images/activity.svg"> -->
                    </div>
                </div>
            </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MMultiSelect from './Vue/components/MakeRoi/MMultiSelect/MMultiSelect.vue';
import MDate from './Vue/components/MakeRoi/MDate/MDate.vue';

export default defineComponent({
    name: "PanelHeader",
    components: {
        MMultiSelect,
        MDate
    }
});
</script>

<style scoped>
.head_title_block {
    color: #F5F5F5;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
}
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}
.filter_block {
    display: flex;
    gap: 10px;
}
.filter {
    box-sizing: border-box;
    background-color: #0B2031;
    border-radius: 10px;
    height: 34px;
    width: 200px;
    color: #5F839A;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
    cursor: pointer;
}
.filter:hover {
    background-color: #041522;
}
@media (width < 700px) {
    .header {
        flex-direction: column;
        gap: 20px;
    }
}
@media (width < 530px) {
    .filter_block {
        flex-direction: column;
    }
    .filter {
        width: 100%;
    }
}
</style>