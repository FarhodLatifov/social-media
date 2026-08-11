import { useMemo } from "react";
import { useAuthStore } from "../../features/auth/store/authStore";
import { usePostsStore } from "../../features/posts/postsStore";
import { useLikesStore } from "../../features/likes/likesStore";
import PostCard from "../../shared/ui/PostCard";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const posts = usePostsStore((state) => state.posts);
  const likesCount = useLikesStore((state) => state.likesCount);

  const userPosts = useMemo(
    () => posts.filter((post) => post.author.username === user?.username),
    [posts, user?.username],
  );

  const totalLikes = userPosts.reduce(
    (acc, post) => acc + (likesCount[post.id] ?? 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Профиль</h1>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Имя пользователя</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user?.username ?? "неизвестно"}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Отображаемое имя</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user?.displayName ?? "неизвестно"}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <p className="text-sm text-slate-500">Ваши посты</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{userPosts.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <p className="text-sm text-slate-500">Лайков к вашим постам</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalLikes}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <p className="text-sm text-slate-500">Подписчики</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{user?.followersCount ?? 0}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Ваши посты</h2>
        <div className="mt-5 space-y-4">
          {userPosts.length ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-sm text-slate-600">Вы еще не публиковали ни одного поста.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile