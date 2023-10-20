import React from 'react';
import { render } from '@testing-library/react';
import { Container } from './Container';

describe('Container Component', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Container>
        <p>Container Content</p>
      </Container>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Container Content')).toBeDefined();
  });
});
