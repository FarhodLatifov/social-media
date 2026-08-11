import { create } from "zustand";
import { type IComment } from "../../shared/types/comment.type";
import { type IProfile } from "../../shared/types/profile.type";

interface CommentsState {
  comments: IComment[];
  addComment: (postId: number, author: IProfile, text: string) => void;
  getCommentsForPost: (postId: number) => IComment[];
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  comments: [],

  addComment: (postId, author, text) => {
    const comments = get().comments;
    const nextId = comments.length ? Math.max(...comments.map((comment) => comment.id)) + 1 : 1;
    const newComment: IComment = {
      id: nextId,
      postId,
      author,
      text,
      date: new Date().toISOString(),
    };
    set({ comments: [...comments, newComment] });
  },

  getCommentsForPost: (postId) => get().comments.filter((comment) => comment.postId === postId),
}));
