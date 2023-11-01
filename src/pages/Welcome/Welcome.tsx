import { Box, Flex, SystemStyleObject, Text } from '@chakra-ui/react';

export const Welcome = () => {
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1.25rem',
      marginBottom: '1.25rem',
    },
    title: {
      fontSize: '2.5em',
      marginBottom: '.5em',
    },
    titleSpan: {
      color: '#fe7e00',
      padding: '0 3em',
      alignItems: 'center',
      backgroundColor: '#333',
    },
    welcomeParagraph: {
      marginBottom: '1.5em',
      marginLeft: '2.rem8125',
      color: '#7b7b7b',
    }
  }
  
  return (
    <Flex sx={styles?.wrapper}>
      <Box>
        <Box data-testid='welcome-title' sx={styles?.title}>Welcome to <Text sx={styles?.titleSpan}>CRUD</Text></Box>
        <Box data-testid='welcome-message' sx={styles?.welcomeParagraph}>Start managing your users right now!</Box>
      </Box>
    </Flex>
  );
};
