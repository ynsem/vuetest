<template>
  <div class="history">
    <HistoryList v-if="historyList.length" :historyList="historyList" />
    <h1 class="history__empty" v-else>Нет истории действий</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HistoryListItem } from "@/types";
import HistoryList from "@/components/HistoryList.vue";

@Component<History>({
  components: {
    HistoryList,
  },
})
export default class History extends Vue {
  get historyList() {
    return this.$store.state.historyList.filter((item: HistoryListItem) => {
      if (this.$route.params.mode) {
        return item.type === this.$route.params.mode;
      }
      return item;
    });
  }
}
</script>

<style scoped>
.history__empty {
  font-size: 20px;
}
</style>

