import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockedUsers } from '../__mocks__/users';
import Users from '../domains/Users';
import translations from '../translations/en_GB';

const {
  noResultMessage,
  errorMessage,
  loadingMessage,
  searchPlaceholder,
  userListHeader,
} = translations;

const apiEndpoint = 'https://jsonplaceholder.typicode.com/users';

const server = setupServer(
  rest.get(apiEndpoint, (req, res, ctx) => {
    return res(ctx.json(mockedUsers));
  }),
);

describe('Users component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Should render header', () => {
    render(<Users />);
    const header = screen.getByText(userListHeader);
    expect(header).toBeInTheDocument();
    screen.debug();
  });

  test('Should render loader', () => {
    render(<Users />);
    const loader = screen.getByText(loadingMessage);
    expect(loader).toBeInTheDocument();
    screen.debug();
  });

  test('Should render input', () => {
    render(<Users />);
    const input = screen.getByPlaceholderText(searchPlaceholder) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
    screen.debug();
  });

  test('Should render error banner', async () => {
    server.use(
      rest.get(apiEndpoint, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      }),
    );

    render(<Users />);
    const errorBanner = await screen.findByText(`500 ${errorMessage}`);
    expect(errorBanner).toBeInTheDocument();
    screen.debug();
  });

  test('Should render users list', async () => {
    render(<Users />);
    expect(await screen.findByText(/Filip Burian/i)).toBeInTheDocument();
    expect(await screen.findByText(/@filipburian/i)).toBeInTheDocument();
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/@johndoe/i)).toBeInTheDocument();
  });

  test('Should display filtered users', async () => {
    render(<Users />);
    await screen.findByText(/@johndoe/i);
    const input = screen.getByPlaceholderText(searchPlaceholder) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'JO' } });

    expect(input.value).toBe('JO');
    await waitFor(() => expect(screen.queryByText(/Filip Burian/i)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/John Doe/i)).toBeInTheDocument());
  });

  test('Should filter out all users and display NoResults component', async () => {
    render(<Users />);
    await screen.findByText(/@johndoe/i);
    const input = screen.getByPlaceholderText(searchPlaceholder) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'SOME RANDOM TEXT' } });

    expect(input.value).toBe('SOME RANDOM TEXT');
    await waitFor(() => expect(screen.queryByText(/Filip Burian/i)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument());

    const noResults = screen.getByText(noResultMessage);
    expect(noResults).toBeInTheDocument();
  });
});
