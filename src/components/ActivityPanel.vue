<template>
  <div class="main_wrapper">
        <div class="activity_wrapper">
            <PanelHeader></PanelHeader>
            <div class="main">
                <div class="group" v-for="group in groups">
                    <div class="group_info">
                        <p class="group_name">{{ group.name }}</p>
                        <img src="../assets/images/sort.svg">
                        <img class="toggler" src="../assets/images/active-panel.svg" @click="toggleGroup(group)" :class="{'reverse': !group.active }">
                    </div>
                    <GroupTable v-if="group.active" :group="group" :types="types"></GroupTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PanelHeader from './PanelHeader.vue';
import GroupTable from './GroupTable.vue';
import { Groups, Users, ActivityTypes, Info, ActivityItem } from '../interfaces';
interface Group {
    [key: number]: {
        active: boolean,
        id: number,
        name: string,
        users: {
            [key: number]: Users
        }
    }
}

const colors: string[] = ['#ffce6d', '#feff9f', '#fecaca', '#99cafd', '#C1C1C1', '#D5D8DB', '#CCFF66'];
function getRandomColor(): string {
    return colors[Math.floor(Math.random() * colors.length)]
}

let activityItems = {
    "success": true,
    "data": {
        "activity_items": [
            {
                "account_id": 9489279,
                "user_id": 575715,
                "created_at": 1702306800071,
                "duration": 100000,
                "type": 2
            },
            {
                "account_id": 9489279,
                "user_id": 575715,
                "created_at": 1702329800071,
                "duration": 1020000,
                "type": 2
            },
            {
                "account_id": 9489279,
                "user_id": 575715,
                "created_at": 1702319800071,
                "duration": 3000000,
                "type": 21
            },
            {
                "account_id": 9489279,
                "user_id": 587991,
                "created_at": 1702306800071,
                "duration": 380000,
                "type": 3
            },
            {
                "account_id": 9489279,
                "user_id": 587991,
                "created_at": 1702319800071,
                "duration": 1000000,
                "type": 1
            },
            {
                "account_id": 9489279,
                "user_id": 595125,
                "created_at": 1702306800071,
                "duration": 5300000,
                "type": 2
            }
        ]
    },
    "time": 1
};
let info = {
    "success": true,
    "data": {
        "groups": [
            {
                "id": 0,
                "name": "Отдел продаж"
            },
            {
                "id": 30321,
                "name": "Пролонгация"
            },
            {
                "id": 33834,
                "name": "СТРОГИНО"
            },
            {
                "id": 53892,
                "name": "Продажи КАСКО"
            },
            {
                "id": 53895,
                "name": "Офис"
            }
        ],
        "users": [
            {
                "name": "Никита Пивунов",
                "id": 575715,
                "group_id": 0
            },
            {
                "name": "Алик (бывш Тарабарин)",
                "id": 587991,
                "group_id": 53895
            },
            {
                "name": "Гришин Николай",
                "id": 595125,
                "group_id": 0
            },
            {
                "name": "Муталипов Али",
                "id": 629130,
                "group_id": 30321
            },
            {
                "name": "Акопкехвян Галина (стар. Куляпина)",
                "id": 3883389,
                "group_id": 53892
            },
            {
                "name": "Сивограк Наталья (стар. Казанкова,Ким)",
                "id": 3902565,
                "group_id": 0
            },
            {
                "name": "Техническая поддержка",
                "id": 6995152,
                "group_id": 33834
            },
            {
                "name": "Лаура Зорина",
                "id": 7364811,
                "group_id": 30321
            },
            {
                "name": "Трубецкая Полина",
                "id": 7419339,
                "group_id": 33834
            }
        ],
        "activity_types": [
            {
                "name": "Lead create",
                "id": 1
            },
            {
                "name": "Lead updated",
                "id": 2
            },
            {
                "name": "Lead status changed",
                "id": 3
            },
            {
                "name": "Contact create",
                "id": 21
            },
            {
                "name": "Contact updated",
                "id": 22
            },
            {
                "name": "Company created",
                "id": 41
            },
            {
                "name": "Company updated",
                "id": 42
            },
            {
                "name": "Customer created",
                "id": 61
            },
            {
                "name": "Customer updated",
                "id": 62
            },
            {
                "name": "Customer status changed",
                "id": 63
            },
            {
                "name": "Incoming call",
                "id": 81
            },
            {
                "name": "Outgoing call",
                "id": 82
            }
        ]
    },
    "time": 0.1
};

export default defineComponent({
  name: 'ActivityPanel',
  components: {
    PanelHeader,
    GroupTable
  },
  data() {
    return {
        groups: {},
        types: {}
    }
  },
  methods: {
    toggleGroup(group: any): void {
        group.active = !group.active;
    }
  },
  created() {
    let result:Group = {};
    for (let group of info.data.groups as Groups[]) {
        result[group.id] = {
            name: group.name,
            id: group.id,
            users: {},
            active: true
        }
    }
    for (let activity of activityItems.data.activity_items as ActivityItem[]) {
        for (let user of info.data.users as Users[]) {
            if (user.id == activity.user_id) {
                if (!user.activities) user.activities = [];
                user.activities.push(activity);
            }
        }
    }
    for (let user of info.data.users as Users[]) {      
        let group = result[user.group_id];
        group.users[user.id] = {
            name: user.name,
            id: user.id,
            group_id: user.group_id,
            activities: user.activities || []
        }
    } 
    this.groups = result;
    let types:{ [key: number]: Object } = {};
    for (let type of info.data.activity_types as ActivityTypes[]) {
        types[type.id] = {
            name: type.name,
            id: type.id,
            color: getRandomColor()
        }
    }
    this.types = types;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
* {
    margin: 0;
}
.main_wrapper {
    padding: 5px;
}
.activity_wrapper {
    background: #0F2231;
    padding: 15px;
    border-radius: 10px;
}
.main {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.group {
    box-sizing: border-box;
    padding: 12px;
    width: 100%;
    border-radius: 6px;
    background: #041522;
}
.group_info {
    display: flex;
    flex-direction: row;
    gap: 6px;
    position: relative;
}
.group_info img {
    cursor: pointer;
}
.group_info .toggler {
    position: absolute;
    right: 0px;
}
.group_name {
    color: #5F839A;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
}
.reverse {
    transform: rotateX(180deg);
}
</style>
