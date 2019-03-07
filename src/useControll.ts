import { useEffect, useState } from "react";

/**
 * 获取默认值
 * @param props React组件的props对象
 * @param key 值键
 * @param defaultKey    默认值键
 */
function DefineDefaultValue(props: any, key: string = "value", defaultKey: string = "defaultValue") {
    let defaultValue = null;
    if (key in props) {
        defaultValue = props[key];
    } else if (defaultKey in props) {
        defaultValue = props[defaultKey];
    }
    return defaultValue;
}

/**
 * 受控组件样板
 * @param props React组件的props对象
 * @param key 值键
 * @param defaultKey 默认值键
 */
function useControll<T>(props: any, key: string = "value", defaultKey: string = "defaultValue", defaultValue?: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
    const [value, setValue] = useState<T>(DefineDefaultValue(props, key, defaultKey) || defaultValue);
    const isControll = key in props;

    useEffect(() => {
        if (isControll) {
            // 受控组件将props.checked作为唯一数据源
            // 且不应该检查禁用状态
            setValue(props[key]);
        }
    });

    return [value, setValue, isControll];
}

export default useControll;
