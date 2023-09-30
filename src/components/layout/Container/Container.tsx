import { ReactNode } from 'react'
import { ContainerWrapper } from './Container.styles';

interface ContainerProps {
  children: ReactNode; 
}

function Container({ children }: ContainerProps) {
  return (
    <ContainerWrapper>
      {children}
    </ContainerWrapper>
  )
}

export default Container;
