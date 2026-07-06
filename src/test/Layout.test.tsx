import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';

describe('Layout Component', () => {
  it('renders the navigation and children', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div data-testid="child-element">Content</div>
        </Layout>
      </MemoryRouter>
    );
    
    expect(screen.getByText('WorldCup AI Command')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
