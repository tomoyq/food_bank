import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { CreateFridgeContentsFormData, CreateFridgeContentsFormSchema } from "../../../zod/createFidgeContentsFormSchema";

export const useCrudContents = () => {
    const {
            control,
            handleSubmit,
            setError,
            formState: {errors}
          } = useForm<CreateFridgeContentsFormData>({
            resolver: zodResolver(CreateFridgeContentsFormSchema),
            //フィールドのすべてのエラーをキャッチ
            criteriaMode: 'all',
            //validationを入力中に実行させる
            mode: 'onChange',
          });

    //作成フォームから作成ボタンが押された時に実行
    const onSubmitCreateForm: SubmitHandler<CreateFridgeContentsFormData> = (data: CreateFridgeContentsFormData) => {
        console.log(data);
    };

    return {control, handleSubmit, errors, onSubmitCreateForm};
};