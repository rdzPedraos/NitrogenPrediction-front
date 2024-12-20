import { useState } from "react";

function useForm<T extends object>(initValues: T) {
    const [form, setForm] = useState<T>(initValues);

    const setData = (key: keyof T, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const register = (key: keyof T) => {
        return {
            value: form[key] as string,
            onValueChange: (value: any) => setData(key, value),
        };
    };

    return {
        data: form,
        setData,
        register,
    };
}

export default useForm;
