import { type IProfile } from "./profile.type";

export interface IComment {
  id: number;
  postId: number;
  author: IProfile;
  text: string;
  date: string;
}
