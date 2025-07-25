import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ContactMe from '../components/ContactMe/ContactMe';

expect.extend(toHaveNoViolations);

describe('ContactMe accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
