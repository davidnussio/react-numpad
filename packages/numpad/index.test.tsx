import React from 'react';
import { render } from '@testing-library/react';
import { test } from 'vitest';
import Numpad from './index';

test('renders without crashing', () => {
  render(<Numpad />);
});
