import { useMemo, useState } from "react";

function useForm<T extends object>(initValues: T) {
    const [form, setForm] = useState<T>(initValues);

    const setData = (key: keyof T, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const register = (key: keyof T, type?: "date") => {
        if (type === "date") return registerDate(key);

        return {
            defaultValue: form[key],
            onValueChange: (value: any) => setData(key, value),
        };
    };

    const registerDate = (key: keyof T) => {
        return {
            defaultValue: form[key],
            onChange: (value: T[keyof T]) => {
                setData(key, value);
            },
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
