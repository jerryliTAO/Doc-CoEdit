interface doc {
  _id?: string;
  name?: string;
  title?: string;
  cover?: string;
  lastmodified?: string;
  owner: { name?: string };
}

interface usersInfo {
  onlineList: Array<onlineUser>;
  userList: Array<object>;
}

interface onlineUser {
  _id: string;
  name: string;
}
