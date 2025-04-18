import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {SignInFormData, SignUpFormData, SignInFormSchema, SignUpFormSchema} from '../../../zod/authFormSchema';
import { customAxios } from '../../../app/axios/AxiosProvider';
import { AuthContext } from '../../../app/context/AuthContext';

export const useAuthForm = (formSchema: typeof SignUpFormSchema | typeof SignInFormSchema) => {
    //ログイン状態を取得
    const {loggedIn, setLoggedIn} = useContext(AuthContext);

    useEffect(() => {
      //ログイン済みならhomeへリダイレクト
      if (loggedIn){
        console.log(loggedIn)
        navigate('/');
      };
    }, [loggedIn]);

    const {
        control,
        handleSubmit,
        setError,
        formState: {errors}
      } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        criteriaMode: 'all',
        mode: 'onChange',
        //フォーカスが外れた場合に再検証させる
        reValidateMode: 'onChange',
        //isRemenberの初期値(false), emailは空文字
        defaultValues: {
          email: '',
          isRemenber: false
        }
      });

    const navigate = useNavigate()

    //setErrorの使いかたをsignupとloginとで分ける
    const setServerError = (e: any, path: 'signup' | 'login') => {
      if (path === 'login') {
        //サーバーエラーの内容を表示させる
        setError('root.serverError', {
          type: 'serverError',
          message: e.response.data.detail
        })
      } else {
        //field nameと同じキー名でエラーメッセージがresponse.dataに入っているはず
        //エラーメッセージが配列で取得できるためindexに0を指定
        Object.keys(e.response.data).map(key => setError('root.serverError', {
          type: 'serverError',
          message: e.response.data[key][0]}))
      }
    }
    
    //pathにloginが入ればログインapi, signupが入ればサインアップapiをたたく
    const signUpOrLogin = useCallback(async (path: 'signup' | 'login', data: SignUpFormData | SignInFormData) => {
      console.log(data);
      await customAxios.post(`/${path}/`, data)
      .then(() => {
        //ログイン状態にする
        setLoggedIn(true);
        navigate('/');
      })
      .catch((e) => {
        console.log(e)
  
        setServerError(e, path);
      })
    }, [formSchema]);

    //フォーム送信
    const onSubmit = useCallback( handleSubmit(async (data: SignUpFormData | SignInFormData) => {
      console.log(data)
      //formSchemaにSignUpFormSchemaが渡された場合pathにsignup, SignInFormSchemaが渡された場合はloginを入れて関数実行
      if (formSchema === SignUpFormSchema) {
        await signUpOrLogin('signup', data);
      } else {
        await signUpOrLogin('login', data);
      };

    }), [formSchema]) ;

    return {control, errors, onSubmit}
};