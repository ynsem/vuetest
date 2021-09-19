type userListItemType = {
  id: number | string;
  name: string;
}

export enum HistoryItemType {
  ADD = 'add',
  DEL = 'del',
}

export interface UserListItem {
  id: number | string;
  name: string;
  items: userListItemType[];
}

export interface HistoryListItem {
  id: number | string;
  name: string;
  type: HistoryItemType;
  date: Date;
}

interface RootState {
  userList: UserListItem[];
  historyList: HistoryListItem[];
}

export default RootState;
