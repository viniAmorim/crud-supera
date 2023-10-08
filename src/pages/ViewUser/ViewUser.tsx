import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { 
  Container,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { 
  Wrapper,
  Title, 
} from './ViewUser.styles'
import { UserForm } from '../../components/layout/Form/UserForm'

type FormValues = {
  name: string;
  email: string;
  profile: 'Admin' | 'User'; 
  age: number | null; 
  phone: string;
}

export const ViewUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state?.user

  const {
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      profile: user?.profile || 'User',
      age: user?.age || null,
      phone: user?.phone || '',
    }
  })

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Wrapper>
          <Title>View <span>User</span></Title>
            <UserForm defaultValues={user} isDisabled={true} />
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}
