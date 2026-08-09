export interface IProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio?: string;
  followersCount: number;
  followingCount: number;
}