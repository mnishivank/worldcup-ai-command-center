import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

describe('LandingPage', () => {
  it('renders hero section and features', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    
    // Check main title
    expect(screen.getByText(/The Stadium of the/i)).toBeInTheDocument();
    
    // Check navigation buttons exist
    expect(screen.getByText('Enter Command Center')).toBeInTheDocument();
    expect(screen.getByText('Try AI Assistant')).toBeInTheDocument();

    // Check features are rendered
    expect(screen.getByText('AI Fan Assistant')).toBeInTheDocument();
    expect(screen.getByText('Smart Navigation')).toBeInTheDocument();
    expect(screen.getByText('Crowd Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Operations Command')).toBeInTheDocument();
    expect(screen.getByText('Sustainability Metrics')).toBeInTheDocument();
    expect(screen.getByText('Staff Portal')).toBeInTheDocument();
  });
});
