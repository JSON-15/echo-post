export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar?: string;
  joinedAt: Date;
  postsCount: number;
  likesCount: number;
  commentsCount: number;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt?: Date;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  parentId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
