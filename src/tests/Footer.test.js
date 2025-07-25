import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';

describe('Footer', () => {
  it('renders the footer and contact info', () => {
    render(<Footer scroll={() => {}} />);
    // Check for the email address (should be unique)
    expect(screen.getAllByText('andreisvasile@gmail.com').length).toBeGreaterThan(0);
  });
});
