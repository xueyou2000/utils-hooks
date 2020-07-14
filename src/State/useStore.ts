import { useEffect, useState } from "react";
import { Store } from "./Store";

/**
 * 数据管理hook
 * @param store
 */
export function useStore<T>(store: Store<T>): [T, (v: T) => void] {
    const [val, setVal] = useState(store.value);

    useEffect(() => {
        const unsubscribe = store.subscribe((value) => {
            setVal(value);
        });
        return () => unsubscribe();
    }, []);

    return [val, store.change];
}
