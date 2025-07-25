import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactMe from '../components/ContactMe/ContactMe';

// Mock toast and emailjs
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn(), warn: jest.fn() }, ToastContainer: () => null }));
jest.mock('@emailjs/browser', () => ({ sendForm: jest.fn() }));

const mockSendForm = require('@emailjs/browser').sendForm;

describe('ContactMe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Message/i)).toBeInTheDocument();
  });

  it('shows warning for empty fields', async () => {
    render(<ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />);
    fireEvent.click(screen.getByValue(/Send message!/i));
    await waitFor(() => {
      expect(require('react-toastify').toast.warn).toHaveBeenCalled();
    });
  });

  it('validates email format', async () => {
    render(<ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />);
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByValue(/Send message!/i));
    await waitFor(() => {
      expect(require('react-toastify').toast.warn).toHaveBeenCalled();
    });
  });

  it('calls sendEmail and shows success on valid submit', async () => {
    mockSendForm.mockResolvedValue({ status: 200 });
    render(<ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />);
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Message/i), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByValue(/Send message!/i));
    await waitFor(() => {
      expect(mockSendForm).toHaveBeenCalled();
      expect(require('react-toastify').toast.success).toHaveBeenCalled();
    });
  });

  it('shows error toast on failed email send', async () => {
    mockSendForm.mockResolvedValue({ status: 500 });
    render(<ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />);
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Message/i), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByValue(/Send message!/i));
    await waitFor(() => {
      expect(require('react-toastify').toast.error).toHaveBeenCalled();
    });
  });
});
