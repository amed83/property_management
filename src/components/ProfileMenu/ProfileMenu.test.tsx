import { fireEvent, render, screen } from '@testing-library/react';
import {
  AuthDispatchContext,
  AuthState,
  AuthStateContext,
} from 'providers/AuthProvider';
import { MemoryRouter } from 'react-router-dom';
import { ProfileMenu } from './ProfileMenu';

describe('ProfileMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const dispatch = jest.fn();

  const renderComponent = (mockedAuthState: AuthState) =>
    render(
      <MemoryRouter>
        <AuthStateContext.Provider value={mockedAuthState}>
          <AuthDispatchContext.Provider value={dispatch}>
            <ProfileMenu />
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
      </MemoryRouter>,
    );

  test('should the profile menu button', () => {
    renderComponent({
      isLoggedIn: false,
      isLoading: false,
      authToken: null,
      hasError: false,
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('when clicking the button it should open the menu', () => {
    renderComponent({
      isLoggedIn: false,
      isLoading: false,
      authToken: null,
      hasError: false,
    });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('it should show the correct options when the user is logged in', () => {
    renderComponent({
      isLoggedIn: true,
      isLoading: false,
      authToken: null,
      hasError: false,
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('should show the correct option when the user is not logged in', () => {
    renderComponent({
      isLoggedIn: false,
      isLoading: false,
      authToken: null,
      hasError: false,
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
