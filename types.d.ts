export type TProduct = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  [vlaue: string]: any;
};

export type TComments = {
  id: string;
  name: string;
  email: number;
  movie_id: string;
  text: string;
  date: Date;
  [vlaue: string]: any;
};

export interface IUserInfo {
  username: string;
  email: string;
  password: string;
}
