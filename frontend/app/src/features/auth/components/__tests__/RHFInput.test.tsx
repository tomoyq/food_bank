import { render, screen, renderHook } from "@testing-library/react";

import { RHFInput } from "../RHFInput";
import { useSignInForm } from "../../hooks/useSignInForm";

test("propsに渡されたnameがinputのid属性になる", async () => {
    const result = renderHook(useSignInForm);
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