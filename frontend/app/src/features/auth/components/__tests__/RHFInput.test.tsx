import { render, screen, renderHook } from "@testing-library/react";

import { RHFInput } from "../RHFInput";
import { useSignInForm } from "../../hooks/useSignInForm";
import { useState } from "react";

const mockedNavigator = jest.fn();
    jest.mock('react-router', () => ({
        ...jest.requireActual('react-router'),
        useNavigate: () => mockedNavigator,
    }
));

afterEach(() => {
    jest.clearAllMocks();
});

test("propsに渡されたnameがinputのid属性になる", async () => {
    //contextに[loggedIn, setLoggedIn]のように格納されている
    const context = renderHook(() => useState<boolean | null>(false))
    
    const result = renderHook(() => useSignInForm(context.result.current[0], context.result.current[1],));
    const { control } = result.result.current;

    render(<RHFInput 
                name="username"
                control={control}
                placeholder="名前"
            />);
        
    //nameにusernameを渡しているためidにはusernameが表示されるはず
    const input = screen.getByRole('textbox') as HTMLElement;
    expect(input.id).toBe('username');
});