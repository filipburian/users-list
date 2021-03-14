import React from 'react';
import { User } from '../domains/Users';
import NoResults from './NoResults';

interface UsersList {
  users: User[];
}

const UserList = ({ users }: UsersList) => (
  <div>
    {users.length ? (
      <ol className="usersList centeredItem">
        {users.map(({ id, name, username }) => (
          <li key={id}>
            <span className="boldText">{name}</span>
            <span className="userName greyFont">{`@${username}`}</span>
          </li>
        ))}
      </ol>
    ) : (
      <NoResults />
    )}
  </div>
);

export default UserList;
