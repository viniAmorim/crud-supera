import { ReactNode } from 'react'
import { ContainerWrapper } from './Container.styles'

interface ContainerProps {
  children: ReactNode; 
}

export const Container = ({ children }: ContainerProps) =>  {
  return (
    <ContainerWrapper>
      {children}
    </ContainerWrapper>
  )
}

