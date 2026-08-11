import { create } from "zustand";
import { type IPost } from "../../shared/types/post.type";
import { type IProfile } from "../../shared/types/profile.type";

interface PostsState {
  posts: IPost[];
  addPost: (text: string, author: IProfile, image?: string | null) => void;
  getPostById: (id: number) => IPost | undefined;
}

const initialPosts: IPost[] = [
  {
    id: 1,
    text: "Привет! Это первая запись в вашей социальной сети.",
    image: null,
    date: new Date().toISOString(),
    author: {
      id: "farhod",
      username: "farhod",
      displayName: "Farhod",
      avatarUrl: null,
      followersCount: 0,
      followingCount: 0,
    },
  },
];

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: initialPosts,

  addPost: (text, author, image = null) => {
    const posts = get().posts;
    const nextId = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
    const newPost: IPost = {
      id: nextId,
      text,
      image: image ?? null,
      date: new Date().toISOString(),
      author,
    };

    set({ posts: [newPost, ...posts] });
  },

  getPostById: (id) => get().posts.find((post) => post.id === id),
}));
