import React from 'react';
import { render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import your Redux store configuration
import ProtectedRoutes from '../../components/Auth components/ProtectedRoutes';
import Home from '../../pages/Home'

const mockStore = configureStore([]);

describe('ProtectedRoutes', () => {

  test('snapshot of loader component', () => {
    const store = mockStore({ user: { email: 'test@example.com' } });
    const { container } = render(<Provider store={store}>
      <MemoryRouter>
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      </MemoryRouter>
    </Provider>);
    expect(container).toMatchSnapshot();
  });

  test('renders children components when user is authenticated', async() => {
    const store = mockStore({ user: { email: 'shiva@gmail.com' } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        </MemoryRouter>
      </Provider>
    );

    const childComponent = await screen.findByText(/kanban board/i);
    expect(childComponent).toBeInTheDocument();
  });
});
