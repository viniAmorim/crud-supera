import { render, screen, fireEvent } from '@testing-library/react'
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

    const logo = screen.getByAltText('welcome')
    const addUserButton = screen.getByText('ADD USER')
    
    expect(logo).toBeInTheDocument()
    expect(addUserButton).toBeInTheDocument()
  })

  it('navigates to /add-user when "ADD USER" button is clicked', () => {
    const { useNavigate } = require('react-router-dom')
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate)

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const addUserButton = screen.getByText('ADD USER')
    fireEvent.click(addUserButton)

    expect(mockNavigate).toHaveBeenCalledWith('/add-user')
  })
})
