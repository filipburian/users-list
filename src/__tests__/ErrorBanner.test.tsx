import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBanner from '../components/ErrorBanner';
import translations from '../translations/en_GB';

const mockedStatus = '404';
const { errorMessage } = translations;

test('renders ErrorBanner with status code', () => {
  render(<ErrorBanner errorStatus={mockedStatus} />);
  const banner = screen.getByText(`${mockedStatus} ${errorMessage}`);
  expect(banner).toBeInTheDocument();
});

test('renders ErrorBanner without status code', () => {
  render(<ErrorBanner />);
  let banner = screen.queryByText(`${mockedStatus} ${errorMessage} `);
  expect(banner).toBeNull();
  banner = screen.getByText(`${errorMessage}`);
  expect(banner).toBeInTheDocument();
});
