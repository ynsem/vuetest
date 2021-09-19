<template>
  <div>
    <ul class="history-list">
      <li
        v-for="(historyListItem, index) in historyList"
        :key="`${historyListItem.id}__${index}`"
        class="history-list__item"
      >
        <p class="history-list__item-title">
          {{ `id: ${historyListItem.id} - ${historyListItem.name}` }}
        </p>
        <p class="history-list__item-type">
          {{ historyItemTypeTitle(historyListItem.type) }}
        </p>
        <p class="history-list__item-date">{{ historyListItem.date }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HistoryListItem, HistoryItemType } from "@/types";

@Component
export default class HistoryList extends Vue {
  @Prop() protected historyList!: HistoryListItem[];

  protected historyItemTypeTitle(type: HistoryItemType) {
    switch (type) {
      case HistoryItemType.ADD:
        return "Добавлен";
      case HistoryItemType.DEL:
        return "Удален";
      default:
        return;
    }
  }
}
</script>

<style scoped>
.history-list {
  padding: 0;
  margin: 0 auto;
}

.history-list__item {
  list-style: none;
  padding: 10px 0;
}

.history-list__item p {
  padding: 0;
  margin: 0;
}

.history-list__item-type,
.history-list__item-date {
  font-size: 12px;
  color: gray;
}
</style>

