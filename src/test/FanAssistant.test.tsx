import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FanAssistant from '../pages/FanAssistant';
import { AuthProvider } from '../contexts/AuthContext';
import * as AuthContextModule from '../contexts/AuthContext';

// Mock the AuthContext so we don't have to deal with the real fetch calls in tests
vi.mock('../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../contexts/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  }
}));

describe('FanAssistant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation (authenticated)
    (AuthContextModule.useAuth as any).mockReturnValue({
      token: 'mock-token',
      isLoading: false,
      login: vi.fn()
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ text: 'Mock AI Response' }),
      })
    ) as any;
  });

  it('renders initial welcome message', () => {
    render(<FanAssistant />);
    expect(screen.getByText(/Welcome to the World Cup 2026/i)).toBeInTheDocument();
  });

  it('allows user to type in the input', () => {
    render(<FanAssistant />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello AI' } });
    expect(input).toHaveValue('Hello AI');
  });

  it('sends message and displays AI response', async () => {
    render(<FanAssistant />);
    const input = screen.getByRole('textbox');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'When is the next game?' } });
    
    if (form) fireEvent.submit(form);

    expect(screen.getByText('When is the next game?')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Mock AI Response')).toBeInTheDocument();
    });
  });

  it('blocks sending if unauthorized', async () => {
    (AuthContextModule.useAuth as any).mockReturnValue({
      token: null,
      isLoading: false,
      login: vi.fn()
    });

    render(<FanAssistant />);
    const input = screen.getByRole('textbox');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'Secret questions?' } });
    
    if (form) fireEvent.submit(form);

    await waitFor(() => {
      // The user message shouldn't appear because we are unauthorized
      expect(screen.queryByText('Secret questions?')).not.toBeInTheDocument();
    });
  });
});
