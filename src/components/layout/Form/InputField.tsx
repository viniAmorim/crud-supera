import { Flex, Input, SystemStyleObject } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask'

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
      marginBottom: '0.3125rem10',
      marginTop: '0.625rem',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: 'white',
    },
  }
  
  return (
    <div>
      <Flex sx={styles?.inputLabel}>{placeholder}</Flex>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            {mask ? (
              <InputMask
                mask="(99) 9 9999-9999"
                maskChar=" "
                type="tel"
                data-testid="tel"
                placeholder={placeholder}
                disabled={disabled}
                style={{ 
                  lineHeight: 'normal', 
                  height: '2.5rem', 
                  verticalAlign: 'middle', 
                  paddingLeft: '0.625rem',
                  border: 'solid 1px #c4c4c4',
                  borderRadius: '4px',
                  width: '100%',
                }}
                {...field}
              />
            ) : (
              <Input 
                sx={styles?.input}
                type={type} 
                placeholder={placeholder} 
                disabled={disabled}
                data-testid="input"
                style={{ 
                  lineHeight: 'normal', 
                  height: '2.5rem', 
                  verticalAlign: 'middle', 
                  paddingLeft: '0.625rem',
                  
                }}
                {...field} />
            )}
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </>
        )}
      />
    </div>
  )
}
