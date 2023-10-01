import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' 
import { BrowserRouter } from 'react-router-dom' 
import Navbar from './Navbar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: jest.fn(), 
}))

describe('Navbar Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    expect(screen.getByText('Add User')).toBeInTheDocument()
  })
})
