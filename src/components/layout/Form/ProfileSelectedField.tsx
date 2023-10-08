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
}> = ({ name, control, error }) => (
  <div>
    <StyledLabel>Profile</StyledLabel>
    <Controller
      name={name}
      control={control}
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