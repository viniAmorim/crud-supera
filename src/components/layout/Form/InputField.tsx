import { Controller } from 'react-hook-form';
import { 
  StyledLabel, 
  StyledInput
} from '../../../pages/AddUser/AddUser.styles'

export const InputField: React.FC<{
  name: string;
  control: any;
  placeholder: string;
  type: string;
  error?: string | null;
}> = ({ name, control, placeholder, type, error }) => (
  <div>
    <StyledLabel>{placeholder}</StyledLabel>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          <StyledInput type={type} placeholder={placeholder} {...field} />
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
      )}
    />
  </div>
);