import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import RootState, { UserListItem, HistoryListItem } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    userList: [],
    historyList: [],
  },
  mutations: {
    setUserList(state: RootState, arr: UserListItem[]) {
      state.userList = arr;
    },
    setHistoryList(state: RootState, item: HistoryListItem) {
      state.historyList = [...state.historyList, item];
    },
  },
  actions: {
    setUserList(context, data) {
      context.commit('setUserList', data);
    },
    setHistoryList(context, data) {
      context.commit('setHistoryList', data);
    },
  },
};

export default new Vuex.Store<RootState>(store);
