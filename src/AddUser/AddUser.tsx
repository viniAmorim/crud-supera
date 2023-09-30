import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Wrapper, Title, FormWrapper } from './AddUser.styles';

type FormValues = {
  name: string;
  email: string;
  age: number;
  phone: string;
};

export default function SimpleContainer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Wrapper>
          <Title>Add User</Title>

          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.name && <span>This field is required</span>}

                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.email && <span>This field is required</span>}

                <FormLabel>Age</FormLabel>
                <Controller
                  name="age"
                  control={control}
                  defaultValue={10}
                  render={({ field }) => (
                    <Select {...field} label="Age">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  )}
                />

                <FormLabel>Phone</FormLabel>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.phone && <span>This field is required</span>}

                <Button type="submit">Submit</Button>
              </FormControl>
            </form>
          </FormWrapper>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
