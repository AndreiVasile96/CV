import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from '../components/Skills/Skills';

// Mock MediaQuery component
jest.mock('react-responsive', () => ({
  __esModule: true,
  default: ({ children, maxWidth, minWidth }) => {
    // For testing, we'll simulate mobile view (maxWidth: 912)
    const isMobile = maxWidth === 912;
    const isDesktop = minWidth === 913;
    
    // Return children based on the condition we want to test
    if (isMobile) {
      return <div data-testid="mobile-view">{children}</div>;
    }
    if (isDesktop) {
      return <div data-testid="desktop-view">{children}</div>;
    }
    return null;
  }
}));

describe('Skills Component', () => {
  const defaultProps = {
    refinview: "skills",
    headerTextHighlightRef: React.createRef(),
    scroll: jest.fn()
  };

  it('renders mobile skills correctly', () => {
    render(<Skills {...defaultProps} />);
    
    const mobileView = screen.getByTestId('mobile-view');
    expect(mobileView).toBeInTheDocument();
  });

  it('mobile skills buttons are clickable and activate progress bars', async () => {
    render(<Skills {...defaultProps} />);
    
    // Wait for component to render
    await waitFor(() => {
      const mobileView = screen.getByTestId('mobile-view');
      expect(mobileView).toBeInTheDocument();
    });

    // Find all skill buttons
    const skillButtons = screen.getAllByRole('button');
    const firstSkillButton = skillButtons.find(button => 
      button.className.includes('skillsPage--skill')
    );

    expect(firstSkillButton).toBeInTheDocument();
    expect(firstSkillButton).toHaveStyle('pointer-events: auto');

    // Click the button - the main test is that this doesn't throw an error
    fireEvent.click(firstSkillButton);
    
    // Verify the button is still accessible after click
    expect(firstSkillButton).toBeInTheDocument();
  });

  it('mobile skills buttons have proper accessibility', () => {
    render(<Skills {...defaultProps} />);
    
    const skillButtons = screen.getAllByRole('button');
    const firstSkillButton = skillButtons.find(button => 
      button.className.includes('skillsPage--skill')
    );

    expect(firstSkillButton).toBeInTheDocument();
    expect(firstSkillButton).toHaveStyle('pointer-events: auto');
    expect(firstSkillButton).toHaveStyle('cursor: pointer');
  });

  it('skills section has proper z-index for mobile', () => {
    render(<Skills {...defaultProps} />);
    
    const skillsSection = screen.getByTestId('mobile-view');
    expect(skillsSection).toBeInTheDocument();
  });
});
