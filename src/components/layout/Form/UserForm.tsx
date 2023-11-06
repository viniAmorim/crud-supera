import { Box, Button, Flex, FormControl, SystemStyleObject } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { FormValues } from '../../../services/http/user'
import { InputField } from './InputField'
import { ProfileSelectField } from './ProfileSelectedField'

interface UserFormProps {
  defaultValues?: {
    name?: string;
    email?: string;
    profile?: 'Admin' | 'User';
    age?: number | null;
    phone?: string;
  };
  isDisabled?: boolean;  
	onSubmitForm?: (values: FormValues) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must have at least 3 characters')
    .max(100, 'Name must have a maximum of 100 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  profile: yup
    .string()
    .required('Profile is required'),
  phone: yup
    .string(),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .typeError('Age must be a number')
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === null || originalValue === '' ? null : value;
    }),
})

export const UserForm = ({ defaultValues, isDisabled, onSubmitForm = () => {}, }: UserFormProps) => {
  const styles: Record<string, SystemStyleObject> = {
    wrapper: {  
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '3.125rem',
      padding: '1.25rem',
      border: '1px solid #c4c4c4',
      borderRadius: '0.3125rem',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1.25rem',
    },
    button: {
      padding: '0.625rem 1.875rem',
      backgroundColor:  'black',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor:'#fe7e00',
      }
    }
  }

  const navigate = useNavigate();
  
  const {
    control,
    handleSubmit,
		formState: { errors },
  } = useForm<FormValues>({
		resolver: yupResolver(schema),
    defaultValues,
  })

  return (
    <Flex as='form' onSubmit={handleSubmit(onSubmitForm)}>
      <Box>
        <FormControl>
          <InputField name="name" control={control} placeholder="Name" type="text" disabled={isDisabled} error={errors?.name?.message} data-testid="name-input" />

          <InputField name="email" control={control} placeholder="Email" type="text" disabled={isDisabled} error={errors?.email?.message} data-testid="email-input" />

          <ProfileSelectField name="profile" control={control} disabled={isDisabled} error={errors?.profile?.message}  />

          <InputField name="phone" control={control} placeholder="Phone" type="text" mask disabled={isDisabled} />

          <InputField name="age" control={control} placeholder="Age" type="number" disabled={isDisabled} error={errors?.age?.message}  />

          <Flex sx={styles?.buttonWrapper}>
            <Button sx={styles?.button}
            onClick={() => navigate('/')}>
              Back
            </Button>

            {!isDisabled && 
              <Button sx={styles?.button} 
                type="submit"
                data-testid="submit-button"
              >Submit</Button>
            }
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  )
}
