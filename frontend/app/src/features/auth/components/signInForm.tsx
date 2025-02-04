import axios from 'axios';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import styled from '@emotion/styled'
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useContext } from 'react';

import { SignInFormData } from '../../../zod/authFormSchema'
import { RHFInput } from './RHFInput';
import { useSignInForm } from '../hooks/useSignInForm';
import { AuthContext } from '../../../app/context/AuthContext';

import { CustomButton } from '../../../components/ui';

const FormContainer = styled.div`
  width: 25%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
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
  const {setLoggedIn} = useContext(AuthContext);
  const {control, handleSubmit, setError, errors} = useSignInForm();
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignInFormData> = (data: SignInFormData) => {
    axios.post('/login/', data)
    .then(() => {
      //ログイン状態にする
      setLoggedIn(prevstate => !prevstate);
      navigate('/');
    })
    .catch((e) => {
      console.log(e.response)

      //サーバーエラーの内容を表示させる
      setError('root.serverError', {
        type: 'serverErrror',
        message: e.response.data.detail
      })
    })
  };

  return (
    <>
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
          {errors.root?.serverError &&
            <Typography
              component="p"
              variant="inherit"
              color='error'
            >
              {errors.root?.serverError.message}
            </Typography>
          }
        </ContainerLabel>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <RHFInput 
            name='username'
            control={control}
            placeholder='ユーザー名'
          />
          <RHFInput 
            name='password'
            control={control}
            placeholder='••••••'
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <CustomButton
            text="Sign in"
            fullWidth={true}
            variant="contained"
          />
        </Box>
        <ContainerLabel>
          <Link
            component="button"
            type="button"
            onClick={() => {}}
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