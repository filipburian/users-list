import React from 'react';
import { render, screen } from '@testing-library/react';
import NoResults from '../components/NoResults';
import translations from '../translations/en_GB';

const { noResultMessage } = translations;

test('renders NoResults', () => {
  render(<NoResults />);
  const loader = screen.getByText(noResultMessage);
  expect(loader).toBeInTheDocument();
});
