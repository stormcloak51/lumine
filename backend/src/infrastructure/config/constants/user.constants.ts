export const userSelect = {
  id: true,
  username: true,
  email: true,
  name: true,
  surname: true,
  bio: true,
  userAvatar: true,
  userCover: true,
  created_at: true,
  updated_at: true,
  role: true,
  password: false
  
} as const;

export type UserSelect = typeof userSelect