import { useState } from "react";
import { useMount } from "./Lifecycles/useMount";

export interface FetchState<T = any> {
    /**
     * 是否加载中
     */
    loading: boolean;
    /**
     * 结果
     */
    result: T;
    /**
     * 异常状态
     */
    error: Error;
}

/**
 * 默认加载信息
 */
export const DefaultFetchState = { loading: true, result: null, error: null };

/**
 * 管理网络加载的相关状态
 * @param promise
 */
export function useFetch<T>(doFetch: () => Promise<T>) {
    const [state, setState] = useState<FetchState<T>>({ loading: true, result: null, error: null });

    useMount(() => {
        doFetch()
            .then((response) => {
                setState({ loading: false, result: response, error: null });
            })
            .catch((error) => {
                setState({ loading: false, result: null, error: error });
            });
    });

    return state;
}

/**
 * 管理网络加载的相关状态
 * @description 为了不打破useFetch的接口，新起一个
 * @param promise
 */
export function useFetchWichRefresh<T>(doFetch: () => Promise<T>): [FetchState<T>, Function] {
    const [state, setState] = useState<FetchState<T>>({ loading: true, result: null, error: null });

    function refresh() {
        setState({ loading: true, result: null, error: null });
        doFetch()
            .then((response) => {
                setState({ loading: false, result: response, error: null });
            })
            .catch((error) => {
                setState({ loading: false, result: null, error: error });
            });
    }

    useMount(refresh);

    return [state, refresh];
}
