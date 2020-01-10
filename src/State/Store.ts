/**
 * 状态数据
 * @description 数据修改将触发订阅事件
 */
export class Store<T> {
    private _value: T;

    private _subscribes: Array<(value: T) => void>;

    /**
     * 创建Store
     * @param defaultValue
     */
    public constructor(defaultValue?: T) {
        this._value = defaultValue || null;
        this._subscribes = [];
    }

    /**
     * 寻找订阅器
     * @param callback
     */
    private findSubscribe(callback: (value: T) => void) {
        return this._subscribes.findIndex((fn) => fn === callback);
    }

    /**
     * 订阅
     * @param callback
     */
    public subscribe(callback: (v: T) => void) {
        const { _subscribes: subscribes } = this;
        const index = this.findSubscribe(callback);
        if (index === -1) {
            subscribes.push(callback);
        } else {
            subscribes[index] = callback;
        }
        // 返回取消订阅得函数
        return () => this.unsubscribe(callback);
    }

    /**
     * 改变值
     * @param val
     */
    public change = (val: T) => {
        this._value = val;
        this._subscribes.forEach((fn) => fn(val));
    };

    /**
     * 取消订阅
     */
    public unsubscribe = (callback: (value: T) => void) => {
        const { _subscribes: subscribes } = this;
        const index = this.findSubscribe(callback);
        if (index !== -1) {
            subscribes.splice(index, 1);
        }
    };

    /**
     * 获取值
     */
    public get value() {
        return this._value;
    }

    /**
     * 创建Store
     */
    static Create<T>(defaultValue?: T) {
        return new Store<T>(defaultValue);
    }
}
