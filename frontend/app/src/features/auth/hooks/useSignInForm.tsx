import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';

import {SignInFormData, SignInFormSchema} from '../../../zod/authFormSchema'

export const useSignInForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: {errors}
      } = useForm<SignInFormData>({
        resolver: zodResolver(SignInFormSchema),
        criteriaMode: 'all',
        mode: 'onChange',
      });

    return {control, handleSubmit, setError, errors}
};