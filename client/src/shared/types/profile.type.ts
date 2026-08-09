export interface IProfile {
    id: number;
    avatar: string | null;
    username: string;
    bio: string;
    followers: number;
    following: number
}