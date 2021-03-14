import axios from 'axios';
import { User } from '../domains/Users';
import { filterUsersData } from '../utils/helpers';

export const getUsers = async () => {
  const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return filterUsersData(data);
};
