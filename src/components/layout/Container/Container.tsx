import React from 'react';
import { ReactNode } from 'react'
import { ContainerWrapper } from './Container.styles';

interface ContainerProps {
  children: ReactNode; 
}

export default function Container({ children }: ContainerProps) {
  return (
    <ContainerWrapper>
      {children}
    </ContainerWrapper>
  )
}

