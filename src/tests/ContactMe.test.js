import React from "react";
import {
  render, screen, fireEvent, waitFor
} from "@testing-library/react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import ContactMe from "../components/ContactMe/ContactMe";
import { resetViewportWidth } from "./viewport";

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn(), warn: jest.fn() },
  ToastContainer: () => null
}));
jest.mock("@emailjs/browser", () => ({ sendForm: jest.fn() }));

const props = { refinview: "contactMe", headerTextHighlightRef: React.createRef() };

const fillForm = ({ name = "Test User", email = "test@example.com", message = "Hello there!" } = {}) => {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: name } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: message } });
};

const submit = () => fireEvent.click(screen.getByRole("button", { name: /send/i }));

describe("ContactMe", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    resetViewportWidth();
    process.env = {
      ...originalEnv,
      REACT_APP_EMAILJS_SERVICE_ID: "service_test",
      REACT_APP_EMAILJS_TEMPLATE_ID: "template_test",
      REACT_APP_EMAILJS_PUBLIC_KEY: "public_test"
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders every field declared in contactMe.json", () => {
    render(<ContactMe {...props} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("warns and does not send when the form is empty", async () => {
    render(<ContactMe {...props} />);
    submit();

    await waitFor(() => expect(toast.warn).toHaveBeenCalled());
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it("warns and does not send when the email is malformed", async () => {
    render(<ContactMe {...props} />);
    fillForm({ email: "invalidemail" });
    submit();

    await waitFor(() => expect(toast.warn).toHaveBeenCalled());
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it("sends and clears the form on success", async () => {
    emailjs.sendForm.mockResolvedValue({ status: 200 });
    render(<ContactMe {...props} />);
    fillForm();
    submit();

    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      expect.anything(),
      "public_test"
    );
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("shows an error toast on a non-200 response", async () => {
    emailjs.sendForm.mockResolvedValue({ status: 500 });
    render(<ContactMe {...props} />);
    fillForm();
    submit();

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("shows an error toast when EmailJS rejects", async () => {
    emailjs.sendForm.mockRejectedValue(new Error("network down"));
    render(<ContactMe {...props} />);
    fillForm();
    submit();

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });

  it("does not attempt a send when the EmailJS credentials are missing", async () => {
    delete process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    render(<ContactMe {...props} />);
    fillForm();
    submit();

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });
});
