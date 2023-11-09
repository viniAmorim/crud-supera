import {
  Box,
  Flex,
  Select, 
  SystemStyleObject
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { PROFILES } from '../../../../config/constants'

interface ProfileSelectFielddProps {
  name: string;
  control?: any;
  error?: string | null;
  disabled?: boolean;
}

export const ProfileSelectField = ({ name, control, error, disabled }: ProfileSelectFielddProps) => {
  const styles: Record<string, SystemStyleObject> = {
    inputLabel: {  
      marginBottom: '0.3125rem',
      marginTop: '0.625rem',
      fontWeight: 'bold',
    },
    errorMessage: {
      color: 'red'
    }
  }

  return(
    <Box>
      <Flex sx={styles?.inputLabel}>Profile</Flex>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        render={({ field }) => (
          <>
            <Select 
              {...field}
              data-testid="profile"  
            >
            <option></option>
              {Object.keys(PROFILES)?.map((key) => {
                const option = PROFILES[key];

                return (
                  <option key={key} value={option?.value}>
                    {option?.label}
                  </option>
                )
              })}
            </Select>
            {error && <Box as="span" sx={styles?.errorMessage}>{error}</Box>}
          </>
        )}
      />
    </Box>
)}