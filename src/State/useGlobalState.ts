import { useState, useEffect } from "react";

export class MonitorState<T> {
    private previousState: T;
    private subscribes: Array<(value: T) => void>;

    constructor(initState?: T) {
        this.previousState = initState;
        this.subscribes = [];
    }

    private findSubscribe(callback: (value: T) => void) {
        return this.subscribes.findIndex((fn) => fn === callback);
    }

    subscribe(callback: (value: T) => void) {
        const { subscribes } = this;
        const index = this.findSubscribe(callback);
        if (index === -1) {
            subscribes.push(callback);
        } else {
            subscribes[index] = callback;
        }
        // 返回取消订阅得函数
        return () => this.unsubscribe(callback);
    }

    unsubscribe = (callback: (value: T) => void) => {
        const { subscribes } = this;
        const index = this.findSubscribe(callback);
        if (index !== -1) {
            subscribes.splice(index, 1);
        }
    };

    setState = (value: T) => {
        this.previousState = value;
        this.subscribes.forEach((fn) => fn(value));
    };

    getState() {
        return this.previousState;
    }
}

export function useGlobalState<T>(state: MonitorState<T>): [T, (v: T) => void] {
    const [val, setVal] = useState(state.getState());

    useEffect(() => {
        const unsubscribe = state.subscribe((value) => {
            setVal(value);
        });

        return unsubscribe;
    }, [1]);

    return [val, state.setState];
}
