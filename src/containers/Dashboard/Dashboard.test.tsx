import { render, screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from '.';

describe('Properties', () => {
  test('should render loading message while loading data', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    expect(await screen.findByText('...Loading')).toBeInTheDocument();
  });

  test('should render a list of two properties', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    const list = await screen.findByRole('list');
    expect(list.childNodes.length).toBe(3);
  });

  test('should render an error message when failing to fetch the properties list', async () => {
    const mockedServer = setupServer(
      rest.get('/properties', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: `Internal Server Error`,
          }),
        );
      }),
    );

    mockedServer.listen({ onUnhandledRequest: 'warn' });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByText('Internal Server Error'),
    ).toBeInTheDocument();
    mockedServer.close();
  });

  test('should render the proper message when there is no properties to show', async () => {
    const mockedServer = setupServer(
      rest.get('/properties', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      }),
    );

    mockedServer.listen({ onUnhandledRequest: 'warn' });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByText(`Sorry there's no property to show`),
    ).toBeInTheDocument();

    mockedServer.close();
  });

  test('should change the status of the property when the button is clicked', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    const buttons = await screen.findAllByText('Change Status');
    fireEvent.click(buttons[0]);
    const propertiesStatus = await screen.findAllByTestId('property_status');
    expect(propertiesStatus[0].textContent).toBe('Property status: expired');
  });
});
