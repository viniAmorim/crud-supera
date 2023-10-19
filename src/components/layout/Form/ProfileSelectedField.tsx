import { Controller } from 'react-hook-form';
import { 
  StyledLabel, 
} from '../../../pages/AddUser/AddUser.styles'
import { 
  Select 
} from '@chakra-ui/react'

export const ProfileSelectField: React.FC<{
  name: string;
  control: any;
  error?: string | null;
  disabled?: boolean;
}> = ({ name, control, error, disabled }) => (
  <div>
    <StyledLabel>Profile</StyledLabel>
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field }) => (
        <>
          <Select {...field}>
            <option value=""></option>
            <option value={'Admin'}>Admin</option>
            <option value={'User'}>User</option>
          </Select>
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
      )}
    />
  </div>
);