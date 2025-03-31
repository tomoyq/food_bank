import { useCallback, useEffect, useState } from "react";

import { customAxios } from "../../../app/axios/AxiosProvider";

type Props = {
    loggedIn: boolean | null;
    handleCloseCreateForm: (func: () => void) => void;
};

type FridgeItem = {
    expiry_date: string;
    name: string;
    owner_name: string;
    quantity: number;
    id: number;
};

type LinearProgressColor = "primary" | "warning" | "error";

export const useFridgeContents = (props: Props) => {
    //在庫状態
    const [contents, setContents] = useState<FridgeItem[]>([]);

    //ログイン状態もしくはcontentsが変化したときに実行
    useEffect(() => {
        const fetchFridgeContents = async () => {
            const result = await customAxios.get('/fridges/')
            
            //食材が登録されているときはstateを更新する
            if (result.data.length !== 0) {
                setContents(result.data);
            };
            
        };

        //ログイン済みの場合のみapiをたたく
        if (props.loggedIn) {
            fetchFridgeContents()
        };
    }, [props.loggedIn]);

    //賞味期限まであと何日か計算
    const calculateDaysLeft = useCallback((expiryDate: string) => {
        //引数の賞味期限を-で分割する
        const date = expiryDate.split('-');

        //1日をミリ秒単位で保持
        const oneDayMilliSec = 1000 * 60 * 60 * 24

        //賞味期限と今日の日付のdateオブジェクトを作成(monthは0から始まるため-1した数値が実際の月)
        const expiryDateObj = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
        const today = new Date();

        //切り上げる
        var daysLeft = Math.ceil((expiryDateObj.getTime() - today.getTime()) / oneDayMilliSec)
        
        //期限が過ぎているものは0で出力
        return daysLeft < 0 ? 0 : daysLeft
    }, [contents]);

    //progress barに渡す値を出力
    const outputProgressBarProperty = useCallback((daysLeft: number) => {
        //期限に応じてprogress barの色を変更
        if (daysLeft >= 10) {
            //10日以上の時は青色
            var color: LinearProgressColor = "primary";
        } else if (daysLeft >= 4) {
            //4日以上10日未満の時は黄色
            var color: LinearProgressColor = "warning";
        } else {
            //4日未満の時は赤色
            var color: LinearProgressColor = "error";
        };

        var value = daysLeft * 10;
        //最大値を100,最小値を0に制限
        value = Math.max(0, value);
        value = Math.min(100, value);

        return {color, value}
    }, [contents]);

    return {contents, setContents, calculateDaysLeft, outputProgressBarProperty}
};