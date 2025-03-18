import '@testing-library/jest-dom'
import {fireEvent, render, renderHook, screen, waitFor} from '@testing-library/react';

import { CreateFridgeContentsForm } from '../index';
import { useCrudContents } from '../../hooks/useCrudContents';
import userEvent from '@testing-library/user-event';

describe('在庫追加フォーム', () => {

    const setUp = () => {
        const { result } = renderHook(() => useCrudContents());

        render(<CreateFridgeContentsForm 
                    control={result.current.control}
                    handleSubmit={result.current.handleSubmit}
                    onSubmit={result.current.onSubmitCreateForm}
                />);
        const nameInput = screen.getByRole('textbox',{name:'name'}) ;
        const expiryDateInput = screen.getByLabelText('expiryDate') ;
        const quantityInput = screen.getByLabelText('quantity') ;
        const categoryInput = screen.getByLabelText('category') ;
        const submitButton = screen.getByRole('button',{name:'submit'});
        return { nameInput, expiryDateInput, quantityInput, categoryInput, submitButton };
    }

    test('各要素が正しく読み込まれる', () => {
        const { nameInput, expiryDateInput, quantityInput, categoryInput, submitButton } = setUp();
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveValue('');

        expect(expiryDateInput).toBeInTheDocument();
        expect(expiryDateInput).toHaveValue('');

        expect(quantityInput).toBeInTheDocument();
        //number inputの初期値はnull
        expect(quantityInput).toHaveValue(null);

        expect(categoryInput).toBeInTheDocument();

        expect(submitButton).toBeInTheDocument();
    });

    test('空のフィールドでフォームを送信した場合にバリデーションエラーが表示される', async () => {
        const { submitButton } = setUp();
        userEvent.click(submitButton);
        await waitFor(() => {
            const requiredElement = screen.getAllByText('必須項目です。');
            // '必須項目です。'と出力される項目は3つ
            expect(requiredElement.length).toEqual(3);
            
            const requiredNumberElement = screen.getAllByText('数字で入力してください。');
            // '数字で入力してください。'と出力される項目は1つ
            expect(requiredNumberElement.length).toEqual(1);
        });
    });
    
    test('個数入力欄に0を入力したらバリデーションエラーが表示される', async () => {
        const { quantityInput } = setUp();
        fireEvent.change(quantityInput, { target: { value: 0 } });
        fireEvent.blur(quantityInput);
        await waitFor(() => {
            expect(screen.getByText('1以上を入力してください。')).toBeInTheDocument();
        });
    });

    test('個数入力欄にマイナスの数字を入力したらバリデーションエラーが表示される', async () => {
        const { quantityInput } = setUp();
        fireEvent.change(quantityInput, { target: { value: -1 } });
        fireEvent.blur(quantityInput);
        await waitFor(() => {
            expect(screen.getByText('1以上を入力してください。')).toBeInTheDocument();
        });
    });


    // test('ログインに失敗した時はサーバー側のエラーメッセージが表示される', async () => {
    //     const errorMock = new MockAdapter(customAxios);
    //     errorMock.onPost(`/login/`).reply(401, errorResponce);

    //     const { usernameInput, passwordInput, submitButton } = setUp();
    //     fireEvent.change(usernameInput, { target: { value: 'test' } });
    //     fireEvent.blur(usernameInput);

    //     fireEvent.change(passwordInput, { target: { value: 'password' } });
    //     fireEvent.blur(passwordInput); 

    //     userEvent.click(submitButton);

    //     await waitFor(() => {
    //         expect(screen.getByText('サーバーエラーです')).toBeInTheDocument();
    //     });
    // });

    // test('ログインに成功した時はuseNavigateが呼ばれる', async () => {
    //     const successMock = new MockAdapter(customAxios);
    //     successMock.onPost(`/login/`).reply(200);

    //     const { usernameInput, passwordInput, submitButton } = setUp();
    //     fireEvent.change(usernameInput, { target: { value: 'test' } });
    //     fireEvent.blur(usernameInput);

    //     fireEvent.change(passwordInput, { target: { value: 'password' } });
    //     fireEvent.blur(passwordInput); 

    //     userEvent.click(submitButton);

    //     await waitFor(() => {
    //         // "/" を引数にnavigatorが呼び出される
    //         expect(mockedNavigator).toHaveBeenCalledWith('/');
    //     });
    // });
})