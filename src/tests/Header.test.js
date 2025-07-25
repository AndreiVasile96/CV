import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';

describe('Header', () => {
  it('renders the header and navigation', () => {
    render(
      <Header
        refinview="header"
        scroll={() => {}}
        headerTextHighlightRef={React.createRef()}
      />
    );
    // Check for a navigation link or unique header element
    // expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
