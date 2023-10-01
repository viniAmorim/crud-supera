import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Container from './Container'

describe('Container Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Container>
        <p>Container Content</p>
      </Container>
    );

    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent('Container Content');
  })
})
