import {type IProfile } from "./profile.type";

export interface IPost {
  id: number;
  text: string;
  image: string | null;
  date: string;
  author: IProfile;
}
