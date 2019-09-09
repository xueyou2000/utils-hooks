import { useState } from "react";

/**
 * 获取默认值
 * @param props React组件的props对象
 * @param key 值键
 * @param defaultKey    默认值键
 */
export function DefineDefaultValue(props: any, key: string = "value", defaultKey: string = "defaultValue", convent?: (val: any) => void) {
    let defaultValue = null;
    if (key in props) {
        defaultValue = convent ? convent(props[key]) : props[key];
    } else if (defaultKey in props) {
        defaultValue = convent ? convent(props[defaultKey]) : props[defaultKey];
    }
    return defaultValue;
}

/**
 * 受控组件样板
 * @param props React组件的props对象
 * @param key 值键
 * @param defaultKey 默认值键
 */
export function useControll<T>(
    props: any,
    key: string = "value",
    defaultKey: string = "defaultValue",
    defaultValue?: T,
    convent?: (val: T) => void,
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
    const isControll = key in props;
    const [value, setValue] = useState<T>(DefineDefaultValue(props, key, defaultKey, convent) || defaultValue);
    return [isControll ? props[key] : value, setValue, isControll];
}
