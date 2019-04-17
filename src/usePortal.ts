import ReactDOM from "react-dom";
import { useContainer, GetContainer } from "./useContainer";

/**
 * 使用Portal, 弹出内容
 * @param getContainer
 * @param getContainer
 */
export function usePortal(className?: string, getContainer?: GetContainer): [(node: React.ReactNode) => React.ReactPortal, HTMLElement] {
    const container = useContainer(className, getContainer);

    function renderPortal(node: React.ReactNode) {
        if (!container) {
            return null;
        }
        return ReactDOM.createPortal(node, container);
    }

    return [renderPortal, container];
}
