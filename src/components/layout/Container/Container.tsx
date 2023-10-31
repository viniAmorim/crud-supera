import { Flex, SystemStyleObject } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode; 
}

export const Container = ({ children }: ContainerProps) =>  {
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      width: '75rem',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 auto',
      flexWrap: 'wrap',
    },
  }
  return (
    <Flex sx={styles?.wrapper}>
      {children}
    </Flex>
  )
}

