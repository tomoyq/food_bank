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
      }
    );
    
    test('プロパティに渡す値を出力する関数', () => {
        const { result } = renderHook(() => useFridgeContents(true));

        const hundred = result.current.outputProgressBarProperty(100);
        const fourth = result.current.outputProgressBarProperty(4);
        const minas = result.current.outputProgressBarProperty(-1);

        //valueの上限が100のためcolorはprimaryでvalueには100が入るはず
        expect(hundred).toStrictEqual({color: 'primary', value: 100});
        //期限が4日のためcolorはwarningでvalueには4が入るはず
        expect(fourth).toStrictEqual({color: 'warning', value: 40});
        //valueの下限が0のためcolorはerrorでvalueには0が入るはず
        expect(minas).toStrictEqual({color: 'error', value: 0});
      }
    );
  }
)