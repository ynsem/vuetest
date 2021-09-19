<template>
  <div class="main">
    <List :userList="plusUserList" @plusClick="addUser" />
    <List :userList="minusUserList" :minusMode="true" @minusClick="delUser" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import List from "@/components/List.vue";
import { UserListItem } from "@/types";

@Component<Main>({
  components: {
    List,
  },
})
export default class Main extends Vue {
  get userList() {
    return this.$store.state.userList;
  }

  get plusUserList(): UserListItem[] {
    return this.userList;
  }

  minusUserList: UserListItem[] = [];

  protected addUser(userId: number) {
    const clickedItemIndex: number = this.plusUserList.findIndex(
      (item: UserListItem) => item.id === userId
    );

    this.minusUserList.unshift(this.plusUserList[clickedItemIndex]);
    this.plusUserList.splice(clickedItemIndex, 1);
  }

  protected delUser(userId: number) {
    const clickedItemIndex: number = this.minusUserList.findIndex(
      (item: UserListItem) => item.id === userId
    );

    this.plusUserList.unshift(this.minusUserList[clickedItemIndex]);
    this.minusUserList.splice(clickedItemIndex, 1);
  }
}
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
