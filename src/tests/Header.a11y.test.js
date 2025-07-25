import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '../components/Header/Header';

expect.extend(toHaveNoViolations);

describe('Header accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Header refinview="header" scroll={() => {}} headerTextHighlightRef={React.createRef()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
