import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreateFridgeContentsFormData, CreateFridgeContentsFormSchema } from "../../../zod/createFidgeContentsFormSchema";

//フォーム送信後レスポンスの値でcontentsを更新させるためstateの更新関数をもらう
export const useCrudContents = () => {
    const {
            control,
            handleSubmit,
            setError,
            formState: {errors},
            reset
          } = useForm<CreateFridgeContentsFormData>({
            resolver: zodResolver(CreateFridgeContentsFormSchema),
            //フィールドのすべてのエラーをキャッチ
            criteriaMode: 'all',
            //validationを入力中と送信後に実行させる
            mode: 'onChange',
          });

    return {control, handleSubmit, errors, setError, reset};
};