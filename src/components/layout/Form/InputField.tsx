import { Flex, Input, SystemStyleObject } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask'

export const InputField: React.FC<{
  name: string;
  control: any;
  placeholder: string;
  type: string;
  error?: string | null;
  mask?: boolean;
  disabled?: boolean;
}> = ({ name, control, placeholder, type, error, mask, disabled }) => {
  const styles: Record<string, SystemStyleObject> = {
    inputLabel: {  
      marginBottom: '5px',
      marginTop: '10px',
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
                  height: '40px', 
                  verticalAlign: 'middle', 
                  paddingLeft: '10px',
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
                  height: '40px', 
                  verticalAlign: 'middle', 
                  paddingLeft: '10px',
                  
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
