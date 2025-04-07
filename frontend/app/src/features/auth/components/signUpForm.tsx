import {
    Box,
    Typography,
  } from '@mui/material';
  import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
  import { Control, FieldErrors, SubmitHandler } from 'react-hook-form';
  import { Link } from "react-router";
  
  import { RHFInput } from './RHFInput';
  
  import { CustomButton, CustomCheckbox } from '../../../components/ui';
  
  type Props = {
    control: Control<any>;
    errors: FieldErrors<{
        username: string;
        password: string;
        isRemenber: boolean;
        email: string;
        password2: string;
    }>
    onSubmit: SubmitHandler<any>;
  };
  
  const style = {
    titleLayout: {
      width: 'full',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      gap: '10px',
      margin: '20px 0',
    },
    titleIcon: {
      fontSize: 50,
    },
    title: {
      fontSize: 'clamp(2rem, 10vw, 2.15rem)'
    },
    formLayout: {
      width: {xs: '80%', md: '25%'},
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: '#FFFFFF',
      border: 'solid 1px #DDDDDD',
      borderRadius: '20px',
      padding: '50px',
      gap: '2px',
      boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    },
    formContent: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: 2,
    },
  }
  
  export const SignUpForm = (props: Props) => {
    return (
      <>
        <Box sx={style.formLayout}>
          <Box sx={style.titleLayout}>
            <KitchenOutlinedIcon 
              color='success'
              sx={style.titleIcon}
            />
            <Typography
              component="p"
              variant="inherit"
              sx={style.title}
            >
              Join Smart Fridge Chef
            </Typography>
            {props.errors.root?.serverError &&
              <Typography
                component="p"
                variant="inherit"
                color='error'
              >
                {props.errors.root?.serverError.message}
              </Typography>
            }
          </Box>
          <Box
            component="form"
            onSubmit={props.onSubmit}
            noValidate
            sx={style.formContent}
          >
            <RHFInput 
              name='username'
              control={props.control}
              placeholder='ユーザー名'
            />
  
            <RHFInput 
              name='email'
              control={props.control}
              placeholder='chef@example.com'
            />
  
            <RHFInput 
              name='password'
              control={props.control}
              placeholder='••••••'
            />
  
          <RHFInput 
              name='password2'
              control={props.control}
              placeholder='••••••'
            />
  
            <CustomCheckbox 
              name='isRemenber'
              control={props.control}
              value='remenber'
            />
            <CustomButton
              text="Create Account"
              fullWidth={true}
              variant="contained"
            />
          </Box>
          <Box sx={style.titleLayout}>
            <Typography >
              Already have an account?{' '}
              <Link
                to="/login"
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </>
    );
  }