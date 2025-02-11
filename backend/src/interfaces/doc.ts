interface User {
  _id: string;
  email: string;
  name: string;
  photoSticker: string;
}

interface Doc {
  _id: string;
  title: string;
  owner: User;
  content: string;
}

interface recentOpened {
  _id: string;
  recentOpened: Date;
}
