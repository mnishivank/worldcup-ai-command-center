import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock IntersectionObserver
window.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords = () => [];
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;
