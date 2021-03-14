import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from '../components/UsersList';
import { mockedUsers } from '../__mocks__/users';

test('renders UsersList', () => {
  render(<UsersList users={mockedUsers} />);

  expect(screen.getByText(/Filip Burian/i)).toBeInTheDocument();
  expect(screen.getByText(/@filipburian/i)).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/@johndoe/i)).toBeInTheDocument();
});
