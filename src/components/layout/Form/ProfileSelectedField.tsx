import { Controller } from 'react-hook-form';
import { 
  StyledLabel, 
} from '../../../pages/AddUser/AddUser.styles'
import { 
  Select 
} from '@chakra-ui/react'

const PROFILES: Record<string, { label: string; value: string }> = {
  ADMIN: {
    label: "Admin",
    value: "admin",
  },
  USER: {
    label: "User",
    value: "user",
  },
};


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
            {Object.keys(PROFILES)?.map((key) => {
              const option = PROFILES[key];

              return (
                <option key={key} value={option?.value}>
                  {option?.label}
                </option>
              )
            })}
          </Select>
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
      )}
    />
  </div>
);