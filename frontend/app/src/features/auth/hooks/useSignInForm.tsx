import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {SignInFormData, SignInFormSchema} from '../../../zod/authFormSchema';
import { customAxios } from '../../../app/axios/AxiosProvider';
import { useEffect } from 'react';

//ログイン状態と更新関数を引数にもらう
export const useSignInForm = (loggedIn: boolean | null, setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>) => {
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

    const navigate = useNavigate()
    
    //ログイン関数
    const onSubmit: SubmitHandler<SignInFormData> = (data: SignInFormData) => {
      customAxios.post('/login/', data)
      .then(() => {
        //ログイン状態にする
        setLoggedIn(true);
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
  
    useEffect(() => {
      //ログイン済みならhomeへリダイレクト
      if (loggedIn){
        console.log(loggedIn)
        navigate('/');
      };
    }, [loggedIn]);

    return {control, handleSubmit, errors, onSubmit}
};