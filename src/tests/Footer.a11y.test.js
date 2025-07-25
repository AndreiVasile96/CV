import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from '../components/Footer/Footer';

expect.extend(toHaveNoViolations);

describe('Footer accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Footer scroll={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
