import { z } from "zod";

const usernameRegex = new RegExp("^[a-zA-Z_0-9]+$");
const passwordRegex = new RegExp("^[a-zA-Z0-9]+$");

export const SignInFormSchema = z.object({
    username: z.string({required_error: "必須項目です。"})
        .max(150, {message: "名前は150文字以内です。"})
        .regex(usernameRegex, {message: "使えるのは,文字,数字,_ のみです。"}),
    password: z.string({required_error: "必須項目です。"})
        .min(8, {message: "パスワードは8文字以上入力してください。"})
        .regex(passwordRegex, {message: "使えるのは大文字か小文字のアルファベットと数字のみです。"})
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;