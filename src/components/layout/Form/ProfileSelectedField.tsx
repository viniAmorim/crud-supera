import { Controller } from 'react-hook-form';
import { 
  StyledLabel, 
} from '../../../pages/AddUser/AddUser.styles'
import { 
  Select 
} from '@chakra-ui/react'

export const PROFILES: Record<string, { label: string; value: string }> = {
  ADMIN: {
    label: "admin",
    value: "admin",
  },
  USER: {
    label: "user",
    value: "user",
  },
};

export const ProfileSelectField: React.FC<{
  name: string;
  control?: any;
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
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
      )}
    />
  </div>
);