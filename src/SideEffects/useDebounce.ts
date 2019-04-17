import { useEffect, useState } from "react";

/**
 * 防抖函数
 * @param value 值
 * @param delay 延迟
 * @example const debouncedSearch = useDebounce(search, 500);
 */
export function useDebounce(value: string, delay: number = 500) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Only re-call effect if value or delay changes

    return debouncedValue;
}

/**
 * 防抖函数
 * @param   fn 回调函数
 * @param   ms  延迟
 * @param   args    依赖参数
 */
export function useDebounceCallback(fn: () => any, ms: number = 0, args: Array<any> = []) {
    useEffect(() => {
        let handle = setTimeout(fn.bind(null, args), ms);

        return () => {
            // if args change then clear timeout
            clearTimeout(handle);
        };
    }, args);
}
