import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchInput from '../components/SearchInput';
import translations from '../translations/en_GB';

const { searchPlaceholder } = translations;
const mockedOnSearch = jest.fn();

test('renders SearchInput', () => {
  render(<SearchInput onSearch={mockedOnSearch} value="" />);
  const input = screen.getByPlaceholderText(searchPlaceholder);
  expect(input).toBeInTheDocument();
});
