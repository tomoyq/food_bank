import '@testing-library/jest-dom'
import { render, renderHook, screen, } from "@testing-library/react";

import { FridgeContentsCard } from "../index";
import { useModal } from '../../../../hooks';

const mockPropertyVariables = () => {
    return {color: 'primary', value: 100}
};

const mockContent = {
    expiry_date: '2025-1-1',
    name: "牛乳",
    owner_name: "あなた",
    quantity: 1,
    id: 1,
}

test("propsに渡された値がcardの中に表示されている", async () => {
    const { result } = renderHook(() => useModal())

    render(<FridgeContentsCard 
                content={mockContent}
                daysLeft={() => 10}
                propertyVariables={mockPropertyVariables}
                handleOpenUpdateForm={result.current.handleOpen}
                handleDelete={() => console.log('open')}
            />);
        
    // 対象のテキストが画面上に存在することを確認
    expect(screen.getByText('牛乳')).toBeInTheDocument();
    expect(screen.getByText('個数：1')).toBeInTheDocument();
    expect(screen.getByText('作成者：あなた')).toBeInTheDocument();
});