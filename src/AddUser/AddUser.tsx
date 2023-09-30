import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';

import { Wrapper, Title, FormWrapper } from './AdUser.styles'

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Add User</Title>

          <FormWrapper>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <TextField></TextField>

              <FormLabel>Email</FormLabel>
              <TextField></TextField>

              <FormLabel>Age</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={age}
                //onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

              <FormLabel>Phone</FormLabel>
              <TextField></TextField>
              <FormLabel>Age</FormLabel>
              <TextField></TextField>
              <Button>Submit</Button>
            </FormControl>
          </FormWrapper>
          
        </Wrapper>
        
      </Container>
    </React.Fragment>
  );
}