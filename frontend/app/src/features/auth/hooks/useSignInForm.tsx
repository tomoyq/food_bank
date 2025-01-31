import axios from 'axios';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';

import {SignInFormSchema} from '../../../zod/authFormSchema'

export const useSignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(SignInFormSchema),
      });

    return {register, handleSubmit, formState: { errors },}
};