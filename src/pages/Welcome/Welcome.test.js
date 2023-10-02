import React from 'react'
import { render, screen } from '@testing-library/react'
import Welcome from './Welcome'
import '@testing-library/jest-dom/extend-expect'

test('renders welcome message correctly', () => {
  render(<Welcome />);
  const headingElement = screen.getByRole('heading')
  const subMessage = screen.getByText('Start managing your users right now!')

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveTextContent('Welcome to CRUD')
  

  expect(subMessage).toBeInTheDocument()
})
