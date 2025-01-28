import * as React from 'react';

import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import styled from '@emotion/styled'

import { AuthFormInput } from './authFormInput';

const FormContainer = styled.div`
  width: 25%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px #DDDDDD;
  border-radius: 20px;
  padding: 50px;
  gap: 2px;
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
`

const ContainerLabel = styled.div`
  width: full;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`

export const SignInForm = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
        <FormContainer >
          <ContainerLabel>
            <KitchenOutlinedIcon 
              color='primary'
              sx={{
                fontSize: 50,
              }}
            />
            <Typography
              component="p"
              variant="inherit"
              sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Welcome back to <br/>
              Smart Fridge Chef
            </Typography>
          </ContainerLabel>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <AuthFormInput 
              name='username'
              placeholder='ユーザー名'
            />
            <AuthFormInput 
              name='password'
              placeholder='••••••'
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {}}
            >
              Sign in
            </Button>
          </Box>
          <ContainerLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
            >
              Forgot your password?
            </Link>
            <Divider flexItem>or</Divider>
            <Typography >
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
              >
                Sign up
              </Link>
            </Typography>
          </ContainerLabel>
        </FormContainer>
      </>
  );
}