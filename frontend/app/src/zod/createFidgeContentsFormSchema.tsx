import { z } from "zod";

export const CATEGORY = ['肉類', '魚類', 'その他'] as const;

export const CreateFridgeContentsFormSchema = z.object({
    name: z.string({required_error: "必須項目です。"})
        .max(150, {message: "名前は150文字以内です。"}),
    expiryDate: z.string({required_error: "必須項目です。"})
        .date('YYYY/MM/ddの形式で入力してください。'),
    quantity: z.coerce.number({required_error: "必須項目です。"})
        .int({message: '整数値を入力してください。'})
        .positive({message: '1以上を入力してください。'}),
    category: z.enum(CATEGORY, {required_error: "必須項目です。"})
});

export type CreateFridgeContentsFormData = z.infer<typeof CreateFridgeContentsFormSchema>;