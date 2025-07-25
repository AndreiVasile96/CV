import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Skills from '../components/Skills/Skills';

expect.extend(toHaveNoViolations);

describe('Skills accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Skills refinview="skills" headerTextHighlightRef={React.createRef()} scroll={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
