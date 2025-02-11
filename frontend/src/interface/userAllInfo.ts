interface userAllInfo {
  name?: string;
  shared?: Array<doc>;
  recentOpened?: Array<recentOpened>;
  cover?: string;
  photoSticker?: string;
  allDoc?: Array<doc>;
}

interface recentOpened {
  _id?: doc;
  lastOpened?: String;
}
