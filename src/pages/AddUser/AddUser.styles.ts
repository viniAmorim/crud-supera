import styled from 'styled-components'
import InputMask from 'react-input-mask'
import { Input } from '@chakra-ui/react'

export const Wrapper = styled.div`
  display: 'flex';
  flex-direction: 'row';
  justify-content: 'center';
  align-items: 'center';
  background-color: '#cfe8fc';

  margin-top: 50px;
  padding: 20px;

  border: 1px solid #c4c4c4;
  border-radius: 5px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  span {
    color:  #fe7e00;
    text-decoration: underline;
  }
`
export const StyledLabel = styled.div`
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
`

export const FormWrapper = styled.div`
  margin: 20px 20px 20px 30px;

  input {
    padding-bottom: 30px;
  }

  label {
    margin-top: 10px;
    font-weight: bold;
  }

`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
  button {
    padding: 10px 40px;

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

export const StyledTextField = styled.div`
  width: 350px;
`

export const StyledInputMask = styled(InputMask)`
  width: 100%;
  border: solid 1px #c4c4c4;
  border-radius: 4px;
`

export const StyledInput = styled(Input)`
  background-color: #f3f3f3;
`
