import '@testing-library/jest-dom'
import { act } from 'react';
import {fireEvent, render, renderHook, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from "axios-mock-adapter";

import { CRUDFridgeContentsForm } from '../index';
import { customAxios } from '../../../../app/axios/AxiosProvider';
import { useCrudContents } from '../../hooks/useCrudContents';

const responce = {
    expiry_date: [ 'サーバーエラーです', ]
};

const mock = new MockAdapter(customAxios);

describe('在庫追加フォーム', () => {
    beforeEach(() => {
        mock.reset();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setDate(yesterday.getDate() - 1);

    const setUp = async () => {
        mock.onGet('/fridges/').reply(200, {})

        //在庫状態の更新関数を取得してuseCrudContentsに渡す
        const { result } = renderHook(() => useCrudContents({
            setContents: jest.fn(),
            handleCloseCreateForm: () => ('close')
        }));                                                        

        await act(async () => {
            render(<CRUDFridgeContentsForm 
                control={result.current.control}
                errors={result.current.errors}
                onSubmit={result.current.onSubmitCreateForm}
                handleClose={() => console.log('close')}
            />);
        })
        
            
        const nameDiv = screen.getByTestId('name');
        const nameInput = within(nameDiv).getAllByRole('textbox',{name:'名前', hidden: true})[0];
        
        const expiryDateInput = screen.getByPlaceholderText('年/月/日');

        const quantityInput = screen.getByPlaceholderText('個数');

        const categoryDiv = screen.getByTestId('category');
        const categoryInput = within(categoryDiv).getAllByRole('textbox',{name:'', hidden: true})[0] ;

        const submitButton = screen.getByRole('button',{name:/submit/i});

        return { nameInput, expiryDateInput, quantityInput, categoryInput, submitButton, result };
    }

    test('各要素が正しく読み込まれる', async () => {
        const { nameInput, expiryDateInput, quantityInput, categoryInput, submitButton } = await setUp();

        await waitFor(() => {
            expect(nameInput).toBeInTheDocument();
            expect(nameInput).toHaveValue('');

            expect(expiryDateInput).toBeInTheDocument();
            expect(expiryDateInput).toHaveValue('');

            expect(quantityInput).toBeInTheDocument();
            //number inputの初期値はnull
            expect(quantityInput).toHaveValue(null);

            expect(categoryInput).toBeInTheDocument();

            expect(submitButton).toBeInTheDocument();
        })
    });

    test('空のフィールドでフォームを送信した場合にバリデーションエラーが表示される', async () => {
        const { submitButton } = await setUp();
        userEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getAllByText('必須項目です。').length).toBe(3);
            
            const requiredNumberElement = screen.getAllByText(/数字で入力してください。/i);
            // '数字で入力してください。'と出力される項目は1つ
            expect(requiredNumberElement.length).toEqual(1);
        });
    });
    
    test('個数入力欄に0を入力したらバリデーションエラーが表示される', async () => {
        const { quantityInput } = await setUp();

        fireEvent.change(quantityInput, { target: { value: 0 } });
        fireEvent.blur(quantityInput);

        await waitFor(() => {
            
            expect(screen.getByText('1以上を入力してください。')).toBeInTheDocument();
        });
    });

    test('個数入力欄にマイナスの数字を入力したらバリデーションエラーが表示される', async () => {
        const { quantityInput } = await setUp();

        fireEvent.change(quantityInput, { target: { value: -1 } });
        fireEvent.blur(quantityInput);

        await waitFor(() => {
            expect(screen.getByText('1以上を入力してください。')).toBeInTheDocument();
        });
    });


    test('サーバー側のエラーメッセージが表示される', async () => {
        mock.onPost('/fridges/').reply(404, responce);

        const { nameInput, expiryDateInput, quantityInput, categoryInput, submitButton, result} =  await setUp();

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: 'test' } });
            fireEvent.blur(nameInput);

            fireEvent.change(expiryDateInput, { target: { value: yesterday.toISOString().split('T')[0] } });
            fireEvent.blur(expiryDateInput); 

            fireEvent.change(quantityInput, { target: { value: 1 } });
            fireEvent.blur(quantityInput);

            fireEvent.change(categoryInput, { target: { value: '肉類' } });

            await result.current.onSubmitCreateForm();
        });

        //errorsにレスポンスのエラーメッセージが入っているはず
        expect(result.current.errors.root?.serverError.message).toBe('サーバーエラーです');
        
    });

})