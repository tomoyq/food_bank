import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import userEvent from '@testing-library/user-event';

import { SignInForm } from "../signInForm";
import { AuthContextProvider } from "../../../../app/context/AuthContext"
import { customAxios } from '../../../../app/axios/AxiosProvider';
import { useSignInForm } from '../../hooks/useSignInForm';
import { act } from 'react';

const errorResponce = {
    detail: 'サーバーエラーです'
};

const mockedNavigator = jest.fn();
    jest.mock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockedNavigator,
    }
));

describe('ログインフォーム', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    const setUp = async () => {
        const { result } = renderHook(() => useSignInForm(true, jest.fn()))

        render(<SignInForm 
            control={result.current.control}
            errors={result.current.errors}
            onSubmit={result.current.onSubmit}
        />, {wrapper: AuthContextProvider});

        const usernameInput = screen.getByRole('textbox',{name:'username'}) as HTMLElement;
        const passwordInput = screen.getByLabelText('password') as HTMLElement;
        const submitButton = screen.getByRole('button',{name:'submit'});
        return { usernameInput, passwordInput, submitButton, result };
    }

    test('各要素が正しく読み込まれる', async () => {
        const { usernameInput, passwordInput, submitButton } = await setUp();
        expect(usernameInput).toBeInTheDocument();
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeInTheDocument();
    });

    test('空のフィールドでフォームを送信した場合にバリデーションエラーが表示される', async () => {
        const { submitButton } = await setUp();
        userEvent.click(submitButton);
        await waitFor(() => {
            const requiredElement = screen.getAllByText('必須項目です。');
            //フォーム欄は2つのため
            expect(requiredElement.length).toEqual(2);          
        });
    });
    
    test('文字数が足りないパスワードを入力した時にバリデーションエラーが表示される', async () => {
        const { passwordInput } = await setUp();
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.blur(passwordInput);
        await waitFor(() => {
            expect(screen.getByText('パスワードは8文字以上入力してください。')).toBeInTheDocument();
        });
    });

    test('無効なパスワードを入力した時にバリデーションエラーが表示される', async () => {
        const { passwordInput } = await setUp();
        fireEvent.change(passwordInput, { target: { value: 'pass-word' } });
        fireEvent.blur(passwordInput);
        await waitFor(() => {
            expect(screen.getByText('使えるのは大文字か小文字のアルファベットと数字のみです。')).toBeInTheDocument();
        });
    });

    test('無効なユーザー名を入力した時にバリデーションエラーが表示される', async () => {
        const { usernameInput } = await setUp();
        fireEvent.change(usernameInput, { target: { value: 'test@' } });
        fireEvent.blur(usernameInput);
        await waitFor(() => {
            expect(screen.getByText('使えるのは,文字,数字,_ のみです。')).toBeInTheDocument();
        });
    });

    test('ログインに失敗した時はサーバー側のエラーメッセージが表示される', async () => {
        const errorMock = new MockAdapter(customAxios);
        errorMock.onPost(`/login/`).reply(401, errorResponce);

        const { usernameInput, passwordInput, result } = await setUp();

        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'test' } });
            fireEvent.blur(usernameInput);

            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.blur(passwordInput); 

            await result.current.onSubmit();
        })
        
        //errorsにレスポンスのエラーメッセージが入っているはず
        await waitFor(() => {
            expect(result.current.errors.root?.serverError.message).toBe('サーバーエラーです');
        });
    });

    test('ログインに成功した時はuseNavigateが呼ばれる', async () => {
        const successMock = new MockAdapter(customAxios);
        successMock.onPost(`/login/`).reply(200);

        const { usernameInput, passwordInput, submitButton } = await setUp();
        fireEvent.change(usernameInput, { target: { value: 'test' } });
        fireEvent.blur(usernameInput);

        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.blur(passwordInput); 

        userEvent.click(submitButton);

        await waitFor(() => {
            // "/" を引数にnavigatorが呼び出される
            expect(mockedNavigator).toHaveBeenCalledWith('/');
        });
    });
})