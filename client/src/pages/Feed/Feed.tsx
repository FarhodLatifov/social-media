import { useState } from "react";
import { useAuthStore } from "../../features/auth/store/authStore";
import { usePostsStore } from "../../features/posts/postsStore";
import PostCard from "../../shared/ui/PostCard";

const Feed = () => {
  const user = useAuthStore((state) => state.user);
  const posts = usePostsStore((state) => state.posts);
  const addPost = usePostsStore((state) => state.addPost);
  const [text, setText] = useState("");

  const handleCreatePost = () => {
    if (!text.trim() || !user) return;
    addPost(text.trim(), user);
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Лента</h1>
        <p className="mt-2 text-sm text-slate-600">
          Добро пожаловать, <span className="font-semibold text-slate-900">{user?.displayName ?? "пользователь"}</span>!
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Новый пост</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="О чем вы думаете?"
          className="mt-4 min-h-[140px] w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleCreatePost}
            disabled={!text.trim()}
            className="rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Опубликовать
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {posts.length ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-slate-600">
            Нет постов. Создайте первый.
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed