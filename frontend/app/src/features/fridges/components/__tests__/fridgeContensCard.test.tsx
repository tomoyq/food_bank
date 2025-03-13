import '@testing-library/jest-dom'
import { render, screen, } from "@testing-library/react";

import { FridgeContentsCard } from "../fridgeContensCard";

const mockPropertyVariables = () => {
    return {color: 'primary', value: 100}
};

test("propsに渡された値がcardの中に表示されている", async () => {
    render(<FridgeContentsCard 
                name="牛乳"
                quantity={1}
                owner="あなた"
                expiryDate='2025-1-1'
                daysLeft={() => 10}
                propertyVariables={mockPropertyVariables}
            />);
        
    // 対象のテキストが画面上に存在することを確認
    expect(screen.getByText('牛乳')).toBeInTheDocument();
    expect(screen.getByText('個数：1')).toBeInTheDocument();
    expect(screen.getByText('作成者：あなた')).toBeInTheDocument();
});