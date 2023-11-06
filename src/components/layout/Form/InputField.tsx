import { Box, Flex, Input, SystemStyleObject } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { INPUT_PHONE_MASK } from '../../../config/constants'

interface InputFieldProps {
  name: string;
  control: any;
  placeholder: string;
  type: string;
  error?: string | null;
  mask?: boolean;
  disabled?: boolean;
}

export const InputField = ({ name, control, placeholder, type, error, mask, disabled }: InputFieldProps) => {
  const styles: Record<string, SystemStyleObject> = {
    inputLabel: {  
      marginBottom: '0.3125rem',
      marginTop: '0.625rem',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: 'white',
      lineHeight: 'normal', 
      height: '2.5rem', 
      verticalAlign: 'middle', 
      paddingLeft: '0.625rem',
    },
    inputMask: {
      lineHeight: 'normal', 
      height: '2.5rem', 
      verticalAlign: 'middle', 
      paddingLeft: '0.625rem',
      border: 'solid 1px #c4c4c4',
      borderRadius: '4px',
      width: '100%',
    },
    errorMessage: {
      color: 'red'
    }
  }
  
  return (
    <Box>
      <Flex sx={styles?.inputLabel}>{placeholder}</Flex>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            {mask ? (
              <Box
                as={InputMask}
                mask={INPUT_PHONE_MASK}
                maskChar=" "
                type="tel"
                data-testid="tel"
                placeholder={placeholder}
                disabled={disabled}
                sx={styles?.inputMask}
                {...field}
              />
            ) : (
              <Input 
                sx={styles?.input}
                type={type} 
                placeholder={placeholder} 
                disabled={disabled}
                data-testid="input"
                {...field} />
            )}
            {error && <Box as="span" sx={styles?.errorMessage}>{error}</Box>}
          </>
        )}
      />
    </Box>
  )
}
