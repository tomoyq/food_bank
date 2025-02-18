import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import MockAdapter from "axios-mock-adapter";

import { Header } from './header';
import { customAxios } from '../../../app/axios/AxiosProvider';

const mockedNavigator = jest.fn();
    jest.mock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockedNavigator,
    }
));

const axiosMock = new MockAdapter(customAxios);
    axiosMock.onPost(`/logout/`).reply(200);

jest.mock('../../../app/context/AuthContext', () => {
    const originalModule = jest.requireActual('../../../app/context/AuthContext');
    return {
        __esModule: true,
        ...originalModule,
        AuthContext: {
            _currentValue: { loggedIn: true },
        },
    };
});

describe('ログイン済み状態のヘッダー', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    const setUp = () => {
        render(<Header />);
        const contentButton = screen.getByRole('button',{name:'content'});
        const recipeButton = screen.getByRole('button',{name:'recipe'});
        const profileButton = screen.getByRole('button',{name:'profile'});
        const messageButton = screen.getByRole('button',{name:'message'});
        return { contentButton, recipeButton, profileButton, messageButton };
    }

    test('各要素が正しく読み込まれる', () => {
        const { contentButton, recipeButton, profileButton, messageButton } = setUp();
        expect(contentButton).toBeInTheDocument();
        expect(recipeButton).toBeInTheDocument();
        expect(profileButton).toBeInTheDocument();
        expect(messageButton).toBeInTheDocument();
    });

    test('各ボタンを押すと設定されたルートに遷移する', async () => {
        const { contentButton, recipeButton, profileButton, messageButton } = setUp();
        
        //食材在庫ページへ
        userEvent.click(contentButton);
        await waitFor(() => {
            // "/" を引数にnavigatorが呼び出される
            expect(mockedNavigator).toHaveBeenCalledWith('/');
        });
        //レシピページへ
        userEvent.click(recipeButton);
        await waitFor(() => {
            expect(mockedNavigator).toHaveBeenCalledWith('/recipe');
        });
        //プロフィールページへ
        userEvent.click(profileButton);
        await waitFor(() => {
            expect(mockedNavigator).toHaveBeenCalledWith('/profile');
        });
        //メッセージページへ
        userEvent.click(messageButton);
        await waitFor(() => {
            expect(mockedNavigator).toHaveBeenCalledWith('/message');
        });
    });
})