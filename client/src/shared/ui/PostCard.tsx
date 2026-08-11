import { useMemo, useState } from "react";
import { type IPost } from "../types/post.type";
import { useLikesStore } from "../../features/likes/likesStore";
import { useCommentsStore } from "../../features/comments/commentsStore";
import { useAuthStore } from "../../features/auth/store/authStore";

interface Props {
  post: IPost;
}

const PostCard = ({ post }: Props) => {
  const [commentText, setCommentText] = useState("");
  const likesCount = useLikesStore((state) => state.likesCount[post.id] ?? 0);
  const isLiked = useLikesStore((state) => state.likedByPost[post.id] ?? false);
  const toggleLike = useLikesStore((state) => state.toggleLike);
  const commentsList = useCommentsStore((state) => state.comments);
  const addComment = useCommentsStore((state) => state.addComment);
  const user = useAuthStore((state) => state.user);
  const comments = useMemo(
    () => commentsList.filter((comment) => comment.postId === post.id),
    [commentsList, post.id],
  );

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleComment = () => {
    if (!commentText.trim() || !user) return;
    addComment(post.id, user, commentText.trim());
    setCommentText("");
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-100 text-center leading-12 text-xl font-semibold text-slate-700">
          {post.author.displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{post.author.displayName}</p>
          <p className="text-xs text-slate-500">{new Date(post.date).toLocaleString()}</p>
        </div>
      </div>

      <p className="mt-4 text-slate-700">{post.text}</p>

      {post.image && (
        <img src={post.image} alt="Post" className="mt-4 max-h-72 w-full rounded-3xl object-cover" />
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
        <button
          type="button"
          onClick={handleLike}
          className={`rounded-full border px-3 py-2 transition ${isLiked ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        >
          {isLiked ? "❤️ Нравится" : "🤍 Лайк"} {likesCount}
        </button>
        <span>{comments.length} комментариев</span>
      </div>

      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{comment.author.displayName}</p>
            <p className="mt-1 text-sm text-slate-700">{comment.text}</p>
            <p className="mt-2 text-xs text-slate-500">{new Date(comment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Написать комментарий..."
          className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={handleComment}
          disabled={!commentText.trim()}
          className="rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Отправить
        </button>
      </div>
    </article>
  );
};

export default PostCard;
