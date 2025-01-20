import { IUser } from './user.types'

export interface IFriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  sender: IUser;
  receiver: IUser;
}

export interface IFriendship {
  id: string;
  userId: string;
  friendId: string;
  createdAt: Date;
}