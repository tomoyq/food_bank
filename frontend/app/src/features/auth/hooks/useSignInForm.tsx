import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import React, { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {SignInFormData, SignInFormSchema} from '../../../zod/authFormSchema';
import { customAxios } from '../../../app/axios/AxiosProvider';

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
        //isRemenberの初期値のみ設定(false)
        defaultValues: {
          isRemenber: false
        }
      });

    const navigate = useNavigate()
    
    //ログイン関数
    const onSubmit = useCallback( handleSubmit(async (data: SignInFormData) => {
      console.log(data)
      await customAxios.post('/login/', data)
      .then(() => {
        //ログイン状態にする
        setLoggedIn(true);
        navigate('/');
      })
      .catch((e) => {
        console.log(e)
  
        //サーバーエラーの内容を表示させる
        setError('root.serverError', {
          type: 'serverError',
          message: e.response.data.detail
        })
      })
    }), [loggedIn]) ;
  
    useEffect(() => {
      //ログイン済みならhomeへリダイレクト
      if (loggedIn){
        console.log(loggedIn)
        navigate('/');
      };
    }, [loggedIn]);

    return {control, errors, onSubmit}
};