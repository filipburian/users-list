import { User } from '../domains/Users';

export const filterUsersData = (data: User[]): User[] =>
  data.map((userData: User) => {
    const { id, name, username } = userData;
    return { id, name, username };
  });
