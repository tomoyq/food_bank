import { useEffect, useState } from "react";

import { customAxios } from "../../../app/axios/AxiosProvider";

type FridgeItem = {
    owner: string;
    name: string;
    expiryDate: string;
    quantity: number;
};

export const useFridgeContents = (loggedIn: boolean | null) => {
    const [content, setContent] = useState<FridgeItem[]>();

    useEffect(() => {
        const fetchFridgeContents = async () => {
            const result = await customAxios.get('/fridges/')
            
            setContent(result.data);
        };

        //ログイン済みの場合のみapiをたたく
        if (loggedIn) {
            fetchFridgeContents()
        };
    }, [loggedIn]);

    //賞味期限まであと何日か計算
    const calculateDaysLeft = (expiryDate: string) => {
        //引数の賞味期限を-で分割する
        const date = expiryDate.split('-');

        //1日をミリ秒単位で保持
        const oneDayMilliSec = 1000 * 60 * 60 * 24

        //賞味期限と今日の日付のdateオブジェクトを作成(monthは0から始まるため-1した数値が実際の月)
        const expiryDateObj = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
        const today = new Date();

        //切り上げる
        return Math.ceil((expiryDateObj.getTime() - today.getTime()) / oneDayMilliSec)
    };

    return {content, calculateDaysLeft}
};