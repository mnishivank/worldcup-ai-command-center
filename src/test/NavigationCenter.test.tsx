import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationCenter from '../pages/NavigationCenter';

// Mock the react-google-maps to avoid trying to load actual API in JSDOM
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: any) => <div>{children}</div>,
  Map: ({ children }: any) => <div data-testid="mock-map">{children}</div>,
  AdvancedMarker: ({ children }: any) => <div data-testid="mock-marker">{children}</div>,
  Pin: () => <div data-testid="mock-pin" />
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

describe('NavigationCenter', () => {
  it('renders title and map by default', () => {
    render(<NavigationCenter />);
    expect(screen.getByText('Smart Navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
  });

  it('can switch to routes tab', () => {
    render(<NavigationCenter />);
    const routesTab = screen.getByRole('tab', { name: /route planner/i });
    
    fireEvent.click(routesTab);
    
    expect(routesTab).toHaveAttribute('aria-selected', 'true');
  });

  it('can click generate route', () => {
    render(<NavigationCenter />);
    const generateBtn = screen.getByText('Generate Route');
    
    fireEvent.click(generateBtn);
    
    expect(screen.getByText('Analyzing Density...')).toBeInTheDocument();
  });
});
