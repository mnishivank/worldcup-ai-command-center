import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CommandCenter from '../pages/CommandCenter';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  toast: vi.fn()
}));

describe('CommandCenter', () => {
  it('renders title and incidents', () => {
    render(<CommandCenter />);
    expect(screen.getByText('Operations Command Center')).toBeInTheDocument();
    expect(screen.getByText('Medical Emergency at Sector 4')).toBeInTheDocument();
  });

  it('triggers execute AI recommendations', async () => {
    render(<CommandCenter />);
    const executeButton = screen.getByText('Execute AI Recommendations');
    
    fireEvent.click(executeButton);
    
    expect(screen.getByText('Transmitting Directives...')).toBeInTheDocument();
    
    // Fast forward or wait for toast would be ideal, but testing state change is good enough for now.
    expect(executeButton).toBeDisabled();
  });

  it('can assign team to incident', () => {
    render(<CommandCenter />);
    const buttons = screen.getAllByText('Assign Team');
    fireEvent.click(buttons[0]);
    expect(toast.success).toHaveBeenCalledWith('Team assigned to: Medical Emergency at Sector 4');
  });
});
