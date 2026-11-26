
/** @vitest-environment jsdom */

import { test, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';
import apiRequest from '../api/api';

// Mock the backend API
vi.mock('../api/api', () => ({
  default: vi.fn()
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

// Prepare the Contact component
function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
}

// Fill in the contact form
function fillForm() {
  const inputs = screen.getAllByRole('textbox');

  fireEvent.change(inputs[0], { target: { value: 'John' } });
  fireEvent.change(inputs[1], { target: { value: 'Smith' } });
  fireEvent.change(inputs[2], { target: { value: '4165551234' } });
  fireEvent.change(inputs[3], { target: { value: 'john@example.com' } });
  fireEvent.change(inputs[4], { target: { value: 'Test message' } });

  return inputs;
}

// Test 1: Form input
test('accepts user input in the contact form', () => {
  renderContact();

  const inputs = fillForm();

  expect(inputs[0]).toHaveValue('John');
  expect(inputs[1]).toHaveValue('Smith');
  expect(inputs[2]).toHaveValue('4165551234');
  expect(inputs[3]).toHaveValue('john@example.com');
  expect(inputs[4]).toHaveValue('Test message');
});

// Test 2: Reset form
test('clears the form when Reset is clicked', () => {
  renderContact();

  const inputs = fillForm();

  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

  inputs.forEach(input => {
    expect(input).toHaveValue('');
  });
});

// Test 3: Successful submission
test('displays a thank-you message after successful submission', async () => {
  apiRequest.mockResolvedValueOnce({ message: 'Contact saved' });

  renderContact();
  fillForm();

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(await screen.findByText(
    'Thank you, John Smith. Your message has been safely saved.'
  )).toBeInTheDocument();

  expect(apiRequest).toHaveBeenCalledWith('/api/contacts', {
    method: 'POST',
    body: JSON.stringify({
      firstName: 'John',
      lastName: 'Smith',
      contactNumber: '4165551234',
      email: 'john@example.com',
      message: 'Test message'
    })
  });
});

// Test 4: Failed submission
test('displays an error when submission fails', async () => {
  apiRequest.mockRejectedValueOnce(new Error('Unable to save contact'));

  renderContact();
  fillForm();

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(await screen.findByText(
    'Error: Unable to save contact'
  )).toBeInTheDocument();
});
