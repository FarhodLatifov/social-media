import { create } from "zustand";

interface LikesState {
  likedByPost: Record<number, boolean>;
  likesCount: Record<number, number>;
  toggleLike: (postId: number) => void;
  getLikesCount: (postId: number) => number;
  isLiked: (postId: number) => boolean;
}

export const useLikesStore = create<LikesState>((set, get) => ({
  likedByPost: {},
  likesCount: {},

  toggleLike: (postId) => {
    const liked = get().likedByPost[postId] ?? false;
    const current = get().likesCount[postId] ?? 0;
    const updatedCount = liked ? Math.max(current - 1, 0) : current + 1;

    set((state) => ({
      likedByPost: { ...state.likedByPost, [postId]: !liked },
      likesCount: { ...state.likesCount, [postId]: updatedCount },
    }));
  },

  getLikesCount: (postId) => get().likesCount[postId] ?? 0,

  isLiked: (postId) => get().likedByPost[postId] ?? false,
}));
