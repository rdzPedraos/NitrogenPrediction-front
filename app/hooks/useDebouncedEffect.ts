import { useRef, useEffect } from "react";

export default function useDebouncedEffect(
    effect: () => void,
    delay: number,
    deps: any[]
) {
    const callback = useRef(effect);
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        callback.current = effect;
    }, [effect]);

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            callback.current();
        }, delay);

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [...deps, delay]);
}
