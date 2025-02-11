export type VideoType = {
  title: string;
  thumbnail: string;
  description: string;
  duration: number;
  youtubeid: string;
  date: string;
  id: string;
  fav: boolean;
};

export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
}

export type userApi = Omit<User,"password">