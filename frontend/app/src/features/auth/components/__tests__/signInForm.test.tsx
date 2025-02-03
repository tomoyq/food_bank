import '@testing-library/jest-dom'
import { SignInForm } from "../signInForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useNavigate } from "react-router";
import userEvent from '@testing-library/user-event';

const errorResponce = {
    detail: 'サーバーエラーです'
};

// const successMock = new MockAdapter(axios);
// successMock.onPost(`http://localhost:8000/login`).reply(200);


const mockedNavigator = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockedNavigator,
}));

describe('ログインフォーム', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    const setUp = () => {
        render(<SignInForm />);
        const usernameInput = screen.getByRole('textbox',{name:'username'}) as HTMLElement;
        const passwordInput = screen.getByLabelText('password') as HTMLElement;
        const submitButton = screen.getByRole('button',{name:'submit'});
        return { usernameInput, passwordInput, submitButton };
    }

    test('各要素が正しく読み込まれる', () => {
        const { usernameInput, passwordInput, submitButton } = setUp();
        expect(usernameInput).toBeInTheDocument();
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeInTheDocument();
    });

    test('空のフィールドでフォームを送信した場合にバリデーションエラーが表示される', async () => {
        const { submitButton } = setUp();
        userEvent.click(submitButton);
        await waitFor(() => {
            const requiredElement = screen.getAllByText('Required');
            //フォーム欄は2つのため
            expect(requiredElement.length).toEqual(2);          
        });
    });
    
    test('文字数が足りないパスワードを入力した時にバリデーションエラーが表示される', async () => {
        const { passwordInput } = setUp();
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.blur(passwordInput);
        await waitFor(() => {
            expect(screen.getByText('パスワードは8文字以上で必須項目です。')).toBeInTheDocument();
        });
    });

    test('無効なパスワードを入力した時にバリデーションエラーが表示される', async () => {
        const { passwordInput } = setUp();
        fireEvent.change(passwordInput, { target: { value: 'pass-word' } });
        fireEvent.blur(passwordInput);
        await waitFor(() => {
            expect(screen.getByText('使えるのは大文字か小文字のアルファベットと数字のみです。')).toBeInTheDocument();
        });
    });

    test('無効なユーザー名を入力した時にバリデーションエラーが表示される', async () => {
        const { usernameInput } = setUp();
        fireEvent.change(usernameInput, { target: { value: 'test@' } });
        fireEvent.blur(usernameInput);
        await waitFor(() => {
            expect(screen.getByText('使えるのは,文字,数字,_ のみです。')).toBeInTheDocument();
        });
    });

    test('ログインに失敗した時はサーバー側のエラーメッセージが表示される', async () => {
        const errorMock = new MockAdapter(axios);
        errorMock.onPost(`/login/`).reply(401, errorResponce);

        const { usernameInput, passwordInput, submitButton } = setUp();
        fireEvent.change(usernameInput, { target: { value: 'test' } });
        fireEvent.blur(usernameInput);

        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.blur(passwordInput); 

        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('サーバーエラーです')).toBeInTheDocument();
        });
    });
})