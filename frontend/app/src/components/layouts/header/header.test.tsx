import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import { Header } from './header';
import { AuthContextProvider } from "../../../app/context/AuthContext"

const mockedNavigator = jest.fn();
    jest.mock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockedNavigator,
    }
));

describe('ヘッダー', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    const setUp = () => {
        render(<Header />, {wrapper: AuthContextProvider});
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