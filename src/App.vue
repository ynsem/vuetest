<template>
  <div id="app">
    <div class="nav">
      <router-link class="nav__item" to="/">Главная страница</router-link>
      <router-link class="nav__item" to="/history">История</router-link>
      <router-link class="nav__item" :to="{ name: 'historyMode', params: { mode: 'add' }}"
        >История добавлений</router-link
      >
      <router-link class="nav__item" :to="{ name: 'historyMode', params: { mode: 'del' }}"
        >История удалений</router-link
      >
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  protected userList: string = "";

  mounted() {
    this.setUserList();
  }

  private setUserList() {
    return fetch(
      `${process.env.VUE_APP_SERVER_ADRESS}/${process.env.VUE_APP_API}/users`,
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          throw error;
        }

        return res.json();
      })
      .then((data: JSON) => {
        this.$store.dispatch("setUserList", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.nav__item {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav__item:hover {
  color: rgb(140, 156, 129);
}

.nav__item.router-link-exact-active {
  color: #42b983;
}
</style>
