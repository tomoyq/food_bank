import { render, screen } from "@testing-library/react";

import { AuthFormInput } from "../authFormInput";
 
test("propsに渡されたnameがinputのid属性になる", async () => {
    render(<AuthFormInput 
                name="username"
                placeholder="名前"
            />);
  
    //nameにusernameを渡しているためidにはusernameが表示されるはず
    const input = screen.getByRole('textbox') as HTMLElement;
    expect(input.id).toBe('username');
});