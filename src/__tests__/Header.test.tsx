import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import translations from '../translations/en_GB';

const headerText = translations.userListHeader;

test('renders Header', () => {
  render(<Header>{headerText}</Header>);
  const text = screen.getByText(translations.userListHeader);
  expect(text).toBeInTheDocument();
});
