import { useMemo, useState } from "react";

function useForm<T extends object>(initValues: T) {
    const [form, setForm] = useState<T>(initValues);

    const setData = (key: keyof T, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const register = (key: keyof T) => {
        return {
            value: form[key],
            onValueChange: (value: any) => setData(key, value),
        };
    };

    const allFilled = useMemo(() => {
        return Object.values(form).every((v) => v);
    }, [form]);

    return {
        data: form,
        setData,
        register,
        allFilled,
    };
}

export default useForm;
