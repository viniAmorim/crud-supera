import React from 'react';
import { Controller } from 'react-hook-form';
import { StyledLabel, StyledInput, StyledInputMask } from '../../../pages/AddUser/AddUser.styles';

export const InputField: React.FC<{
  name: string;
  control: any;
  placeholder: string;
  type: string;
  error?: string | null;
  mask?: boolean;
  disabled?: boolean;
}> = ({ name, control, placeholder, type, error, mask, disabled }) => (
  <div>
    <StyledLabel>{placeholder}</StyledLabel>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          {mask ? (
            <StyledInputMask
              mask="(99) 9 9999-9999"
              maskChar=" "
              type="tel"
              data-testid="tel"
              placeholder={placeholder}
              disabled={disabled}
              style={{ lineHeight: 'normal', height: '30px', paddingTop: '25px',
              verticalAlign: 'middle', paddingLeft: '10px'}}
              {...field}
            />
          ) : (
            <StyledInput 
              type={type} 
              placeholder={placeholder} 
              disabled={disabled}
              data-testid="input"
              style={{ lineHeight: 'normal', height: '30px', paddingTop: '25px',
              verticalAlign: 'middle', paddingLeft: '10px'}}
              {...field} />
          )}
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
      )}
    />
  </div>
);
