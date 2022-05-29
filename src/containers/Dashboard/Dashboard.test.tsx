import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from '.';
import { server } from '../../mocks/server';

describe('Properties', () => {
  test('should render loading message while loading data', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('...Loading')).toBeInTheDocument();
    });
  });

  test('should render a list of two properties', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const list = screen.getByRole('list');
      expect(list.childNodes.length).toBe(3);
    });
  });

  test('should render an error message when failing to fetch the properties list', async () => {
    server.use(
      rest.get('/properties/', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: `Internal Server Error`,
          }),
        );
      }),
    );

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

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(screen.getAllByTestId('property_status')[0].textContent).toBe(
        'Property status: expired',
      );
    });
  });
});
