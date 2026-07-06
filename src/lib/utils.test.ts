import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('p-4 text-center', 'text-red-500')).toBe('p-4 text-center text-red-500');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    expect(cn('p-4', isActive && 'bg-blue-500', !isActive && 'bg-red-500')).toBe('p-4 bg-blue-500');
  });

  it('overrides conflicting classes using tailwind-merge', () => {
    expect(cn('p-4 bg-red-500', 'bg-blue-500')).toBe('p-4 bg-blue-500');
  });
});
