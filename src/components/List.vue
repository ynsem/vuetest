<template>
  <div class="wrapper">
    <input type="text" class="filter" v-model="filterValue" />
    <ul class="list">
      <li
        v-for="userListItem in filteredUserList"
        :key="userListItem.id"
        class="list__item"
      >
        <div class="list__item-main-block">
          {{ `id: ${userListItem.id} - ${userListItem.name}` }}
          <button
            class="list__item-control"
            @click="onControlBtnClick(userListItem)"
          >
            {{ btnMark }}
          </button>
        </div>
        <div class="list__item-additional-block">
          {{ userListItem.items[0].name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserListItem, HistoryItemType } from "@/types";

interface filteredUserList extends UserListItem {
  counter: number;
}

@Component
export default class List extends Vue {
  @Prop() protected userList!: UserListItem[];
  @Prop() protected minusMode!: boolean;

  protected filterValue: string = "";

  get filteredUserList() {
    return this.sortFilteredList(
      this.listFilter(this.userList, this.filterValue)
    );
  }

  get btnMark() {
    return !this.minusMode ? "+" : "-";
  }

  private onPlusBtnClick(userListItem: UserListItem) {
    this.$emit("plusClick", userListItem.id);
    this.$store.dispatch("setHistoryList", {
      id: userListItem.id,
      name: userListItem.name,
      type: HistoryItemType.ADD,
      date: new Date(),
    });
  }

  private onMinusBtnClick(userListItem: UserListItem) {
    this.$emit("minusClick", userListItem.id);
    this.$store.dispatch("setHistoryList", {
      id: userListItem.id,
      name: userListItem.name,
      type: HistoryItemType.DEL,
      date: new Date(),
    });
  }

  protected onControlBtnClick(userListItem: UserListItem) {
    return !this.minusMode
      ? this.onPlusBtnClick(userListItem)
      : this.onMinusBtnClick(userListItem);
  }

  private listFilter(list: UserListItem[], value: string): filteredUserList[] {
    return list
      .map((item) =>
        Object.assign(item, {
          counter:
            item.name.toLowerCase().split(value).length -
            1 +
            item.items[0].name.toLowerCase().split(value).length -
            1,
        })
      )
      .filter((item) => item.counter);
  }

  private sortFilteredList(list: filteredUserList[]): filteredUserList[] {
    return list.sort((a, b) => b.counter - a.counter);
  }
}
</script>

<style scoped>
.list {
  width: 200px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.list__item {
  list-style: none;
  padding: 10px 0;
}

.list__item-main-block {
  display: flex;
  justify-content: space-between;
}

.list__item-additional-block {
  display: flex;
  justify-content: start;
  font-size: 12px;
  color: gray;
}

.filter {
  width: 200px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
