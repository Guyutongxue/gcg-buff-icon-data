<script setup lang="ts">
import { ref } from "vue";
import official from "./data/official.json";
import icons from "./data/icons.json";
import imageList from "./data/image_list.json";
import IconSelector from "./components/IconSelector.vue";
import { watch } from "vue";
import { computed } from "vue";

const m = ref<Record<string, string>>(icons);

function preventClose(event: BeforeUnloadEvent) {
  event.preventDefault();
}

watch(m.value, (value) => {
  window.addEventListener("beforeunload", preventClose);
});

const ratio = computed(() => {
  const total = official.length;
  const filled = Object.values(m.value).filter((v) => v).length;
  return `${((100 * filled) / total).toFixed(2)}%`;
});

function exportData() {
  const data = JSON.stringify(m.value, void 0, 2);
  const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "icons.json";
  a.click();
  URL.revokeObjectURL(url);
}

const filterNull = ref(false);
</script>

<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-title>gcg-buff-icon-data</v-app-bar-title>
      <template v-slot:append>
        <v-btn variant="elevated" color="green" @click="exportData">导出</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <p>
          目前图标覆盖率:
          {{ ratio }}。如果你有要补充或修正的图标，请在此页修改后，在右上角导出
          JSON 文件，随后提交 PR 到
          <a
            href="https://github.com/Guyutongxue/gcg-buff-icon-data/edit/main/src/data/icons.json"
            target="_blank"
          >
            GitHub
          </a>
          ，谢谢！
        </p>
        <v-switch
          label="仅显示无图标"
          v-model="filterNull"
          color="primary"
        ></v-switch>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">id</th>
              <th class="text-left">名称</th>
              <th class="text-left">图标</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in official" :key="item.name">
              <tr v-if="!filterNull || !m[item.id]">
                <td>{{ item.id }}</td>
                <td>
                  <v-chip v-if="item.type === 'GCG_CARD_ONSTAGE'" color="green">
                    出战
                  </v-chip>
                  <v-chip
                    v-else-if="item.type === 'GCG_CARD_SUMMON'"
                    color="purple"
                  >
                    召唤物
                  </v-chip>
                  <v-chip v-else color="orange"> 角色 </v-chip>
                  {{ item.name }}
                  <v-tooltip
                    :text="item.description"
                    activator="parent"
                    location="bottom"
                  >
                  </v-tooltip>
                </td>
                <td>
                  <icon-selector v-model="m[item.id]" :imageList="imageList" />
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-container>
    </v-main>
  </v-layout>
</template>
