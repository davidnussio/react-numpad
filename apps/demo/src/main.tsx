import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@repo/ui/globals.css';
import './styles.css';
import { App } from './App';

// Initialize theme on app startup
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme') || 'system';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const actualTheme = storedTheme === 'system' ? systemTheme : storedTheme;

  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(actualTheme);
};

initializeTheme();

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
