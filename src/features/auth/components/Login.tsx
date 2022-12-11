import { Box, Container, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../../../hooks/useAuthDispatch';
import { useAuthState } from '../../../hooks/useAuthState';
import { login } from '../../../providers/AuthProvider';

interface LoginProps {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const dispatch = useAuthDispatch();
  const { isLoggedIn, isLoading, hasError } = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const [inputValue, setInputValue] = useState<LoginProps>({
    email: '',
    password: '',
  });

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    login(inputValue.email, inputValue.password, dispatch);
  };

  return (
    <Container>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        marginTop="50px"
        alignItems="center"
        onSubmit={handleSubmit}
      >
        <Box display="flex" justifyContent="center" marginBottom="16px">
          <TextField
            label="e-mail"
            sx={{ marginRight: '8px' }}
            name="email"
            value={inputValue.email}
            onChange={handleChangeValue}
          />
          <TextField
            label="password"
            type="password"
            name="password"
            value={inputValue.password}
            onChange={handleChangeValue}
          />
        </Box>
        <Box>
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Login
          </LoadingButton>
        </Box>
        {hasError && (
          <Box marginTop="8px">
            <Typography>Invalid credentials. Please try again</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};
