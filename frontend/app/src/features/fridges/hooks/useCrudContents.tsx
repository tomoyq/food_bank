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
  id: number;
};

type Props = {
  contents: FridgeItem[],
  setContents: React.Dispatch<React.SetStateAction<FridgeItem[]>>,
  handleCloseCreateForm: (func: () => void) => void;
  handleCloseUpdateForm: (func: () => void) => void;
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
  const handleSetTargetContent = useCallback( async (content: FridgeItem) => {
    setValue('expiryDate', content.expiry_date);
    setValue('name', content.name);
    setValue('quantity', content.quantity);

    //apiをたたくときのエンドポイントに使用
    setTargetIndex(content.id);
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
          setError('root.serverError', {type: 'serverError', message: error.response.data.expiry_date[0]});
      });   
      
  }), []);

  //在庫更新フォームを送信
  const onSubmitUpdateForm = useCallback( handleSubmit( async (data: CRUDFridgeContentsFormData) => {
      //apiにデータを送信
      await customAxios.put(`/fridges/${targetIndex}/`, data=data)
      //更新成功の時はレスポンスをcontentsに入れる
      .then(res => {
          console.log(res);
          //resに更新された食材のみがあるためtargetIndexを使ってcontentsの配列から対象のデータだけを更新する
          props.setContents(props.contents.map(content => {
            //contentの中のidがtargetIndexと同じときは対象のデータなのでres.dataで上書きする
            if (content.id === targetIndex) {
              return res.data;
            } else {
              return content;
            };
          })
          //更新後のコンテンツを期限の短い順に並べ替える
          .sort((a, b) => Date.parse(a.expiry_date) - Date.parse(b.expiry_date))
          );

          //targetIndexをnullに戻す
          setTargetIndex(null);
          //フォームの値を削除してmodalを閉じる
          props.handleCloseUpdateForm(reset);
      })
      //エラーが返った場合エラーメッセージをuseFormのsetErrorで入れる 
      .catch((error) => {
          setError('root.serverError', {type: 'serverError', message: error.response.data.expiry_date[0]});
      });

  }), [targetIndex]);

  //削除モーダルを送信
  const onSubmitDelete = useCallback( handleSubmit( async (data: CRUDFridgeContentsFormData) => {
    // //apiにデータを送信
    // await customAxios.put(`/fridges/${targetIndex}/`, data=data)
    // //更新成功の時はレスポンスをcontentsに入れる
    // .then(res => {
    //     console.log(res);
    //     //resに更新された食材のみがあるためtargetIndexを使ってcontentsの配列から対象のデータだけを更新する
    //     props.setContents(props.contents.map(content => {
    //       //contentの中のidがtargetIndexと同じときは対象のデータなのでres.dataで上書きする
    //       if (content.id === targetIndex) {
    //         return res.data;
    //       } else {
    //         return content;
    //       };
    //     }));

    //     //targetIndexをnullに戻す
    //     setTargetIndex(null);
    //     //フォームの値を削除してmodalを閉じる
    //     props.handleCloseUpdateForm(reset);
    // })
    // //エラーが返った場合エラーメッセージをuseFormのsetErrorで入れる 
    // .catch((error) => {
    //     setError('root.serverError', {type: 'serverError', message: error.response.data.expiry_date[0]});
    // });
    console.log(targetIndex)

  }), [targetIndex]);

  return {control, errors, reset, handleSetTargetContent, onSubmitCreateForm, onSubmitUpdateForm, onSubmitDelete};
};