import React, { useCallback } from "react"
import { useForm } from "react-hook-form"

type FormInput = {
    textField: string | number;
}

export const useRecipes = () => {
    const { handleSubmit, control } = useForm<FormInput>()

    const onSubmit = useCallback( handleSubmit( async (data: FormInput) => {
        console.log(data);
    }), [])

    return {control, onSubmit}
}