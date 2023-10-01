import styled from 'styled-components'

import { FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material'

export const Wrapper = styled.div`
  display: 'flex';
  flex-direction: 'row';
  justify-content: 'center';
  align-items: 'center';
  background-color: '#cfe8fc';

  margin-top: 20px;

  border: 1px solid #f4f4f4;
  border-radius: 5px;
`;

export const Title = styled.h1`
  text-align: center;

  span {
    color:  #fe7e00;
    text-decoration: underline;
  }
`
export const StyledLabel = styled(FormLabel)`
  margin-bottom: 5px;
`

export const FormWrapper = styled.div`
  margin: 20px 20px 20px 80px;

  input {
    padding-bottom: 20px;
  }

  label {
    margin-top: 10px;
    font-weight: bold;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;
  button {
    padding: 10px 60px;

    background-color: black;
    color: white;

    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #fe7e00;
    }
  }
`

export const StyledTextField = styled(TextField)`
  width: 350px;
`

