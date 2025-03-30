import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import { CRUDFridgeContentsFormData, CRUDFridgeContentsFormSchema } from "../../../zod/createFidgeContentsFormSchema";
import { customAxios } from "../../../app/axios/AxiosProvider";

type FridgeItem = {
  expiry_date: string;
  name: string;
  owner_name: string;
  quantity: number;
};

type Props = {
  setContents: React.Dispatch<React.SetStateAction<FridgeItem[]>>,
  handleCloseCreateForm: (func: () => void) => void;
}

//フォーム送信後レスポンスの値でcontentsを更新させるためstateの更新関数をもらう
export const useCrudContents = (props: Props) => {
    const {
            control,
            handleSubmit,
            setValue,
            setError,
            formState: {errors},
            reset
          } = useForm<CRUDFridgeContentsFormData>({
            resolver: zodResolver(CRUDFridgeContentsFormSchema),
            //フィールドのすべてのエラーをキャッチ
            criteriaMode: 'all',
            //validationを入力中と送信後に実行させる
            mode: 'onChange',
          });
          
    //更新、削除modalを開くときに対象のコンテンツを特定するために使用　追加modalの場合はnull
    const [targetIndex, setTargetIndex] = useState<number | null>(null);

    //更新フォームを開く時に実行する　更新したいコンテンツを設定
    const handleSetTargetContent = useCallback( async (content: FridgeItem, index: number) => {
      setValue('expiryDate', content.expiry_date);
      setValue('name', content.name);
      setValue('quantity', content.quantity);

      //apiをたたくときのエンドポイントに使用
      setTargetIndex(index);
    }, [targetIndex]);

    //在庫追加フォームを送信
    const onSubmitCreateForm = useCallback( handleSubmit( async (data: CRUDFridgeContentsFormData) => {
        //apiにデータを送信
        await customAxios.post('/fridges/', data=data)
        //作成成功の時はレスポンスをcontentsに入れる
        .then(res => {
            props.setContents(res.data);

            //フォームの値を削除してmodalを閉じる
            props.handleCloseCreateForm(reset);
        })
        //エラーが返った場合エラーメッセージをuseFormのsetErrorで入れる 
        .catch((error) => {
            console.log(error.response);
            setError('root.serverError', {type: 'serverError', message: error.response.data.expiry_date[0]});
        });   
        
    }), []);

    //在庫更新フォームを送信
    const onSubmitUpdateForm = useCallback( handleSubmit( async (data: CRUDFridgeContentsFormData) => {
      console.log(data);
      console.log(targetIndex);
  }), [targetIndex]);

    return {control, errors, reset, handleSetTargetContent, onSubmitCreateForm, onSubmitUpdateForm};
};