import React, { useState, useEffect, useMemo } from 'react';
import { getUsers } from '../api/users';
import UsersList from '../components/UsersList';
import SearchInput from '../components/SearchInput';
import Loader from '../components/Loader';
import Header from '../components/Header';
import ErrorBanner from '../components/ErrorBanner';
import useTranslations from '../hooks/useTranslations';
import useDebounce from '../hooks/useDebounce';

export interface User {
  id: number;
  name: string;
  username: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslations();
  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const responseUsers = await getUsers();
        setUsers(responseUsers);
      } catch (error) {
        setError(error.response.status);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    })();
  }, []);

  const usersToDisplay = useMemo(() => {
    if (!debouncedKeyword) {
      return users;
    }
    return users.filter(({ name }) => name?.toLowerCase().includes(keyword.toLowerCase()));
  }, [debouncedKeyword, users]);

  return (
    <>
      {error && <ErrorBanner errorStatus={error} />}
      <div className="usersWrapper">
        <Header>{t('userListHeader')}</Header>
        <SearchInput onSearch={setKeyword} value={keyword} />
        {isLoading ? <Loader /> : <UsersList users={usersToDisplay} />}
      </div>
    </>
  );
};

export default Users;
