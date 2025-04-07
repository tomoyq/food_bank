import { render, screen, renderHook } from "@testing-library/react";

import { RHFInput } from "../RHFInput";
import { useAuthForm } from "../../hooks/useAuthForm";
import { SignInFormSchema } from "../../../../zod/authFormSchema";

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
    
    const result = renderHook(() => useAuthForm(SignInFormSchema));
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