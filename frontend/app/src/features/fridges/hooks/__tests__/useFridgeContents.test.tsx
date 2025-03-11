import '@testing-library/jest-dom'
import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { useFridgeContents } from '../useFridgeContents';

describe('useFridgeContents', () => {

    test('期限までの日数を計算する関数', () => {
        const { result } = renderHook(() => useFridgeContents(true));
    
        //明日の日付をstrで保持
        const tomorrow = new Date();
        tomorrow.setDate( tomorrow.getDate() + 1 );
        const tomorrowStr = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`

        const daysLeft = result.current.calculateDaysLeft(tomorrowStr);
        
        //今日の日付と明日を比較しているため差分は1になる
        expect(daysLeft).toBe(1);
      })
    
    }
)