import axios from 'axios';
import { User } from '../domains/Users';
import { filterUsersData } from '../utils/helpers';

/*
  I added hardcoded value after || to save some time for setting this project up
  Normally this would only come from .env
*/
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
  const { data } = await axios.get<User[]>(`${API_DOMAIN}/users`);
  return filterUsersData(data);
};
